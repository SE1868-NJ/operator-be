import { Op, Sequelize, where } from "sequelize";
import sequelize from "../config/sequelize.config.js";
import { Order } from "../models/order.model.js";
import { ReasonChangeStatus } from "../models/reasonChangeStatus.model.js";
import { Shipper } from "../models/shipper.model.js";
import { ShipperReview } from "../models/shipperReview.js";

const ShipperServices = {
  async getAllShippers(offset, limit) {
    const shippers = await Shipper.findAll({
      offset,
      limit,
    })
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
    return shippers;
  },
  async getAllShippersPending(offset = 0, limit = 10) {
    const shippers = await Shipper.findAll({
      where: {
        status: "pending",
      },
      offset,
      limit,
    })
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });

    const total = await Shipper.count({
      where: {
        status: "pending",
      },
    });
    return { shippers, total };
  },

  async getOneShipperPending(id) {
    const shipper = await Shipper.findByPk(id)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
    return shipper;
  },

  async updateShipperPending(id, updatedStatus) {
    const transaction = await sequelize.transaction();
    try {
      const { status, reason } = updatedStatus;
      const newStatus = status === "rejected" ? "inactive" : "active";
      try {
        const updatedShipper = await Shipper.update(
          {
            status: newStatus,
            joinedDate: new Date(),
          },
          {
            where: {
              id: id,
            },
            transaction: transaction,
          }
        );

        // Kiểm tra xem shipper có tồn tại hay không
        if (updatedShipper[0] === null) {
          await transaction.rollback();
          throw new Error("Shipper not found");
        }

        await ReasonChangeStatus.create(
          {
            operatorID: 1,
            pendingID: id,
            role: "Shipper",
            changedStatus: status,
            reason: reason,
          },
          {
            transaction: transaction,
          }
        );

        await transaction.commit();
        return updatedShipper;
      } catch (error) {
        await transaction.rollback();
        console.error(
          "Error during updateShopStatus (inner try) - Shop ID:",
          id,
          "Error:",
          error,
          "Request Body:",
          req.body
        );
        throw new Error(error.message);
      }
    } catch (error) {
      await transaction.rollback();
      console.error(
        "Error during updateShopStatus (outer try) - Shop ID:",
        id,
        "Error:",
        error,
        "Request Body:",
        req.body
      );
      throw new Error(error.message);
    }
  },

  async updateShipperStatus(id, status) {
    try {
      const shipper = await Shipper.findByPk(id);
      if (!shipper) {
        throw new Error("Shipper not found");
      }
      shipper.status = status;
      await shipper.save();
      return shipper;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  async getShipperById(id) {
    const shipper = await Shipper.findByPk(id);
    return shipper;
  },

  async getSumShippingFeeAllShippers(
    offset = 0,
    limit = 10,
    nameOrPhone = "",
    status = "",
    date = ""
  ) {
    const whereCondition = {
      ...(nameOrPhone && {
        [Op.or]: [
          { name: { [Op.like]: `%${nameOrPhone}%` } },
          { phone: { [Op.like]: `%${nameOrPhone}%` } },
        ],
      }),
      ...(status && { status }),
      ...(date && { joinedDate: { [Op.gte]: new Date(date) } }),
    };
    const sumShippingFee = await Order.findAll({
      attributes: [
        "shipper_id",
        [sequelize.fn("SUM", sequelize.col("shippingFee")), "sum_shipping_fee"],
        [
          sequelize.literal("SUM(shippingFee) * 0.9"),
          "sum_shipping_fee_adjusted",
        ],
        [sequelize.fn("COUNT", sequelize.col("*")), "count_order"],
      ],
      offset,
      limit,
      include: [
        {
          model: Shipper,
          as: "Shipper",
          where: whereCondition,
        },
      ],
      where: {
        payment_status: "paid",
      },
      group: "shipper_id",
    });

    const totalRevenue = sumShippingFee.reduce(
      (acc, row) => acc + Number.parseFloat(row.get("sum_shipping_fee")),
      0
    );
    const totalOrders = sumShippingFee.reduce(
      (acc, row) => acc + row.get("count_order"),
      0
    );
    return { sumShippingFee, totalRevenue, totalOrders };
  },

  // async getOrdersOfShipper(id, statusFilter, shippingStatusFilter) {
  //     console.log("=================statusFilter: ", statusFilter);
  //     console.log("===================shippingStatusFilter: ", shippingStatusFilter);
  //     try {
  //         const whereCondition = {};

  //         if (statusFilter) {
  //             whereCondition.status = statusFilter;
  //         }
  //         if (shippingStatusFilter) {
  //             whereCondition.shipping_status = shippingStatusFilter;
  //         }

  //         const shipper = await Shipper.findOne({
  //             where: { id },
  //             attributes: ["id", "name"],
  //             include: [
  //                 {
  //                     model: Order,
  //                     as: "Orders",
  //                     attributes: ["id", "shippingFee", "status", "shipping_status", "note"],
  //                     where: whereCondition, // Áp dụng bộ lọc
  //                     order: [["createdAt", "DESC"]], // Sắp xếp theo ngày tạo mới nhất
  //                 },
  //             ],
  //         });
  //         console.log("whereCondition: ", whereCondition);

  //         return shipper;
  //     } catch (error) {
  //         throw new Error("Error fetching shipper orders: ",  error.message);
  //     }
  // },

  async getOrdersOfShipper(id, status, shipping_status) {
    try {
      const whereCondition = { shipper_id: id };

      if (status) {
        whereCondition.status = status;
      }

      if (shipping_status) {
        whereCondition.shipping_status = shipping_status;
      }

      const shipper = await Shipper.findOne({
        where: { id },
        attributes: ["id", "name"],
        include: [
          {
            model: Order,
            as: "Orders",
            attributes: [
              "id",
              "shippingFee",
              "status",
              "shipping_status",
              "note",
            ],
            where: whereCondition, // Lọc theo status và shipping_status
            order: [["createdAt", "DESC"]], // Sắp xếp theo ngày tạo mới nhất
          },
        ],
      });

      return shipper;
    } catch (error) {
      console.error("Error fetching shipper orders:", error);
      throw new Error("Error fetching shipper orders");
    }
  },

  async getTopShippers() {
    try {
      const shippers = await Shipper.findAll({
        attributes: [
          "id",
          "name",
          [
            Sequelize.fn(
              "COALESCE",
              Sequelize.fn("SUM", Sequelize.col("Orders.shippingFee")),
              0
            ),
            "total_revenue",
          ],
          [
            Sequelize.fn(
              "COALESCE",
              Sequelize.fn(
                "SUM",
                Sequelize.literal(
                  `CASE WHEN Orders.status = 'completed' THEN 1 ELSE 0 END`
                )
              ),
              0
            ),
            "completed_orders",
          ],
        ],
        include: [
          {
            model: Order,
            as: "Orders", // Kiểm tra alias này có đúng trong model Order không!
            attributes: [],
          },
        ],
        group: ["Shipper.id", "Shipper.name"],
        order: [
          [Sequelize.literal("total_revenue"), "DESC"],
          [Sequelize.literal("completed_orders"), "DESC"],
        ],
        limit: 5,
        subQuery: false,
      });

      return shippers;
    } catch (error) {
      throw new Error(`Error fetching top shippers: ${error.message}`);
    }
  },

  async getShippingStatusSummary() {
    try {
      const result = await Shipper.findAll({
        attributes: [
          "id",
          "name",
          [
            Sequelize.literal(
              `COUNT(CASE WHEN orders.shipping_status = 'not_yet_shipped' THEN 1 ELSE NULL END)`
            ),
            "not_yet_shipped",
          ],
          [
            Sequelize.literal(
              `COUNT(CASE WHEN orders.shipping_status = 'shipping' THEN 1 ELSE NULL END)`
            ),
            "shipping",
          ],
          [
            Sequelize.literal(
              `COUNT(CASE WHEN orders.shipping_status = 'shipped' THEN 1 ELSE NULL END)`
            ),
            "shipped",
          ],
        ],
        include: [
          {
            model: Order,
            as: "Orders",
            attributes: [],
          },
        ],
        group: ["Shipper.id", "Shipper.name"],
        order: [["id", "ASC"]],
        raw: true,
      });

      return result;
    } catch (error) {
      console.error("Error fetching shipping status summary:", error);
      throw new Error("Failed to fetch shipping status summary");
    }
  },

  async getTop10Shippers() {
    try {
      const topShippers = await Order.findAll({
        attributes: [
          "shipper_id",
          [Sequelize.col("Shipper.name"), "shipper_name"],
          [
            Sequelize.fn(
              "DATE_FORMAT",
              Sequelize.col("Order.createdAt"),
              "%Y-%m"
            ),
            "order_month",
          ],
          [
            Sequelize.fn("SUM", Sequelize.col("Order.shippingFee")),
            "total_shipping_fee",
          ],
        ],
        include: [
          {
            model: Shipper,
            as: "Shipper",
            attributes: [],
          },
        ],
        where: {
          shipper_id: {
            [Sequelize.Op.ne]: null, // shipper_id IS NOT NULL
          },
        },
        group: ["shipper_id", "Shipper.name", "order_month"],
        order: [
          [Sequelize.literal("order_month"), "DESC"],
          [Sequelize.literal("total_shipping_fee"), "DESC"],
        ],
        limit: 10,
        raw: true, // Trả về dữ liệu dưới dạng đối tượng JSON thuần túy
      });

      return topShippers;
    } catch (error) {
      console.error("Error fetching top 10 shippers:", error);
    }
  },

  async getShipperDraftById(id) {
    try {
      const shipperDraft = await ReasonChangeStatus.findAll({
        attributes: ["reason"],
        where: {
          pendingID: id,
          role: "Shipper",
          changedStatus: "savedraft",
        },
      });
      if (!shipperDraft) {
        throw new Error("Shipper draft not found");
      }
      return shipperDraft;
    } catch (error) {
      console.error("Error fetching shipping status summary:", error);
      throw new Error("Failed to fetch shipping status summary");
    }
  },

  async updateShipperDraftById(id, data) {
    const { status, reason } = data;
    try {
      if (status === "savedraft") {
        const oldDraft = await ReasonChangeStatus.findOne({
          where: {
            pendingID: id,
            role: "Shipper",
          },
        });
        if (!oldDraft) {
          const newRecord = await ReasonChangeStatus.create({
            operatorID: 1,
            pendingID: id,
            role: "Shipper",
            changedStatus: "savedraft",
            reason: reason,
          });
          return newRecord;
        }
        const shipperDraft = await ReasonChangeStatus.update(
          {
            reason: data.reason,
          },
          {
            where: {
              pendingID: id,
              role: "Shipper",
            },
          }
        );
        return shipperDraft;
      }
      ShipperServices.updateShipperPending(id, data);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async countActiveShippers() {
    try {
      const result = await Shipper.count({
        where: {
          status: "active",
          joinedDate: {
            [Op.lte]: new Date(), // Lấy những shipper có joinedDate <= ngày hiện tại
          },
        },
      });

      return result;
    } catch (error) {
      console.error("Error counting active shippers:", error);
    }
  },

  async countShippersJoinedToday() {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const count = await Shipper.count({
        where: {
          joinedDate: {
            [Op.gte]: today,
            [Op.lt]: new Date(today.getTime() + 86400000),
          },
        },
      });

      return count;
    } catch (error) {
      console.error("Error counting shippers joined today:", error);
      throw new Error("Database query failed");
    }
  },
  async getTop5ShipperByMonth() {
    try {
      /*
      SELECT
		s.name,
		s.avatar,
    o.shipper_id, 
    COUNT(*) AS total_order, 
    COALESCE(sr.avg_rating, 0) AS avg_rating
FROM orders o
LEFT JOIN (
    SELECT 
        shipperId, 
        ROUND(AVG(rating), 1) AS avg_rating
    FROM shipperreviews
    WHERE DATE_FORMAT(createdAt, '%Y-%m') = DATE_FORMAT(NOW(), '%Y-%m') -- Chỉ lấy trong tháng này
    GROUP BY shipperId
) sr ON o.shipper_id = sr.shipperId
LEFT JOIN (
	SELECT NAME, avatar, id FROM shippers
) s ON s.id = o.shipper_id
WHERE o.status = 'completed'
AND DATE_FORMAT(o.createdAt, '%Y-%m') = DATE_FORMAT(NOW(), '%Y-%m') -- Chỉ lấy đơn hoàn thành trong tháng này
GROUP BY o.shipper_id
ORDER BY avg_rating DESC, total_order DESC
LIMIT 5;
      */
      const shipperStats = await Order.findAll({
        attributes: [
          "shipper_id",
          [Sequelize.fn("COUNT", Sequelize.col("Order.id")), "total_order"],
          [
            Sequelize.literal(`
              COALESCE((
                SELECT ROUND(AVG(rating), 1) 
                FROM shipperreviews 
                WHERE shipperreviews.shipperId = Order.shipper_id
                AND DATE_FORMAT(shipperreviews.createdAt, '%Y-%m') = DATE_FORMAT(NOW(), '%Y-%m')
              ), 0)
            `),
            "avg_rating",
          ],
          [Sequelize.col("shipper.name"), "name"],
          [Sequelize.col("shipper.avatar"), "avatar"],
        ],
        include: [
          {
            model: Shipper,
            as: "Shipper",
            attributes: [], // Không lấy dữ liệu dưới object `Shipper`
          },
        ],
        where: {
          status: "completed",
          [Sequelize.literal("DATE_FORMAT(Order.createdAt, '%Y-%m')")]:
            Sequelize.literal("DATE_FORMAT(NOW(), '%Y-%m')"),
        },
        group: ["Order.shipper_id", "shipper.id"],
        order: [
          [Sequelize.literal("avg_rating"), "DESC"],
          [Sequelize.literal("total_order"), "DESC"],
        ],
        raw: true, // Trả về object phẳng, không lồng dữ liệu trong `Shipper`
        logging: console.log, // Debug SQL query
        limit: 5,
      });

      return shipperStats;
    } catch (error) {
      console.error("Error occured during get top 5 shipper in month", error);
      throw new Error(error.message);
    }
  },
  async avgDeliveryTime() {
    try {
      // lấy thời gian giao hàng trung bình trong 4 tháng gần nhất
      let avgDeliveryTime = await Order.findOne({
        attributes: [
          [
            Sequelize.fn(
              "AVG",
              Sequelize.literal(
                "TIMESTAMPDIFF(DAY, start_time, actual_delivery_time)"
              )
            ),
            "avg_delivery_days",
          ],
        ],
        where: {
          actual_delivery_time: {
            [Op.gte]: Sequelize.literal(
              "DATE_SUB(CURDATE(), INTERVAL 4 MONTH)"
            ),
          },
        },
        raw: true,
      });

      // lấy thời gian giao hàng trung bình trong 8 tháng đến 4 tháng gần nhất
      let avgDeliveryTimePrev = await Order.findOne({
        attributes: [
          [
            Sequelize.fn(
              "AVG",
              Sequelize.literal(
                "TIMESTAMPDIFF(DAY, start_time, actual_delivery_time)"
              )
            ),
            "avg_delivery_days",
          ],
        ],
        where: {
          actual_delivery_time: {
            [Op.between]: [
              Sequelize.literal("DATE_SUB(CURDATE(), INTERVAL 8 MONTH)"),
              Sequelize.literal("DATE_SUB(CURDATE(), INTERVAL 4 MONTH)"),
            ],
          },
        },
        raw: true,
      });

      

      
      const avgNow = avgDeliveryTime?.avg_delivery_days == null ? 0: avgDeliveryTime?.avg_delivery_days;
      const avgPrev = avgDeliveryTimePrev?.avg_delivery_days == null ? 0: avgDeliveryTimePrev?.avg_delivery_days;
      
      console.log(avgNow, avgPrev)
      
      let timeChange =  avgPrev !== 0 
      ? ((avgNow - avgPrev) / avgPrev) * 100 
      : 0;
      
      return  {
        avgDeliveryDaysNow: avgNow,
        avgDeliveryDaysPrev: avgPrev,
        timeChange: `${timeChange.toFixed(1)}%`
      };
    } catch (error) {
      console.error("Error occured during get avg delivery time interval 4 month", error);
      throw new Error(error.message);
    }
  },
  async cancellationRate() {
    try {
      // Tính tổng số đơn hàng trong 4 tháng gần nhất
      const totalOrders = await Order.count({
        where: {
          createdAt: {
            [Op.gte]: Sequelize.literal("DATE_SUB(CURDATE(), INTERVAL 4 MONTH)"),
          },
        },
      });
  
      // Tính số đơn hàng bị hủy trong 4 tháng gần nhất
      const cancelledOrders = await Order.count({
        where: {
          status: "cancelled",
          createdAt: {
            [Op.gte]: Sequelize.literal("DATE_SUB(CURDATE(), INTERVAL 4 MONTH)"),
          },
        },
      });

      // tính số đơn hàn 4 tháng trước nữa
      const cancelledOrdersPrevious4Months = await Order.count({
        where: {
          status: "cancelled",
          createdAt: {
            [Op.between]: [
              Sequelize.literal("DATE_SUB(CURDATE(), INTERVAL 8 MONTH)"),
              Sequelize.literal("DATE_SUB(CURDATE(), INTERVAL 4 MONTH)"),
            ],
          },
        },
      });
  
      // Tính tỷ lệ hủy đơn hàng (làm tròn 1 chữ số thập phân)
      const rateNow = totalOrders > 0 ? (cancelledOrders / totalOrders) * 100 : 0;
      const ratePrv = totalOrders > 0 ? (cancelledOrdersPrevious4Months / totalOrders) * 100 : 0;
      let percentageChange = ratePrv !== 0 ? ((rateNow - ratePrv) / ratePrv) * 100 : 0;
  
      return {
        cancelRateNow: `${rateNow.toFixed(1)}%`,
        cancelRatePrv: `${ratePrv.toFixed(1)}%`,
        percentageChange: `${percentageChange}%`
      }
    } catch (error) {
      console.error("Error occurred during get cancellation rate", error);
      throw new Error(error.message);
    }
  }
};

export default ShipperServices;
