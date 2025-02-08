// shop.service.js
import { Shop } from "../models/shop.model.js";
import { User } from "../models/user.model.js";

//shop.service.js: Tập trung vào việc tương tác với cơ sở dữ liệu
// và xử lý logic nghiệp vụ.

const ShopService = {
    async getAllShops() {
        try {
            const shops = await Shop.findAll({
                include: [
                    {
                        model: User,
                        as: "Owner",
                    },
                ],
            });
            return shops;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getShopById(id) {
        try {
            const shop = await Shop.findByPk(id, {
                include: [
                    {
                        model: User,
                        as: "Owner",
                    },
                ],
            });
            if (!shop) {
                throw new Error("Shop not found");
            }
            return shop;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default ShopService;
