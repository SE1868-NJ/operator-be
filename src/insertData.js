//./src/vailidation/insertData.js
import sequelize from "./config/sequelize.config.js";
import { Address } from "./models/address.model.js";
import { Feedback } from "./models/feedback.model.js";
import { Media } from "./models/media.model.js";
import { MediaItem } from "./models/mediaItem.model.js";
import { EmergencyContact } from "./models/emergencyContact.model.js";
import { Operator } from "./models/operator.model.js";
import { Order } from "./models/order.model.js";
import { OrderItem } from "./models/orderItem.model.js";
import { Product } from "./models/product.model.js";
import { ReplyFeedback } from "./models/replyFeedback.model.js";
import { Shipper } from "./models/shipper.model.js";
import { Shop } from "./models/shop.model.js";
import { User } from "./models/user.model.js";
import { Banner } from "./models/banner.model.js";
import bcrypt from "bcrypt";
// 3 operator
const insertOperators = async () => {
  try {
    const operators = [
      {
        firstName: "Nguyễn",
        lastName: "Văn A",
        email: "operator@gmail.com",
        personalEmail: "abc@gmail.com",
        password: "12345",
        phoneNumber: "0987654321",
        dateOfBirth: "1990-05-20",
        gender: "male",
        status: "active",
        roleCode: 1,
      },
    ];
    // Hash passwords
    for (const operator of operators) {
      const salt = await bcrypt.genSalt(10);
      operator.password = await bcrypt.hash(operator.password, salt);
    }

    // Insert data
    await Operator.bulkCreate(operators);
    console.log("5 Operators inserted successfully!");
  } catch (error) {
    console.error("Error inserting operators:", error);
  }
};
// 40 user
const insertUsers = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối với database thành công.");

    const users = [
      {
        fullName: "Nguyễn Văn A",
        dateOfBirth: "1990-01-15",
        gender: "male",
        userEmail: "nguyenvana@example.com",
        userPhone: "0987654321",
        userCitizenID: "123456789",
        userAddress: "Số 10, Đường Láng, Hà Nội",
        identificationNumber: "ID100001",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Trần Thị B",
        dateOfBirth: "1992-03-22",
        gender: "female",
        userEmail: "tranthib@example.com",
        userPhone: "0987654322",
        userCitizenID: "123456790",
        userAddress: "Số 12, Đường Trần Hưng Đạo, Hà Nội",
        identificationNumber: "ID100002",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Lê Văn C",
        dateOfBirth: "1988-07-10",
        gender: "male",
        userEmail: "levanc@example.com",
        userPhone: "0987654323",
        userCitizenID: "123456791",
        userAddress: "Số 15, Đường Nguyễn Chí Thanh, TP. Hồ Chí Minh",
        identificationNumber: "ID100003",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Phạm Thu D",
        dateOfBirth: "1995-06-05",
        gender: "female",
        userEmail: "phamthud@example.com",
        userPhone: "0987654324",
        userCitizenID: "123456792",
        userAddress: "Số 20, Đường Quang Trung, Đà Nẵng",
        identificationNumber: "ID100004",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Đỗ Minh E",
        dateOfBirth: "1985-12-01",
        gender: "male",
        userEmail: "dominhe@example.com",
        userPhone: "0987654325",
        userCitizenID: "123456793",
        userAddress: "Số 5, Đường Lê Lợi, Hải Phòng",
        identificationNumber: "ID100005",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Hoàng Anh F",
        dateOfBirth: "1998-09-17",
        gender: "other",
        userEmail: "hoanganhf@example.com",
        userPhone: "0987654326",
        userCitizenID: "123456794",
        userAddress: "Số 8, Đường Võ Văn Kiệt, Cần Thơ",
        identificationNumber: "ID100006",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Nguyễn Thị G",
        dateOfBirth: "1993-04-30",
        gender: "female",
        userEmail: "nguyenthig@example.com",
        userPhone: "0987654327",
        userCitizenID: "123456795",
        userAddress: "Số 25, Đường Hoàng Hoa Thám, Huế",
        identificationNumber: "ID100007",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Trịnh Văn H",
        dateOfBirth: "1987-02-14",
        gender: "male",
        userEmail: "trinhvanh@example.com",
        userPhone: "0987654328",
        userCitizenID: "123456796",
        userAddress: "Số 18, Đường Nguyễn Văn Cừ, Bắc Ninh",
        identificationNumber: "ID100008",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Bùi Hữu I",
        dateOfBirth: "1991-08-25",
        gender: "male",
        userEmail: "buihuui@example.com",
        userPhone: "0987654329",
        userCitizenID: "123456797",
        userAddress: "Số 30, Đường Phạm Văn Đồng, Vinh",
        identificationNumber: "ID100009",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Đặng Thị J",
        dateOfBirth: "1986-05-19",
        gender: "female",
        userEmail: "dangthij@example.com",
        userPhone: "0987654330",
        userCitizenID: "123456798",
        userAddress: "Số 40, Đường Trường Chinh, Nha Trang",
        identificationNumber: "ID100010",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Lý Văn K",
        dateOfBirth: "1994-11-03",
        gender: "male",
        userEmail: "lyvank@example.com",
        userPhone: "0987654331",
        userCitizenID: "123456799",
        userAddress: "Số 7, Đường 30/4, Cần Thơ",
        identificationNumber: "ID100011",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Vũ Thị L",
        dateOfBirth: "1989-09-28",
        gender: "female",
        userEmail: "vuthil@example.com",
        userPhone: "0987654332",
        userCitizenID: "123456800",
        userAddress: "Số 11, Đường Trần Phú, Huế",
        identificationNumber: "ID100012",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Đào Văn M",
        dateOfBirth: "1996-03-12",
        gender: "male",
        userEmail: "daovanm@example.com",
        userPhone: "0987654333",
        userCitizenID: "123456801",
        userAddress: "Số 14, Đường Hùng Vương, Đà Lạt",
        identificationNumber: "ID100013",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Phan Thị N",
        dateOfBirth: "1984-07-07",
        gender: "female",
        userEmail: "phanthin@example.com",
        userPhone: "0987654334",
        userCitizenID: "123456802",
        userAddress: "Số 22, Đường 2/9, Đà Nẵng",
        identificationNumber: "ID100014",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Hồ Văn O",
        dateOfBirth: "1997-01-29",
        gender: "male",
        userEmail: "hovano@example.com",
        userPhone: "0987654335",
        userCitizenID: "123456803",
        userAddress: "Số 35, Đường Lê Hồng Phong, Quy Nhơn",
        identificationNumber: "ID100015",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Lương Thị P",
        dateOfBirth: "1990-05-23",
        gender: "female",
        userEmail: "luongthip@example.com",
        userPhone: "0987654336",
        userCitizenID: "123456804",
        userAddress: "Số 42, Đường Nguyễn Thị Minh Khai, Vũng Tàu",
        identificationNumber: "ID100016",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Trần Quốc Q",
        dateOfBirth: "1983-11-15",
        gender: "male",
        userEmail: "tranquocq@example.com",
        userPhone: "0987654337",
        userCitizenID: "123456805",
        userAddress: "Số 50, Đường 3/2, TP. Hồ Chí Minh",
        identificationNumber: "ID100017",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Hoàng Thị R",
        dateOfBirth: "1999-08-09",
        gender: "female",
        userEmail: "hoangthir@example.com",
        userPhone: "0987654338",
        userCitizenID: "123456806",
        userAddress: "Số 55, Đường Trần Hưng Đạo, Hội An",
        identificationNumber: "ID100018",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Nguyễn Hữu S",
        dateOfBirth: "1992-02-27",
        gender: "male",
        userEmail: "nguyenhuus@example.com",
        userPhone: "0987654339",
        userCitizenID: "123456807",
        userAddress: "Số 60, Đường Lê Duẩn, Huế",
        identificationNumber: "ID100019",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Phạm Thị T",
        dateOfBirth: "1985-06-11",
        gender: "female",
        userEmail: "phamthit@example.com",
        userPhone: "0987654340",
        userCitizenID: "123456808",
        userAddress: "Số 66, Đường 3 Tháng 2, Đà Lạt",
        identificationNumber: "ID100020",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Trần Văn U",
        dateOfBirth: "1991-04-03",
        gender: "male",
        userEmail: "tranvanu@example.com",
        userPhone: "0987654341",
        userCitizenID: "123456809",
        userAddress: "Số 70, Đường Nguyễn Huệ, TP. Hồ Chí Minh",
        identificationNumber: "ID100021",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Lê Thị V",
        dateOfBirth: "1988-12-25",
        gender: "female",
        userEmail: "lethiv@example.com",
        userPhone: "0987654342",
        userCitizenID: "123456810",
        userAddress: "Số 80, Đường Trần Phú, Đà Nẵng",
        identificationNumber: "ID100022",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Phan Hữu X",
        dateOfBirth: "1993-08-18",
        gender: "male",
        userEmail: "phanhuux@example.com",
        userPhone: "0987654343",
        userCitizenID: "123456811",
        userAddress: "Số 90, Đường Hoàng Diệu, Hải Phòng",
        identificationNumber: "ID100023",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Vũ Thị Y",
        dateOfBirth: "1986-01-08",
        gender: "female",
        userEmail: "vuthiy@example.com",
        userPhone: "0987654344",
        userCitizenID: "123456812",
        userAddress: "Số 100, Đường Ba Tháng Hai, Cần Thơ",
        identificationNumber: "ID100024",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Đỗ Quang Z",
        dateOfBirth: "1999-05-01",
        gender: "male",
        userEmail: "doquangz@example.com",
        userPhone: "0987654345",
        userCitizenID: "123456813",
        userAddress: "Số 110, Đường Lê Lợi, Huế",
        identificationNumber: "ID100025",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Bùi Thị AA",
        dateOfBirth: "1984-09-14",
        gender: "female",
        userEmail: "buithiaa@example.com",
        userPhone: "0987654346",
        userCitizenID: "123456814",
        userAddress: "Số 120, Đường Nguyễn Văn Cừ, Bắc Ninh",
        identificationNumber: "ID100026",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Nguyễn Thế BB",
        dateOfBirth: "1990-06-22",
        gender: "male",
        userEmail: "nguyenthebb@example.com",
        userPhone: "0987654347",
        userCitizenID: "123456815",
        userAddress: "Số 130, Đường Phạm Văn Đồng, Vinh",
        identificationNumber: "ID100027",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Trần Thị CC",
        dateOfBirth: "1987-03-17",
        gender: "female",
        userEmail: "tranthicc@example.com",
        userPhone: "0987654348",
        userCitizenID: "123456816",
        userAddress: "Số 140, Đường Thống Nhất, Nha Trang",
        identificationNumber: "ID100028",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Lê Văn DD",
        dateOfBirth: "1994-11-30",
        gender: "male",
        userEmail: "levandd@example.com",
        userPhone: "0987654349",
        userCitizenID: "123456817",
        userAddress: "Số 150, Đường Ba Mươi Tháng Tư, Cần Thơ",
        identificationNumber: "ID100029",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Phạm Thị EE",
        dateOfBirth: "1989-07-01",
        gender: "female",
        userEmail: "phamthiee@example.com",
        userPhone: "0987654350",
        userCitizenID: "123456818",
        userAddress: "Số 160, Đường Hùng Vương, Đà Lạt",
        identificationNumber: "ID100030",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Hồ Sỹ FF",
        dateOfBirth: "1995-02-10",
        gender: "male",
        userEmail: "hosyff@example.com",
        userPhone: "0987654351",
        userCitizenID: "123456819",
        userAddress: "Số 170, Đường Hai Bà Trưng, TP. HCM",
        identificationNumber: "ID100031",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Lương Thị GG",
        dateOfBirth: "1982-08-22",
        gender: "female",
        userEmail: "luongthigg@example.com",
        userPhone: "0987654352",
        userCitizenID: "123456820",
        userAddress: "Số 180, Đường Trần Quý Cáp, Hà Nội",
        identificationNumber: "ID100032",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Huỳnh Tấn HH",
        dateOfBirth: "1998-04-05",
        gender: "male",
        userEmail: "huynhtanhh@example.com",
        userPhone: "0987654353",
        userCitizenID: "123456821",
        userAddress: "Số 190, Đường Điện Biên Phủ, Đà Nẵng",
        identificationNumber: "ID100033",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Lê Thị II",
        dateOfBirth: "1985-12-09",
        gender: "female",
        userEmail: "lethiii@example.com",
        userPhone: "0987654354",
        userCitizenID: "123456822",
        userAddress: "Số 200, Đường Nguyễn Tri Phương, Hải Phòng",
        identificationNumber: "ID100034",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Cao Văn JJ",
        dateOfBirth: "1991-07-14",
        gender: "male",
        userEmail: "caovanjj@example.com",
        userPhone: "0987654355",
        userCitizenID: "123456823",
        userAddress: "Số 210, Đường Ba Mươi Tháng Tư, Cần Thơ",
        identificationNumber: "ID100035",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Phan Thị KK",
        dateOfBirth: "1983-01-28",
        gender: "female",
        userEmail: "phanthikk@example.com",
        userPhone: "0987654356",
        userCitizenID: "123456824",
        userAddress: "Số 220, Đường Trần Hưng Đạo, Huế",
        identificationNumber: "ID100036",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Nguyễn Văn LL",
        dateOfBirth: "1999-06-03",
        gender: "male",
        userEmail: "nguyenvanll@example.com",
        userPhone: "0987654357",
        userCitizenID: "123456825",
        userAddress: "Số 230, Đường Hùng Vương, Đà Lạt",
        identificationNumber: "ID100037",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Trần Thị MM",
        dateOfBirth: "1986-10-16",
        gender: "female",
        userEmail: "tranthimm@example.com",
        userPhone: "0987654358",
        userCitizenID: "123456826",
        userAddress: "Số 240, Đường Nguyễn Thái Học, Quy Nhơn",
        identificationNumber: "ID100038",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Phạm Tiến NN",
        dateOfBirth: "1989-02-02",
        gender: "male",
        userEmail: "phamtiennn@example.com",
        userPhone: "0987654359",
        userCitizenID: "123456827",
        userAddress: "Số 250, Đường Yersin, Nha Trang",
        identificationNumber: "ID100039",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
      {
        fullName: "Lê Thu OO",
        dateOfBirth: "1981-07-29",
        gender: "female",
        userEmail: "lethioo@example.com",
        userPhone: "0987654360",
        userCitizenID: "123456828",
        userAddress: "Số 260, Đường Lê Duẩn, Buôn Ma Thuột",
        identificationNumber: "ID100040",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
      },
    ];

    await User.bulkCreate(users);
    console.log("Thêm 40 users vào database thành công.");
  } catch (error) {
    console.error("Lỗi khi chèn users:", error);
  }
};

// 20 shipper
const insertShippers = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối với database thành công.");

    const generateRandomDate = (start, end) => {
      const date = new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
      );
      return date.toISOString().slice(0, 10); // Format to YYYY-MM-DD
    };

    const shippers = [
      {
        name: "Nguyễn Văn Tèo",
        gender: "male", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "Hà Nội",
        address: "123 Đường Láng, Đống Đa, Hà Nội",
        phone: "0912345671",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "teo.nguyen@example.com",
        status: "active",
        activityArea: "Hà Nội",
        shippingMethod: "Xe máy",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Trần Thị Hoa",
        gender: "female", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "TP. Hồ Chí Minh",
        address: "456 Nguyễn Trãi, Quận 5, TP.HCM",
        phone: "0987654321",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "hoa.tran@example.com",
        status: "active",
        activityArea: "TP.HCM",
        shippingMethod: "Xe máy",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Lê Văn Ba",
        gender: "male", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "Đà Nẵng",
        address: "789 Lê Duẩn, Hải Châu, Đà Nẵng",
        phone: "0909876543",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "ba.le@example.com",
        status: "inactive",
        activityArea: "Đà Nẵng",
        shippingMethod: "Xe đạp",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Phạm Thị Tư",
        gender: "female", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "Hải Phòng",
        address: "101 Điện Biên Phủ, Lê Chân, Hải Phòng",
        phone: "0976543210",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "tu.pham@example.com",
        status: "pending",
        activityArea: "Hải Phòng",
        shippingMethod: "Xe máy",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Hoàng Minh Đức",
        gender: "male", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "Cần Thơ",
        address: "1122 Trần Hưng Đạo, Ninh Kiều, Cần Thơ",
        phone: "0965432109",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "duc.hoang@example.com",
        status: "active",
        activityArea: "Cần Thơ",
        shippingMethod: "Xe máy",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Vũ Thị Hà",
        gender: "female", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "Huế",
        address: "3344 Hùng Vương, TP. Huế",
        phone: "0954321098",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "ha.vu@example.com",
        status: "inactive",
        activityArea: "Huế",
        shippingMethod: "Xe đạp",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Đỗ Xuân Trường",
        gender: "male", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "Bắc Ninh",
        address: "5566 Nguyễn Trãi, TP. Bắc Ninh",
        phone: "0943210987",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "truong.do@example.com",
        status: "pending",
        activityArea: "Bắc Ninh",
        shippingMethod: "Xe máy",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Lý Thanh Mai",
        gender: "female", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "Vinh",
        address: "7788 Lê Hồng Phong, TP. Vinh",
        phone: "0932109876",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "mai.ly@example.com",
        status: "active",
        activityArea: "Vinh",
        shippingMethod: "Xe máy",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Cao Hoàng Nam",
        gender: "male", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "Nha Trang",
        address: "9900 Trần Phú, TP. Nha Trang",
        phone: "0921098765",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "nam.cao@example.com",
        status: "inactive",
        activityArea: "Nha Trang",
        shippingMethod: "Xe đạp",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Phan Thu Thủy",
        gender: "female", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "Đà Lạt",
        address: "112 Nguyễn Du, TP. Đà Lạt",
        phone: "0910987654",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "thuy.phan@example.com",
        status: "pending",
        activityArea: "Đà Lạt",
        shippingMethod: "Xe máy",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Trần Đình Khôi",
        gender: "male", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "Hà Nội",
        address: "223 Nguyễn Khuyến, Đống Đa, Hà Nội",
        phone: "0978901234",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "khoi.tran@example.com",
        status: "active",
        activityArea: "Hà Nội",
        shippingMethod: "Xe máy",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Lê Thị Phương",
        gender: "female", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "TP. Hồ Chí Minh",
        address: "445 Pasteur, Quận 1, TP.HCM",
        phone: "0967890123",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "phuong.le@example.com",
        status: "inactive",
        activityArea: "TP.HCM",
        shippingMethod: "Xe đạp",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Hoàng Văn Quyết",
        gender: "male", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "Hải Phòng",
        address: "667 Trần Phú, Ngô Quyền, Hải Phòng",
        phone: "0956789012",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "quyet.hoang@example.com",
        status: "pending",
        activityArea: "Hải Phòng",
        shippingMethod: "Xe máy",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Phạm Thị Quỳnh Anh",
        gender: "female", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "Cần Thơ",
        address: "889 Cách Mạng Tháng 8, TP. Cần Thơ",
        phone: "0945678901",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "quynhanh.pham@example.com",
        status: "active",
        activityArea: "Cần Thơ",
        shippingMethod: "Xe máy",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Đặng Tiến Dũng",
        gender: "male", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "Đà Nẵng",
        address: "1012 Hùng Vương, Hải Châu, Đà Nẵng",
        phone: "0934567890",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "dung.dang@example.com",
        status: "inactive",
        activityArea: "Đà Nẵng",
        shippingMethod: "Xe máy",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Vũ Ngọc Ánh",
        gender: "female", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "Huế",
        address: "1214 Trần Cao Vân, TP. Huế",
        phone: "0923456789",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "ngocanh.vu@example.com",
        status: "pending",
        activityArea: "Huế",
        shippingMethod: "Xe đạp",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Bùi Thế Anh",
        gender: "male", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "Bắc Ninh",
        address: "1416 Lý Thái Tổ, TP. Bắc Ninh",
        phone: "0913456789",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "theanh.bui@example.com",
        status: "active",
        activityArea: "Bắc Ninh",
        shippingMethod: "Xe máy",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Ngô Thùy Linh",
        gender: "female", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "Vinh",
        address: "1618 Nguyễn Thị Minh Khai, TP. Vinh",
        phone: "0902345678",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "thuylinh.ngo@example.com",
        status: "inactive",
        activityArea: "Vinh",
        shippingMethod: "Xe máy",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Lê Cao Cường",
        gender: "male", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "Nha Trang",
        address: "1820 Thống Nhất, TP. Nha Trang",
        phone: "0971234567",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "caocuong.le@example.com",
        status: "pending",
        activityArea: "Nha Trang",
        shippingMethod: "Xe máy",
        joinedDate: new Date(), // Added joinedDate
      },
      {
        name: "Phạm Thị Diệu",
        gender: "female", // Corrected to match model enum
        dateOfBirth: generateRandomDate(
          new Date(1980, 0, 1),
          new Date(2000, 11, 31)
        ),
        hometown: "Đà Lạt",
        address: "2022 Hai Bà Trưng, TP. Đà Lạt",
        phone: "0960123456",
        idCardFrontFile:
          "https://image.tinnhanhchungkhoan.vn/w660/Uploaded/2025/WpxlCdjwi/2014_03_17/20_RKNL.jpg",
        idCardBackFile:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/9/12/photo1662955465034-1662955465094777553497.jpg",
        email: "dieu.pham@example.com",
        status: "active",
        activityArea: "Đà Lạt",
        shippingMethod: "Xe đạp",
        joinedDate: new Date(), // Added joinedDate
      },
    ];

    await Shipper.bulkCreate(shippers);
    console.log("Đã tạo thành công 20 shippers.");
  } catch (error) {
    console.error("Lỗi khi tạo dữ liệu:", error);
  }
};

// 30 address
const insertAddresses = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối với database thành công.");

    const addresses = [
      {
        user_id: 1,
        fullName: "Nguyễn Văn A",
        phone: "0987654321",
        province: "Hà Nội",
        city: "Hoàn Kiếm",
        district: "Ba Đình",
        ward: "Phường Cống Vị",
        street: "Số 10, Đường Láng",
        default: true,
      },
      {
        user_id: 2,
        fullName: "Trần Thị B",
        phone: "0987654322",
        province: "Hà Nội",
        city: "Hai Bà Trưng",
        district: "Đống Đa",
        ward: "Phường Khâm Thiên",
        street: "Số 20, Đường Trần Hưng Đạo",
        default: false,
      },
      {
        user_id: 3,
        fullName: "Lê Văn C",
        phone: "0987654323",
        province: "TP. Hồ Chí Minh",
        city: "Quận 1",
        district: "Bình Thạnh",
        ward: "Phường 15",
        street: "Số 15, Đường Nguyễn Chí Thanh",
        default: true,
      },
      {
        user_id: 4,
        fullName: "Phạm Thu D",
        phone: "0987654324",
        province: "Đà Nẵng",
        city: "Hải Châu",
        district: "Thanh Khê",
        ward: "Phường Hòa Khê",
        street: "Số 30, Đường Quang Trung",
        default: false,
      },
      {
        user_id: 5,
        fullName: "Đỗ Minh E",
        phone: "0987654325",
        province: "Hải Phòng",
        city: "Ngô Quyền",
        district: "Lê Chân",
        ward: "Phường Dư Hàng",
        street: "Số 5, Đường Lê Lợi",
        default: true,
      },
      {
        user_id: 6,
        fullName: "Hoàng Anh F",
        phone: "0987654326",
        province: "Cần Thơ",
        city: "Ninh Kiều",
        district: "Bình Thủy",
        ward: "Phường An Thới",
        street: "Số 8, Đường Võ Văn Kiệt",
        default: false,
      },
      {
        user_id: 7,
        fullName: "Nguyễn Thị G",
        phone: "0987654327",
        province: "Huế",
        city: "Thừa Thiên Huế",
        district: "Hương Thủy",
        ward: "Phường Thuận An",
        street: "Số 25, Đường Hoàng Hoa Thám",
        default: true,
      },
      {
        user_id: 8,
        fullName: "Trịnh Văn H",
        phone: "0987654328",
        province: "Bắc Ninh",
        city: "Từ Sơn",
        district: "Tiên Du",
        ward: "Phường Đông Ngàn",
        street: "Số 18, Đường Nguyễn Văn Cừ",
        default: false,
      },
      {
        user_id: 9,
        fullName: "Bùi Hữu I",
        phone: "0987654329",
        province: "Nghệ An",
        city: "Vinh",
        district: "Cửa Lò",
        ward: "Phường Nghi Hương",
        street: "Số 30, Đường Phạm Văn Đồng",
        default: true,
      },
      {
        user_id: 10,
        fullName: "Đặng Thị J",
        phone: "0987654330",
        province: "Khánh Hòa",
        city: "Nha Trang",
        district: "Diên Khánh",
        ward: "Phường Vĩnh Nguyên",
        street: "Số 40, Đường Trường Chinh",
        default: false,
      },
      {
        user_id: 11,
        fullName: "Lý Minh K",
        phone: "0987654331",
        province: "Đồng Nai",
        city: "Biên Hòa",
        district: "Long Thành",
        ward: "Phường An Bình",
        street: "Số 50, Đường Nguyễn Ái Quốc",
        default: true,
      },
      {
        user_id: 12,
        fullName: "Nguyễn Hữu L",
        phone: "0987654332",
        province: "Bình Dương",
        city: "Thủ Dầu Một",
        district: "Thuận An",
        ward: "Phường An Phú",
        street: "Số 60, Đường Đại Lộ Bình Dương",
        default: false,
      },
      {
        user_id: 13,
        fullName: "Phan Thị M",
        phone: "0987654333",
        province: "Quảng Ninh",
        city: "Hạ Long",
        district: "Cẩm Phả",
        ward: "Phường Bãi Cháy",
        street: "Số 70, Đường Trần Phú",
        default: true,
      },
      {
        user_id: 14,
        fullName: "Trương Văn N",
        phone: "0987654334",
        province: "Lâm Đồng",
        city: "Đà Lạt",
        district: "Bảo Lộc",
        ward: "Phường 7",
        street: "Số 80, Đường Lê Duẩn",
        default: false,
      },
      {
        user_id: 15,
        fullName: "Vũ Thanh O",
        phone: "0987654335",
        province: "Quảng Nam",
        city: "Tam Kỳ",
        district: "Điện Bàn",
        ward: "Phường Thanh Hà",
        street: "Số 90, Đường Phan Bội Châu",
        default: true,
      },
      {
        user_id: 16,
        fullName: "Lê Đình P",
        phone: "0987654336",
        province: "Thái Bình",
        city: "Thái Bình",
        district: "Kiến Xương",
        ward: "Phường Đông Hưng",
        street: "Số 100, Đường Nguyễn Du",
        default: false,
      },
      {
        user_id: 17,
        fullName: "Phạm Văn Q",
        phone: "0987654337",
        province: "Bắc Giang",
        city: "Bắc Giang",
        district: "Hiệp Hòa",
        ward: "Phường Cẩm Đông",
        street: "Số 110, Đường Bạch Đằng",
        default: true,
      },
      {
        user_id: 18,
        fullName: "Đặng Thị R",
        phone: "0987654338",
        province: "Sơn La",
        city: "Mộc Châu",
        district: "Yên Châu",
        ward: "Phường Chiềng Cọ",
        street: "Số 120, Đường Tô Hiệu",
        default: false,
      },
      // Add 12 more addresses to reach a total of 30
      {
        user_id: 1, // Reusing user IDs for demonstration
        fullName: "Nguyễn Văn A",
        phone: "0987654339",
        province: "Hà Nội",
        city: "Đống Đa",
        district: "Quốc Tử Giám",
        ward: "Văn Miếu",
        street: "58 Quốc Tử Giám",
        default: false,
      },
      {
        user_id: 2,
        fullName: "Trần Thị B",
        phone: "0987654340",
        province: "TP. Hồ Chí Minh",
        city: "Quận 3",
        district: "Phường 8",
        ward: "Nguyễn Thị Minh Khai",
        street: "123 Nguyễn Thị Minh Khai",
        default: true,
      },
      {
        user_id: 3,
        fullName: "Lê Văn C",
        phone: "0987654341",
        province: "Đà Nẵng",
        city: "Thanh Khê",
        district: "Vĩnh Trung",
        ward: "Nguyễn Văn Linh",
        street: "456 Nguyễn Văn Linh",
        default: false,
      },
      {
        user_id: 4,
        fullName: "Phạm Thu D",
        phone: "0987654342",
        province: "Hà Nội",
        city: "Ba Đình",
        district: "Điện Biên",
        ward: "Hoàng Diệu",
        street: "37 Hùng Vương",
        default: true,
      },
      {
        user_id: 5,
        fullName: "Đỗ Minh E",
        phone: "0987654343",
        province: "Hải Phòng",
        city: "Lê Chân",
        district: "Cát Dài",
        ward: "An Biên",
        street: "67 Điện Biên Phủ",
        default: false,
      },
      {
        user_id: 6,
        fullName: "Hoàng Anh F",
        phone: "0987654344",
        province: "Cần Thơ",
        city: "Ninh Kiều",
        district: "Xuân Khánh",
        ward: "30 Tháng 4",
        street: "101 30 Tháng 4",
        default: true,
      },
      {
        user_id: 7,
        fullName: "Nguyễn Thị G",
        phone: "0987654345",
        province: "Huế",
        city: "Thừa Thiên Huế",
        district: "Phường Đúc",
        ward: "Kim Long",
        street: "28 Nguyễn Chí Diểu",
        default: false,
      },
      {
        user_id: 8,
        fullName: "Trịnh Văn H",
        phone: "0987654346",
        province: "Bắc Ninh",
        city: "Từ Sơn",
        district: "Đông Ngàn",
        ward: "Tân Hồng",
        street: "9 Quang Trung",
        default: true,
      },
      {
        user_id: 9,
        fullName: "Bùi Hữu I",
        phone: "0987654347",
        province: "Nghệ An",
        city: "Vinh",
        district: "Hồng Sơn",
        ward: "Lê Mao",
        street: "33 Nguyễn Thái Học",
        default: false,
      },
      {
        user_id: 10,
        fullName: "Đặng Thị J",
        phone: "0987654348",
        province: "Khánh Hòa",
        city: "Nha Trang",
        district: "Vạn Thạnh",
        ward: "Yersin",
        street: "56 Yersin",
        default: true,
      },
      {
        user_id: 11,
        fullName: "Lý Minh K",
        phone: "0987654349",
        province: "Đồng Nai",
        city: "Biên Hòa",
        district: "Thống Nhất",
        ward: "Nguyễn Du",
        street: "78 Nguyễn Du",
        default: false,
      },
      {
        user_id: 12,
        fullName: "Nguyễn Hữu L",
        phone: "0987654350",
        province: "Bình Dương",
        city: "Thủ Dầu Một",
        district: "Phú Cường",
        ward: "Yên Thế",
        street: "134 Yersin",
        default: true,
      },
    ];

    await Address.bulkCreate(addresses);
    console.log("Thêm 30 địa chỉ vào database thành công.");

    // await sequelize.close(); // Remove if connection is managed externally
    // console.log("Đóng kết nối database.");
  } catch (error) {
    console.error("Lỗi khi chèn địa chỉ:", error);
  }
};

// 30 shop
const insertShops = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối với database thành công.");

    const shops = [
      {
        shopName: "Tech World",
        ownerID: 1,
        taxCode: "123456789",
        shopEmail: "techworld@example.com",
        shopPhone: "0987654321",
        shopDescription: "Your go-to place for the latest tech gadgets.",
        shopPickUpAddress: "123 Tech Street, Hanoi",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "9:00 AM - 9:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Electronics",
        shopRating: 4.5,
        shopBankAccountNumber: "9876543210",
        shopBankName: "Vietcombank",
      },
      {
        shopName: "Fashion Hub",
        ownerID: 2,
        taxCode: "234567890",
        shopEmail: "fashionhub@example.com",
        shopPhone: "0976543210",
        shopDescription: "Trendy fashion for all ages.",
        shopPickUpAddress: "45 Fashion Street, Ho Chi Minh",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "10:00 AM - 8:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Clothing",
        shopRating: 4.2,
        shopBankAccountNumber: "8765432109",
        shopBankName: "TPBank",
      },
      {
        shopName: "Home Essentials",
        ownerID: 3,
        taxCode: "345678901",
        shopEmail: "homeessentials@example.com",
        shopPhone: "0965432109",
        shopDescription: "All your home needs in one place.",
        shopPickUpAddress: "78 Home Street, Da Nang",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "8:00 AM - 10:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Home & Living",
        shopRating: 4.0,
        shopBankAccountNumber: "7654321098",
        shopBankName: "MB Bank",
      },
      {
        shopName: "Gourmet Delights",
        ownerID: 4,
        taxCode: "456789012",
        shopEmail: "gourmet@example.com",
        shopPhone: "0954321098",
        shopDescription: "Delicious gourmet food and drinks.",
        shopPickUpAddress: "12 Food Court, Hue",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "7:00 AM - 11:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Food & Beverages",
        shopRating: 4.7,
        shopBankAccountNumber: "6543210987",
        shopBankName: "BIDV",
      },
      {
        shopName: "Fitness Pro",
        ownerID: 5,
        taxCode: "567890123",
        shopEmail: "fitnesspro@example.com",
        shopPhone: "0943210987",
        shopDescription: "The best place for fitness gear.",
        shopPickUpAddress: "33 Gym Street, Nha Trang",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "6:00 AM - 10:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Fitness & Sports",
        shopRating: 4.8,
        shopBankAccountNumber: "5432109876",
        shopBankName: "Agribank",
      },
      {
        shopName: "Book Nook",
        ownerID: 6,
        taxCode: "678901234",
        shopEmail: "booknook@example.com",
        shopPhone: "0932109876",
        shopDescription: "A cozy place for book lovers.",
        shopPickUpAddress: "66 Book Street, Can Tho",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "9:00 AM - 8:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Books",
        shopRating: 4.6,
        shopBankAccountNumber: "4321098765",
        shopBankName: "ACB",
      },
      {
        shopName: "Art Gallery",
        ownerID: 7,
        taxCode: "789012345",
        shopEmail: "artgallery@example.com",
        shopPhone: "0921098765",
        shopDescription: "Discover beautiful art pieces.",
        shopPickUpAddress: "99 Art Street, Hoi An",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "10:00 AM - 7:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Arts & Crafts",
        shopRating: 4.4,
        shopBankAccountNumber: "3210987654",
        shopBankName: "Sacombank",
      },
      {
        shopName: "Pet Paradise",
        ownerID: 8,
        taxCode: "890123456",
        shopEmail: "petparadise@example.com",
        shopPhone: "0910987654",
        shopDescription: "Everything your pet needs.",
        shopPickUpAddress: "11 Pet Street, Vung Tau",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "8:00 AM - 9:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Pet Supplies",
        shopRating: 4.3,
        shopBankAccountNumber: "2109876543",
        shopBankName: "Eximbank",
      },
      {
        shopName: "Toy Land",
        ownerID: 9,
        taxCode: "901234567",
        shopEmail: "toyland@example.com",
        shopPhone: "0909876543",
        shopDescription: "A world of toys for kids.",
        shopPickUpAddress: "22 Toy Street, Hai Phong",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "9:30 AM - 8:30 PM",
        shopJoinedDate: new Date(),
        businessType: "Toys & Games",
        shopRating: 4.5,
        shopBankAccountNumber: "1098765432",
        shopBankName: "VPBank",
      },
      {
        shopName: "Music Mania",
        ownerID: 10,
        taxCode: "012345678",
        shopEmail: "musicmania@example.com",
        shopPhone: "0998765432",
        shopDescription: "All your music needs in one place.",
        shopPickUpAddress: "44 Music Street, Phu Quoc",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "10:30 AM - 9:30 PM",
        shopJoinedDate: new Date(),
        businessType: "Music & Instruments",
        shopRating: 4.1,
        shopBankAccountNumber: "0987654321",
        shopBankName: "Shinhan Bank",
      },
      {
        shopName: "Garden Bliss",
        ownerID: 11,
        taxCode: "112233445",
        shopEmail: "gardenbliss@example.com",
        shopPhone: "0987123456",
        shopDescription: "Everything for your gardening needs.",
        shopPickUpAddress: "55 Garden Street, Sapa",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "8:30 AM - 7:30 PM",
        shopJoinedDate: new Date(),
        businessType: "Home & Garden",
        shopRating: 4.6,
        shopBankAccountNumber: "1234567890",
        shopBankName: "DongA Bank",
      },
      {
        shopName: "Coffee Corner",
        ownerID: 12,
        taxCode: "223344556",
        shopEmail: "coffeecorner@example.com",
        shopPhone: "0976234567",
        shopDescription: "Your daily dose of caffeine.",
        shopPickUpAddress: "77 Coffee Street, Buon Ma Thuot",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "7:00 AM - 6:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Food & Beverages",
        shopRating: 4.9,
        shopBankAccountNumber: "2345678901",
        shopBankName: "OCB",
      },
      {
        shopName: "Travel Treasures",
        ownerID: 13,
        taxCode: "334455667",
        shopEmail: "traveltreasures@example.com",
        shopPhone: "0965345678",
        shopDescription: "Everything you need for your next adventure.",
        shopPickUpAddress: "88 Travel Street, Ha Long",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "9:00 AM - 8:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Travel & Outdoors",
        shopRating: 4.4,
        shopBankAccountNumber: "3456789012",
        shopBankName: "LienVietPostBank",
      },
      {
        shopName: "Creative Studio",
        ownerID: 14,
        taxCode: "445566778",
        shopEmail: "creativestudio@example.com",
        shopPhone: "0954456789",
        shopDescription: "Unleash your creativity.",
        shopPickUpAddress: "99 Creative Street, Dalat",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "10:00 AM - 9:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Arts & Crafts",
        shopRating: 4.7,
        shopBankAccountNumber: "4567890123",
        shopBankName: "Maritime Bank",
      },
      {
        shopName: "Health Hub",
        ownerID: 15,
        taxCode: "556677889",
        shopEmail: "healthhub@example.com",
        shopPhone: "0943567890",
        shopDescription: "Your one-stop shop for health and wellness.",
        shopPickUpAddress: "10 Health Street, Vinh",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "8:00 AM - 7:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Health & Beauty",
        shopRating: 4.3,
        shopBankAccountNumber: "5678901234",
        shopBankName: "SeABank",
      },
      {
        shopName: "Vintage Vibes",
        ownerID: 16,
        taxCode: "667788990",
        shopEmail: "vintagevibes@example.com",
        shopPhone: "0932678901",
        shopDescription: "Unique vintage finds.",
        shopPickUpAddress: "11 Vintage Street, My Tho",
        shopStatus: "pending",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "11:00 AM - 8:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Clothing",
        shopRating: 4.8,
        shopBankAccountNumber: "6789012345",
        shopBankName: "Bac A Bank",
      },
      {
        shopName: "Tool Time",
        ownerID: 17,
        taxCode: "778899001",
        shopEmail: "tooltime@example.com",
        shopPhone: "0921789012",
        shopDescription: "All the tools you need for your projects.",
        shopPickUpAddress: "22 Tool Street, Rach Gia",
        shopStatus: "pending",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "7:30 AM - 6:30 PM",
        shopJoinedDate: new Date(),
        businessType: "Hardware",
        shopRating: 4.2,
        shopBankAccountNumber: "7890123456",
        shopBankName: "PVcomBank",
      },
      {
        shopName: "Kids Kingdom",
        ownerID: 18,
        taxCode: "889900112",
        shopEmail: "kidskingdom@example.com",
        shopPhone: "0910890123",
        shopDescription: "Everything for kids, from toys to clothes.",
        shopPickUpAddress: "33 Kids Street, Long Xuyen",
        shopStatus: "pending",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "9:30 AM - 7:30 PM",
        shopJoinedDate: new Date(),
        businessType: "Children's Products",
        shopRating: 4.5,
        shopBankAccountNumber: "8901234567",
        shopBankName: "GPBank",
      },
      {
        shopName: "Sports Station",
        ownerID: 19,
        taxCode: "990011223",
        shopEmail: "sportsstation@example.com",
        shopPhone: "0999901234",
        shopDescription: "All your sports equipment needs.",
        shopPickUpAddress: "44 Sports Street, Cao Lanh",
        shopStatus: "pending",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "6:30 AM - 9:30 PM",
        shopJoinedDate: new Date(),
        businessType: "Fitness & Sports",
        shopRating: 4.6,
        shopBankAccountNumber: "9012345678",
        shopBankName: "SCB",
      },
      {
        shopName: "Super Mart",
        ownerID: 20,
        taxCode: "001122334",
        shopEmail: "supermart@example.com",
        shopPhone: "0988776655",
        shopDescription: "Your local supermarket.",
        shopPickUpAddress: "55 Market Street, Can Tho",
        shopStatus: "pending",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "7:00 AM - 10:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Groceries",
        shopRating: 4.2,
        shopBankAccountNumber: "9876123450",
        shopBankName: "Techcombank",
      },
      {
        shopName: "Green Grocer",
        ownerID: 21,
        taxCode: "112233445",
        shopEmail: "greengrocer@example.com",
        shopPhone: "0977889900",
        shopDescription: "Fresh produce and organic goods.",
        shopPickUpAddress: "66 Farm Street, Hanoi",
        shopStatus: "pending",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "8:00 AM - 8:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Organic Food",
        shopRating: 4.5,
        shopBankAccountNumber: "8765432190",
        shopBankName: "ACB",
      },
      {
        shopName: "Electro Zone",
        ownerID: 22,
        taxCode: "223344556",
        shopEmail: "electozone@example.com",
        shopPhone: "0966554433",
        shopDescription: "The best deals on electronics.",
        shopPickUpAddress: "77 Tech Street, Hai Phong",
        shopStatus: "pending",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "9:00 AM - 9:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Electronics",
        shopRating: 4.7,
        shopBankAccountNumber: "7654321089",
        shopBankName: "Sacombank",
      },
      {
        shopName: "Style Boutique",
        ownerID: 23,
        taxCode: "334455667",
        shopEmail: "styleboutique@example.com",
        shopPhone: "0955443322",
        shopDescription: "The latest fashion trends.",
        shopPickUpAddress: "88 Fashion Street, Da Nang",
        shopStatus: "pending",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "10:00 AM - 7:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Clothing",
        shopRating: 4.9,
        shopBankAccountNumber: "6543210978",
        shopBankName: "Eximbank",
      },
      {
        shopName: "Health First",
        ownerID: 24,
        taxCode: "445566778",
        shopEmail: "healthfirst@example.com",
        shopPhone: "0944332211",
        shopDescription: "Your health is our priority.",
        shopPickUpAddress: "99 Health Street, Ho Chi Minh",
        shopStatus: "pending",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "8:00 AM - 6:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Health & Beauty",
        shopRating: 4.6,
        shopBankAccountNumber: "5432109876",
        shopBankName: "VPBank",
      },
      {
        shopName: "Craft Corner",
        ownerID: 25,
        taxCode: "556677889",
        shopEmail: "craftcorner@example.com",
        shopPhone: "0933221100",
        shopDescription: "Handmade crafts and gifts.",
        shopPickUpAddress: "10 Craft Street, Vinh",
        shopStatus: "pending",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "9:00 AM - 5:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Arts & Crafts",
        shopRating: 4.4,
        shopBankAccountNumber: "4321098765",
        shopBankName: "Shinhan Bank",
      },
      {
        shopName: "Pet Zone",
        ownerID: 26,
        taxCode: "667788990",
        shopEmail: "petzone@example.com",
        shopPhone: "0922110099",
        shopDescription: "Everything for your furry friends.",
        shopPickUpAddress: "22 Pet Street, Nha Trang",
        shopStatus: "pending",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "10:00 AM - 8:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Pet Supplies",
        shopRating: 4.1,
        shopBankAccountNumber: "3210987654",
        shopBankName: "DongA Bank",
      },
      {
        shopName: "Toy Station",
        ownerID: 27,
        taxCode: "778899001",
        shopEmail: "toystation@example.com",
        shopPhone: "0911009988",
        shopDescription: "A wonderland of toys and games.",
        shopPickUpAddress: "33 Toy Street, Hai Phong",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "8:00 AM - 9:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Toys & Games",
        shopRating: 4.8,
        shopBankAccountNumber: "2109876543",
        shopBankName: "OCB",
      },
      {
        shopName: "Music Store",
        ownerID: 28,
        taxCode: "889900112",
        shopEmail: "musicstore@example.com",
        shopPhone: "0900998877",
        shopDescription: "Your one-stop music shop.",
        shopPickUpAddress: "44 Music Street, Can Tho",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "9:00 AM - 7:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Music & Instruments",
        shopRating: 4.3,
        shopBankAccountNumber: "1098765432",
        shopBankName: "LienVietPostBank",
      },
      {
        shopName: "Home Decor",
        ownerID: 29,
        taxCode: "990011223",
        shopEmail: "homedecor@example.com",
        shopPhone: "0999887766",
        shopDescription: "Beautify your home with our decor.",
        shopPickUpAddress: "55 Decor Street, Dalat",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "10:00 AM - 6:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Home & Living",
        shopRating: 4.5,
        shopBankAccountNumber: "9876543210",
        shopBankName: "Maritime Bank",
      },
      {
        shopName: "Coffee House",
        ownerID: 30,
        taxCode: "001122334",
        shopEmail: "coffeehouse@example.com",
        shopPhone: "0988776655",
        shopDescription: "Your daily coffee fix.",
        shopPickUpAddress: "66 Coffee Street, Hanoi",
        shopStatus: "active",
        shopAvatar:
          "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Hinh-dai-dien-buon-chiec-hop-buon-ba.jpg?1704789749713",
        shopOperationHours: "7:00 AM - 10:00 PM",
        shopJoinedDate: new Date(),
        businessType: "Food & Beverages",
        shopRating: 4.9,
        shopBankAccountNumber: "8765432109",
        shopBankName: "SeABank",
      },
    ];

    await Shop.bulkCreate(shops);
    console.log("Đã tạo thành công 30 shops.");
  } catch (error) {
    console.error("Lỗi khi tạo dữ liệu:", error);
  }
};

// 60 product
const insertProducts = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối với database thành công.");

    const products = [
      {
        shop_id: 1,
        product_name: "Áo sơ mi nam Oxford",
        description:
          "Áo sơ mi nam Oxford cotton, kiểu dáng slimfit, màu trắng, phù hợp công sở và đi chơi.",
        status: "active",
        price: 550000,
        quantity: 10,
      },
      {
        shop_id: 1,
        product_name: "Quần jeans nam Slimfit",
        description:
          "Quần jeans nam Slimfit, chất liệu denim cao cấp, màu xanh đen, size 28-34.",
        status: "active",
        price: 750000,
        quantity: 15,
      },
      {
        shop_id: 2,
        product_name: "Giày thể thao Adidas Ultraboost",
        description:
          "Giày thể thao Adidas Ultraboost, công nghệ Boost, êm ái và thoáng khí, màu đen.",
        status: "active",
        price: 3500000,
        quantity: 20,
      },
      {
        shop_id: 2,
        product_name: "Balo du lịch 50L",
        description:
          "Balo du lịch 50L, chống thấm nước, nhiều ngăn tiện lợi, màu xám.",
        status: "active",
        price: 950000,
        quantity: 12,
      },
      {
        shop_id: 3,
        product_name: "Nước hoa nam Dior Sauvage",
        description:
          "Nước hoa nam Dior Sauvage EDT, hương thơm nam tính, lịch lãm, 100ml.",
        status: "active",
        price: 2800000,
        quantity: 8,
      },
      {
        shop_id: 3,
        product_name: "Đồng hồ thông minh Apple Watch Series 8",
        description:
          "Đồng hồ thông minh Apple Watch Series 8, GPS, theo dõi sức khỏe, màu đen.",
        status: "active",
        price: 11000000,
        quantity: 5,
      },
      {
        shop_id: 4,
        product_name: "Bút ký Parker Jotter",
        description:
          "Bút ký Parker Jotter, ngòi bi, thân kim loại, sang trọng, phù hợp làm quà tặng.",
        status: "active",
        price: 450000,
        quantity: 25,
      },
      {
        shop_id: 4,
        product_name: "Sổ tay da Moleskine",
        description:
          "Sổ tay da Moleskine, gáy may, giấy cao cấp, kích thước A5, phù hợp cho doanh nhân.",
        status: "active",
        price: 600000,
        quantity: 18,
      },
      {
        shop_id: 5,
        product_name: "Laptop gaming ASUS ROG Strix G15",
        description:
          "Laptop gaming ASUS ROG Strix G15, Ryzen 9, RTX 3070, 15.6 inch, màn 144Hz.",
        status: "active",
        price: 35000000,
        quantity: 3,
      },
      {
        shop_id: 5,
        product_name: "Chuột không dây Logitech G Pro X Superlight",
        description:
          "Chuột gaming không dây Logitech G Pro X Superlight, siêu nhẹ, cảm biến HERO 25K.",
        status: "active",
        price: 1800000,
        quantity: 30,
      },
      {
        shop_id: 6,
        product_name: "Loa Bluetooth JBL Charge 5",
        description:
          "Loa Bluetooth JBL Charge 5, chống nước IP67, pin 20 giờ, âm thanh sống động.",
        status: "active",
        price: 3500000,
        quantity: 22,
      },
      {
        shop_id: 6,
        product_name: "Tai nghe chống ồn Sony WH-1000XM5",
        description:
          "Tai nghe chống ồn Sony WH-1000XM5, Bluetooth, Hi-Res Audio, chống ồn chủ động.",
        status: "active",
        price: 8500000,
        quantity: 10,
      },
      {
        shop_id: 7,
        product_name: "Bình giữ nhiệt Lock&Lock LHC618",
        description:
          "Bình giữ nhiệt Lock&Lock LHC618, inox 304, giữ nóng/lạnh 24 giờ, 500ml.",
        status: "active",
        price: 450000,
        quantity: 40,
      },
      {
        shop_id: 7,
        product_name: "Bộ dao nhà bếp Zwilling J.A. Henckels",
        description:
          "Bộ dao nhà bếp Zwilling J.A. Henckels, 5 món, thép không gỉ, sắc bén.",
        status: "active",
        price: 4500000,
        quantity: 15,
      },
      {
        shop_id: 8,
        product_name: "Bàn phím cơ Keychron K2",
        description:
          "Bàn phím cơ Keychron K2, layout 75%, Bluetooth, keycap PBT, switch Gateron Brown.",
        status: "active",
        price: 3200000,
        quantity: 7,
      },
      {
        shop_id: 8,
        product_name: "Máy pha cà phê Breville Barista Express",
        description:
          "Máy pha cà phê Breville Barista Express, xay cà phê, tạo bọt sữa, espresso, cappuccino.",
        status: "active",
        price: 22000000,
        quantity: 4,
      },
      {
        shop_id: 9,
        product_name: "Sạc dự phòng Anker PowerCore 10000mAh",
        description:
          "Sạc dự phòng Anker PowerCore 10000mAh, sạc nhanh PowerIQ, nhỏ gọn.",
        status: "active",
        price: 650000,
        quantity: 25,
      },
      {
        shop_id: 9,
        product_name: "Cáp sạc USB-C Anker PowerLine III",
        description:
          "Cáp sạc USB-C Anker PowerLine III, sạc nhanh, bền bỉ, 1.8m.",
        status: "active",
        price: 300000,
        quantity: 50,
      },
      {
        shop_id: 10,
        product_name: "Nồi chiên không dầu Philips HD9252/90",
        description:
          "Nồi chiên không dầu Philips HD9252/90, công nghệ Rapid Air, dung tích 4.1L.",
        status: "active",
        price: 4800000,
        quantity: 6,
      },
      {
        shop_id: 10,
        product_name: "Lò vi sóng Sharp R-20A1(S)",
        description:
          "Lò vi sóng Sharp R-20A1(S), 20 lít, chức năng hâm nóng, nấu, rã đông.",
        status: "active",
        price: 1900000,
        quantity: 3,
      },
      {
        shop_id: 11,
        product_name: "Máy giặt LG Inverter FV1409S2W",
        description:
          "Máy giặt LG Inverter FV1409S2W, 9kg, AI DD, Steam, tiết kiệm điện.",
        status: "active",
        price: 12000000,
        quantity: 2,
      },
      {
        shop_id: 11,
        product_name: "Tủ lạnh Samsung Inverter RT32K5982SL/SV",
        description:
          "Tủ lạnh Samsung Inverter RT32K5982SL/SV, 320L, 2 dàn lạnh độc lập, tiết kiệm điện.",
        status: "active",
        price: 9000000,
        quantity: 2,
      },
      {
        shop_id: 12,
        product_name: "Bộ bàn ghế ăn gỗ sồi tự nhiên",
        description:
          "Bộ bàn ghế ăn gỗ sồi tự nhiên, 6 ghế, kiểu dáng hiện đại, phù hợp phòng ăn.",
        status: "active",
        price: 8500000,
        quantity: 4,
      },
      {
        shop_id: 12,
        product_name: "Đèn LED để bàn Xiaomi Mijia",
        description:
          "Đèn LED để bàn Xiaomi Mijia, chống cận, điều chỉnh độ sáng, kết nối app.",
        status: "active",
        price: 750000,
        quantity: 30,
      },
      {
        shop_id: 13,
        product_name: "Tranh treo tường Canvas phong cảnh",
        description:
          "Tranh treo tường Canvas phong cảnh, kích thước 60x90cm, chất liệu canvas cao cấp.",
        status: "active",
        price: 1200000,
        quantity: 12,
      },
      {
        shop_id: 13,
        product_name: "Bộ chăn ga gối đệm cotton lụa",
        description:
          "Bộ chăn ga gối đệm cotton lụa, mềm mại, thoáng mát, kích thước King Size.",
        status: "active",
        price: 5500000,
        quantity: 5,
      },
      {
        shop_id: 14,
        product_name: "Bộ dụng cụ làm vườn Gardena",
        description:
          "Bộ dụng cụ làm vườn Gardena, 3 món, chất liệu thép không gỉ, bền bỉ.",
        status: "active",
        price: 950000,
        quantity: 20,
      },
      {
        shop_id: 14,
        product_name: "Hạt giống rau sạch F1",
        description:
          "Hạt giống rau sạch F1, dễ trồng, năng suất cao, nhiều loại rau.",
        status: "active",
        price: 250000,
        quantity: 100,
      },
      {
        shop_id: 15,
        product_name: "Bàn trà mặt kính cường lực",
        description:
          "Bàn trà mặt kính cường lực, chân gỗ, kiểu dáng hiện đại, phù hợp phòng khách.",
        status: "active",
        price: 2800000,
        quantity: 20,
      },
      {
        shop_id: 15,
        product_name: "Ghế sofa da thật góc L",
        description:
          "Ghế sofa da thật góc L, kiểu dáng sang trọng, chất liệu da cao cấp.",
        status: "active",
        price: 12000000,
        quantity: 40,
      },
      {
        shop_id: 1,
        product_name: "Áo phông nam Cotton Basic",
        description:
          "Áo phông nam Cotton Basic, chất liệu cotton 100%, thoáng mát, nhiều màu.",
        status: "active",
        price: 350000,
        quantity: 25,
      },
      {
        shop_id: 1,
        product_name: "Áo khoác nam Bomber",
        description:
          "Áo khoác nam Bomber, chất liệu kaki, lót dù, kiểu dáng trẻ trung.",
        status: "active",
        price: 900000,
        quantity: 20,
      },
      {
        shop_id: 2,
        product_name: "Túi xách nữ Michael Kors",
        description:
          "Túi xách nữ Michael Kors, da thật, kiểu dáng thời trang, nhiều màu.",
        status: "active",
        price: 5800000,
        quantity: 15,
      },
      {
        shop_id: 2,
        product_name: "Ví da nữ cầm tay Gucci",
        description: "Ví da nữ cầm tay Gucci, da thật, logo Gucci, sang trọng.",
        status: "active",
        price: 8500000,
        quantity: 10,
      },
      {
        shop_id: 3,
        product_name: "Sữa rửa mặt Cerave",
        description:
          "Sữa rửa mặt Cerave, dịu nhẹ, không tạo bọt, cho da nhạy cảm.",
        status: "active",
        price: 300000,
        quantity: 50,
      },
      {
        shop_id: 3,
        product_name: "Kem chống nắng La Roche-Posay",
        description:
          "Kem chống nắng La Roche-Posay, SPF 50+, kiềm dầu, cho da dầu.",
        status: "active",
        price: 550000,
        quantity: 40,
      },
      {
        shop_id: 4,
        product_name: "Bút bi Thiên Long",
        description: "Bút bi Thiên Long, mực xanh, viết êm, giá rẻ.",
        status: "active",
        price: 5000,
        quantity: 100,
      },
      {
        shop_id: 4,
        product_name: "Giấy note Post-it",
        description: "Giấy note Post-it, nhiều màu, dính chắc, tiện lợi.",
        status: "active",
        price: 45000,
        quantity: 80,
      },
      {
        shop_id: 5,
        product_name: "Bàn phím cơ Akko",
        description: "Bàn phím Akko, Blue switch, Keycap PBT, RGB.",
        status: "active",
        price: 1500000,
        quantity: 20,
      },
      {
        shop_id: 5,
        product_name: "Màn hình máy tính LG UltraGear 27 inch",
        description: "Màn hình máy tính LG UltraGear 27 inch, 144Hz, 1ms, IPS.",
        status: "active",
        price: 5500000,
        quantity: 10,
      },
      {
        shop_id: 6,
        product_name: "Máy nghe nhạc Sony Walkman NW-A306",
        description:
          "Máy nghe nhạc Sony Walkman NW-A306, Hires audio, bluetooth, wifi.",
        status: "active",
        price: 7500000,
        quantity: 15,
      },
      {
        shop_id: 6,
        product_name: "Đĩa than LP",
        description: "Đĩa than LP, các thể loại rock, pop, jazz.",
        status: "active",
        price: 1200000,
        quantity: 12,
      },
      {
        shop_id: 7,
        product_name: "Ly sứ Bát Tràng",
        description: "Ly sứ Bát Tràng, vẽ tay, nhiều hình dáng, họa tiết.",
        status: "active",
        price: 150000,
        quantity: 60,
      },
      {
        shop_id: 7,
        product_name: "Bát ăn cơm Minh Long",
        description: "Bát ăn cơm Minh Long, sứ trắng, cao cấp, bền đẹp.",
        status: "active",
        price: 120000,
        quantity: 50,
      },
      {
        shop_id: 8,
        product_name: "Máy xay sinh tố Philips",
        description:
          "Máy xay sinh tố Philips, công suất 500W, nhiều tốc độ xay.",
        status: "active",
        price: 2200000,
        quantity: 8,
      },
      {
        shop_id: 8,
        product_name: "Bếp từ đơn Xiaomi",
        description:
          "Bếp từ đơn Xiaomi, công suất 2100W, điều khiển cảm ứng, dễ dàng vệ sinh.",
        status: "active",
        price: 3500000,
        quantity: 5,
      },
      {
        shop_id: 9,
        product_name: "Ốp lưng điện thoại iPhone",
        description:
          "Ốp lưng điện thoại iPhone, nhiều mẫu, silicon, nhựa cứng.",
        status: "active",
        price: 200000,
        quantity: 70,
      },
      {
        shop_id: 9,
        product_name: "Tai nghe Bluetooth AirPods",
        description:
          "Tai nghe Bluetooth AirPods, kết nối nhanh, âm thanh chất lượng.",
        status: "active",
        price: 4500000,
        quantity: 30,
      },
      {
        shop_id: 10,
        product_name: "Tủ lạnh mini Aqua",
        description:
          "Tủ lạnh mini Aqua, nhỏ gọn, phù hợp sinh viên, văn phòng.",
        status: "active",
        price: 4200000,
        quantity: 3,
      },
      {
        shop_id: 10,
        product_name: "Máy lọc không khí Sharp",
        description:
          "Máy lọc không khí Sharp, công nghệ Plasmacluster, khử mùi, diệt khuẩn.",
        status: "active",
        price: 6500000,
        quantity: 2,
      },
      {
        shop_id: 11,
        product_name: "Giường gỗ sồi",
        description:
          "Giường ngủ gỗ sồi, kích thước 1m6x2m, kiểu dáng hiện đại.",
        status: "active",
        price: 8000000,
        quantity: 2,
      },
      {
        shop_id: 11,
        product_name: "Tủ quần áo gỗ công nghiệp",
        description:
          "Tủ quần áo gỗ công nghiệp, nhiều ngăn, cánh lùa, tiết kiệm diện tích.",
        status: "active",
        price: 9500000,
        quantity: 1,
      },
      {
        shop_id: 12,
        product_name: "Bàn học sinh Hòa Phát",
        description:
          "Bàn học sinh Hòa Phát, gỗ công nghiệp, chống cong vênh, nhiều màu.",
        status: "active",
        price: 1800000,
        quantity: 2,
      },
      {
        shop_id: 12,
        product_name: "Ghế văn phòng Ergonomic",
        description:
          "Ghế văn phòng Ergonomic, lưới thoáng khí, điều chỉnh độ cao, tựa lưng.",
        status: "active",
        price: 2200000,
        quantity: 4,
      },
      {
        shop_id: 13,
        product_name: "Rèm cửa chống nắng",
        description:
          "Rèm cửa chống nắng, vải dày, cản sáng 100%, nhiều màu sắc.",
        status: "active",
        price: 600000,
        quantity: 20,
      },
      {
        shop_id: 13,
        product_name: "Gương treo tường Decor",
        description:
          "Gương treo tường Decor, khung gỗ, nhiều hình dáng, trang trí phòng.",
        status: "active",
        price: 500000,
        quantity: 10,
      },
      {
        shop_id: 14,
        product_name: "Phân bón NPK",
        description: "Phân bón NPK, kích thích sinh trưởng, ra hoa, đậu quả.",
        status: "active",
        price: 150000,
        quantity: 100,
      },
      {
        shop_id: 14,
        product_name: "Chậu nhựa trồng cây",
        description:
          "Chậu nhựa trồng cây, nhiều kích cỡ, màu sắc, thoát nước tốt.",
        status: "active",
        price: 80000,
        quantity: 40,
      },
      {
        shop_id: 15,
        product_name: "Kệ TV gỗ công nghiệp",
        description:
          "Kệ TV gỗ công nghiệp, kiểu dáng đơn giản, nhiều ngăn chứa đồ.",
        status: "active",
        price: 1200000,
        quantity: 5,
      },
      {
        shop_id: 15,
        product_name: "Đèn trang trí phòng khách",
        description: "Đèn trang trí phòng khách, đèn chùm, đèn cây, đèn bàn.",
        status: "active",
        price: 800000,
        quantity: 5,
      },
      {
        shop_id: 1,
        product_name: "Thắt lưng da nam cao cấp",
        description:
          "Thắt lưng da nam cao cấp, da thật, khóa kim loại, sang trọng.",
        status: "active",
        price: 800000,
        quantity: 5,
      },
    ];

    await Product.bulkCreate(products);
    console.log("Đã tạo thành công 60 products.");
  } catch (error) {
    console.error("Lỗi khi tạo dữ liệu:", error);
  }
};

// 40 order
const insertOrders = async () => {
  try {
    await sequelize.authenticate(); // Đảm bảo kết nối trước khi sync
    console.log("Kết nối với database thành công.");
    // Mảng dữ liệu đơn hàng (để dùng bulkCreate)
    const orders = [
      {
        shop_id: 1,
        customer_id: 2,
        shipper_id: 3,
        address_id: 1,
        productFee: 150000,
        shippingFee: 30000,
        status: "completed",
        total: 180000,
        note: "Giao hàng giờ hành chính",
        payment_status: "paid",
        shipping_status: "shipped",
        payment_method: "COD",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 2 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 2,
        customer_id: 5,
        shipper_id: 1,
        address_id: 3,
        productFee: 250000,
        shippingFee: 35000,
        status: "completed",
        total: 285000,
        note: "Gọi điện trước khi giao",
        payment_status: "paid",
        shipping_status: "shipping",
        payment_method: "Credit Card",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 3 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 3,
        customer_id: 1,
        shipper_id: 2,
        address_id: 2,
        productFee: 100000,
        shippingFee: 25000,
        status: "completed",
        total: 125000,
        note: "Giao hàng nhanh giúp mình",
        payment_status: "paid",
        shipping_status: "shipped",
        payment_method: "Bank Transfer",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 4 * 60 * 60 * 1000
        ),
        actual_delivery_time: new Date(),
      },
      {
        shop_id: 4,
        customer_id: 3,
        shipper_id: 4,
        address_id: 4,
        productFee: 50000,
        shippingFee: 15000,
        status: "cancelled",
        total: 65000,
        note: "Khách hàng hủy đơn",
        payment_status: "pending",
        shipping_status: "not_yet_shipped",
        payment_method: "COD",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 5 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 5,
        customer_id: 4,
        shipper_id: 5,
        address_id: 5,
        productFee: 300000,
        shippingFee: 40000,
        status: "pending",
        total: 340000,
        note: "Không giao vào cuối tuần",
        payment_status: "pending",
        shipping_status: "not_yet_shipped",
        payment_method: "Momo",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 6 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 1,
        customer_id: 6,
        shipper_id: 3,
        address_id: 6,
        productFee: 180000,
        shippingFee: 32000,
        status: "completed",
        total: 212000,
        note: "Kiểm tra kỹ hàng trước khi giao",
        payment_status: "paid",
        shipping_status: "shipping",
        payment_method: "Credit Card",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 2 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 2,
        customer_id: 7,
        shipper_id: 1,
        address_id: 7,
        productFee: 120000,
        shippingFee: 28000,
        status: "completed",
        total: 148000,
        note: "Hàng giao nhanh, cảm ơn shop",
        payment_status: "paid",
        shipping_status: "shipped",
        payment_method: "Bank Transfer",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 3 * 60 * 60 * 1000
        ),
        actual_delivery_time: new Date(),
      },
      {
        shop_id: 3,
        customer_id: 8,
        shipper_id: 2,
        address_id: 8,
        productFee: 70000,
        shippingFee: 20000,
        status: "cancelled",
        total: 90000,
        note: "Đổi ý không mua nữa",
        payment_status: "pending",
        shipping_status: "not_yet_shipped",
        payment_method: "COD",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 4 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 4,
        customer_id: 9,
        shipper_id: 4,
        address_id: 9,
        productFee: 220000,
        shippingFee: 38000,
        status: "pending",
        total: 258000,
        note: "Giao hàng vào buổi tối",
        payment_status: "pending",
        shipping_status: "not_yet_shipped",
        payment_method: "Momo",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 5 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 5,
        customer_id: 10,
        shipper_id: 5,
        address_id: 10,
        productFee: 280000,
        shippingFee: 42000,
        status: "processing",
        total: 322000,
        note: "Gói hàng cẩn thận giúp mình",
        payment_status: "paid",
        shipping_status: "shipping",
        payment_method: "Credit Card",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 6 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 1,
        customer_id: 11,
        shipper_id: 3,
        address_id: 1,
        productFee: 160000,
        shippingFee: 31000,
        status: "completed",
        total: 191000,
        note: "Cảm ơn shop, hàng đẹp",
        payment_status: "paid",
        shipping_status: "shipped",
        payment_method: "Bank Transfer",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 4 * 60 * 60 * 1000
        ),
        actual_delivery_time: new Date(),
      },
      {
        shop_id: 2,
        customer_id: 12,
        shipper_id: 1,
        address_id: 3,
        productFee: 60000,
        shippingFee: 18000,
        status: "cancelled",
        total: 78000,
        note: "Thay đổi địa chỉ giao hàng",
        payment_status: "pending",
        shipping_status: "not_yet_shipped",
        payment_method: "COD",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 2 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 3,
        customer_id: 13,
        shipper_id: 2,
        address_id: 2,
        productFee: 230000,
        shippingFee: 39000,
        status: "pending",
        total: 269000,
        note: "Giao hàng nhanh giúp mình",
        payment_status: "pending",
        shipping_status: "not_yet_shipped",
        payment_method: "Momo",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 3 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 4,
        customer_id: 14,
        shipper_id: 4,
        address_id: 4,
        productFee: 290000,
        shippingFee: 43000,
        status: "processing",
        total: 333000,
        note: "Gói hàng cẩn thận",
        payment_status: "paid",
        shipping_status: "shipping",
        payment_method: "Credit Card",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 4 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 5,
        customer_id: 15,
        shipper_id: 5,
        address_id: 5,
        productFee: 130000,
        shippingFee: 29000,
        status: "completed",
        total: 159000,
        note: "Hàng tốt, cảm ơn shop",
        payment_status: "paid",
        shipping_status: "shipped",
        payment_method: "Bank Transfer",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 5 * 60 * 60 * 1000
        ),
        actual_delivery_time: new Date(),
      },
      {
        shop_id: 1,
        customer_id: 16,
        shipper_id: 3,
        address_id: 6,
        productFee: 80000,
        shippingFee: 22000,
        status: "cancelled",
        total: 102000,
        note: "Hủy đơn vì hết hàng",
        payment_status: "pending",
        shipping_status: "not_yet_shipped",
        payment_method: "COD",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 6 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 2,
        customer_id: 17,
        shipper_id: 1,
        address_id: 7,
        productFee: 240000,
        shippingFee: 40000,
        status: "pending",
        total: 280000,
        note: "Giao hàng đúng hẹn",
        payment_status: "pending",
        shipping_status: "not_yet_shipped",
        payment_method: "Momo",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 5 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 3,
        customer_id: 18,
        shipper_id: 2,
        address_id: 8,
        productFee: 300000,
        shippingFee: 44000,
        status: "processing",
        total: 344000,
        note: "Kiểm tra hàng trước khi thanh toán",
        payment_status: "paid",
        shipping_status: "shipping",
        payment_method: "Credit Card",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 6 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 4,
        customer_id: 19,
        shipper_id: 4,
        address_id: 9,
        productFee: 140000,
        shippingFee: 30000,
        status: "completed",
        total: 170000,
        note: "Shop phục vụ tốt",
        payment_status: "paid",
        shipping_status: "shipped",
        payment_method: "Bank Transfer",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 5 * 60 * 60 * 1000
        ),
        actual_delivery_time: new Date(),
      },
      {
        shop_id: 5,
        customer_id: 20,
        shipper_id: 5,
        address_id: 10,
        productFee: 90000,
        shippingFee: 24000,
        status: "cancelled",
        total: 114000,
        note: "Không liên lạc được",
        payment_status: "pending",
        shipping_status: "not_yet_shipped",
        payment_method: "COD",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 6 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 6,
        customer_id: 2,
        shipper_id: 3,
        address_id: 11,
        productFee: 170000,
        shippingFee: 33000,
        status: "pending",
        total: 203000,
        note: "Giao hàng giờ hành chính",
        payment_status: "pending",
        shipping_status: "not_yet_shipped",
        payment_method: "COD",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 2 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 7,
        customer_id: 5,
        shipper_id: 1,
        address_id: 12,
        productFee: 260000,
        shippingFee: 36000,
        status: "processing",
        total: 296000,
        note: "Gọi điện trước khi giao",
        payment_status: "paid",
        shipping_status: "shipping",
        payment_method: "Credit Card",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 3 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 8,
        customer_id: 1,
        shipper_id: 2,
        address_id: 13,
        productFee: 110000,
        shippingFee: 26000,
        status: "completed",
        total: 136000,
        note: "Giao hàng nhanh giúp mình",
        payment_status: "paid",
        shipping_status: "shipped",
        payment_method: "Bank Transfer",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 2 * 60 * 60 * 1000
        ),
        actual_delivery_time: new Date(),
      },
      {
        shop_id: 9,
        customer_id: 3,
        shipper_id: 4,
        address_id: 14,
        productFee: 60000,
        shippingFee: 16000,
        status: "cancelled",
        total: 76000,
        note: "Khách hàng hủy đơn",
        payment_status: "pending",
        shipping_status: "not_yet_shipped",
        payment_method: "COD",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 3 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 10,
        customer_id: 4,
        shipper_id: 5,
        address_id: 15,
        productFee: 310000,
        shippingFee: 41000,
        status: "pending",
        total: 351000,
        note: "Không giao vào cuối tuần",
        payment_status: "pending",
        shipping_status: "not_yet_shipped",
        payment_method: "Momo",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 4 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 11,
        customer_id: 6,
        shipper_id: 3,
        address_id: 16,
        productFee: 190000,
        shippingFee: 33000,
        status: "processing",
        total: 223000,
        note: "Kiểm tra kỹ hàng trước khi giao",
        payment_status: "paid",
        shipping_status: "shipping",
        payment_method: "Credit Card",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 5 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 12,
        customer_id: 7,
        shipper_id: 1,
        address_id: 17,
        productFee: 130000,
        shippingFee: 29000,
        status: "completed",
        total: 159000,
        note: "Hàng giao nhanh, cảm ơn shop",
        payment_status: "paid",
        shipping_status: "shipped",
        payment_method: "Bank Transfer",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 3 * 60 * 60 * 1000
        ),
        actual_delivery_time: new Date(),
      },
      {
        shop_id: 13,
        customer_id: 8,
        shipper_id: 2,
        address_id: 18,
        productFee: 80000,
        shippingFee: 21000,
        status: "cancelled",
        total: 101000,
        note: "Đổi ý không mua nữa",
        payment_status: "pending",
        shipping_status: "not_yet_shipped",
        payment_method: "COD",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 4 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 14,
        customer_id: 9,
        shipper_id: 4,
        address_id: 1,
        productFee: 230000,
        shippingFee: 39000,
        status: "pending",
        total: 269000,
        note: "Giao hàng vào buổi tối",
        payment_status: "pending",
        shipping_status: "not_yet_shipped",
        payment_method: "Momo",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 5 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 15,
        customer_id: 10,
        shipper_id: 5,
        address_id: 2,
        productFee: 290000,
        shippingFee: 43000,
        status: "processing",
        total: 333000,
        note: "Gói hàng cẩn thận giúp mình",
        payment_status: "paid",
        shipping_status: "shipping",
        payment_method: "Credit Card",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 6 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 1,
        customer_id: 11,
        shipper_id: 3,
        address_id: 11,
        productFee: 170000,
        shippingFee: 32000,
        status: "completed",
        total: 202000,
        note: "Cảm ơn shop, hàng đẹp",
        payment_status: "paid",
        shipping_status: "shipped",
        payment_method: "Bank Transfer",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 5 * 60 * 60 * 1000
        ),
        actual_delivery_time: new Date(),
      },
      {
        shop_id: 2,
        customer_id: 12,
        shipper_id: 1,
        address_id: 3,
        productFee: 70000,
        shippingFee: 19000,
        status: "cancelled",
        total: 89000,
        note: "Thay đổi địa chỉ giao hàng",
        payment_status: "pending",
        shipping_status: "not_yet_shipped",
        payment_method: "COD",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 4 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 3,
        customer_id: 13,
        shipper_id: 2,
        address_id: 2,
        productFee: 240000,
        shippingFee: 40000,
        status: "pending",
        total: 280000,
        note: "Giao hàng nhanh giúp mình",
        payment_status: "pending",
        shipping_status: "not_yet_shipped",
        payment_method: "Momo",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 5 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 4,
        customer_id: 14,
        shipper_id: 4,
        address_id: 4,
        productFee: 300000,
        shippingFee: 44000,
        status: "processing",
        total: 344000,
        note: "Gói hàng cẩn thận",
        payment_status: "paid",
        shipping_status: "shipping",
        payment_method: "Credit Card",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 6 * 60 * 60 * 1000
        ),
        actual_delivery_time: null,
      },
      {
        shop_id: 5,
        customer_id: 15,
        shipper_id: 5,
        address_id: 5,
        productFee: 140000,
        shippingFee: 30000,
        status: "completed",
        total: 170000,
        note: "Hàng tốt, cảm ơn shop",
        payment_status: "paid",
        shipping_status: "shipped",
        payment_method: "Bank Transfer",
        start_time: new Date(),
        estimated_delivery_time: new Date(
          new Date().getTime() + 4 * 60 * 60 * 1000
        ),
        actual_delivery_time: new Date(),
      },
    ];

    await Order.bulkCreate(orders);
    console.log("Đã tạo thành công các đơn hàng.");
  } catch (error) {
    console.error("Lỗi khi tạo dữ liệu:", error);
  }
};

const insertOrderItems = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối với database thành công.");

    const orderItems = [
      { order_id: 1, product_id: 5, price: 150000, quantity: 2, total: 300000 },
      { order_id: 1, product_id: 8, price: 200000, quantity: 1, total: 200000 },
      { order_id: 1, product_id: 12, price: 50000, quantity: 4, total: 200000 },
      { order_id: 1, product_id: 3, price: 75000, quantity: 3, total: 225000 },
      { order_id: 1, product_id: 7, price: 120000, quantity: 2, total: 240000 },
      { order_id: 2, product_id: 8, price: 200000, quantity: 1, total: 200000 },
      { order_id: 2, product_id: 12, price: 50000, quantity: 4, total: 200000 },
      { order_id: 2, product_id: 3, price: 75000, quantity: 3, total: 225000 },
      { order_id: 2, product_id: 7, price: 120000, quantity: 2, total: 240000 },
      { order_id: 2, product_id: 10, price: 90000, quantity: 5, total: 450000 },
      { order_id: 3, product_id: 12, price: 50000, quantity: 4, total: 200000 },
      { order_id: 3, product_id: 3, price: 75000, quantity: 3, total: 225000 },
      { order_id: 3, product_id: 7, price: 120000, quantity: 2, total: 240000 },
      { order_id: 3, product_id: 10, price: 90000, quantity: 5, total: 450000 },
      {
        order_id: 3,
        product_id: 15,
        price: 110000,
        quantity: 2,
        total: 220000,
      },
      { order_id: 4, product_id: 3, price: 75000, quantity: 3, total: 225000 },
      { order_id: 4, product_id: 7, price: 120000, quantity: 2, total: 240000 },
      { order_id: 4, product_id: 10, price: 90000, quantity: 5, total: 450000 },
      {
        order_id: 4,
        product_id: 15,
        price: 110000,
        quantity: 2,
        total: 220000,
      },
      { order_id: 4, product_id: 6, price: 95000, quantity: 3, total: 285000 },
      { order_id: 5, product_id: 7, price: 120000, quantity: 2, total: 240000 },
      { order_id: 5, product_id: 10, price: 90000, quantity: 5, total: 450000 },
      {
        order_id: 5,
        product_id: 15,
        price: 110000,
        quantity: 2,
        total: 220000,
      },
      { order_id: 5, product_id: 6, price: 95000, quantity: 3, total: 285000 },
      { order_id: 5, product_id: 18, price: 65000, quantity: 4, total: 260000 },
      { order_id: 6, product_id: 10, price: 90000, quantity: 5, total: 450000 },
      {
        order_id: 6,
        product_id: 15,
        price: 110000,
        quantity: 2,
        total: 220000,
      },
      { order_id: 6, product_id: 6, price: 95000, quantity: 3, total: 285000 },
      { order_id: 6, product_id: 18, price: 65000, quantity: 4, total: 260000 },
      {
        order_id: 6,
        product_id: 20,
        price: 130000,
        quantity: 1,
        total: 130000,
      },
      {
        order_id: 7,
        product_id: 15,
        price: 110000,
        quantity: 2,
        total: 220000,
      },
      { order_id: 7, product_id: 6, price: 95000, quantity: 3, total: 285000 },
      { order_id: 7, product_id: 18, price: 65000, quantity: 4, total: 260000 },
      {
        order_id: 7,
        product_id: 20,
        price: 130000,
        quantity: 1,
        total: 130000,
      },
      { order_id: 7, product_id: 9, price: 85000, quantity: 2, total: 170000 },
      { order_id: 8, product_id: 6, price: 95000, quantity: 3, total: 285000 },
      { order_id: 8, product_id: 18, price: 65000, quantity: 4, total: 260000 },
      {
        order_id: 8,
        product_id: 20,
        price: 130000,
        quantity: 1,
        total: 130000,
      },
      { order_id: 8, product_id: 9, price: 85000, quantity: 2, total: 170000 },
      {
        order_id: 8,
        product_id: 14,
        price: 200000,
        quantity: 3,
        total: 600000,
      },
      { order_id: 9, product_id: 18, price: 65000, quantity: 4, total: 260000 },
      {
        order_id: 9,
        product_id: 20,
        price: 130000,
        quantity: 1,
        total: 130000,
      },
      { order_id: 9, product_id: 9, price: 85000, quantity: 2, total: 170000 },
      {
        order_id: 9,
        product_id: 14,
        price: 200000,
        quantity: 3,
        total: 600000,
      },
      { order_id: 9, product_id: 2, price: 300000, quantity: 1, total: 300000 },
      {
        order_id: 10,
        product_id: 20,
        price: 130000,
        quantity: 1,
        total: 130000,
      },
      { order_id: 10, product_id: 9, price: 85000, quantity: 2, total: 170000 },
      {
        order_id: 10,
        product_id: 14,
        price: 200000,
        quantity: 3,
        total: 600000,
      },
      {
        order_id: 10,
        product_id: 2,
        price: 300000,
        quantity: 1,
        total: 300000,
      },
      {
        order_id: 10,
        product_id: 4,
        price: 100000,
        quantity: 5,
        total: 500000,
      },
      {
        order_id: 11,
        product_id: 21,
        price: 95000,
        quantity: 3,
        total: 285000,
      },
      {
        order_id: 11,
        product_id: 14,
        price: 200000,
        quantity: 3,
        total: 600000,
      },
      {
        order_id: 11,
        product_id: 2,
        price: 300000,
        quantity: 1,
        total: 300000,
      },
      {
        order_id: 11,
        product_id: 4,
        price: 100000,
        quantity: 5,
        total: 500000,
      },
      {
        order_id: 11,
        product_id: 16,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      {
        order_id: 12,
        product_id: 22,
        price: 95000,
        quantity: 3,
        total: 285000,
      },
      {
        order_id: 12,
        product_id: 14,
        price: 200000,
        quantity: 3,
        total: 600000,
      },
      {
        order_id: 12,
        product_id: 4,
        price: 100000,
        quantity: 5,
        total: 500000,
      },
      {
        order_id: 12,
        product_id: 16,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 12, product_id: 1, price: 70000, quantity: 3, total: 210000 },
      {
        order_id: 13,
        product_id: 13,
        price: 95000,
        quantity: 3,
        total: 285000,
      },
      {
        order_id: 13,
        product_id: 16,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 13, product_id: 1, price: 70000, quantity: 3, total: 210000 },
      { order_id: 13, product_id: 3, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 13,
        product_id: 2,
        price: 310000,
        quantity: 1,
        total: 310000,
      },
      {
        order_id: 14,
        product_id: 14,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 14, product_id: 3, price: 70000, quantity: 3, total: 210000 },
      { order_id: 14, product_id: 6, price: 50000, quantity: 1, total: 50000 },
      { order_id: 14, product_id: 9, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 14,
        product_id: 11,
        price: 310000,
        quantity: 1,
        total: 310000,
      },
      {
        order_id: 15,
        product_id: 15,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 15, product_id: 3, price: 70000, quantity: 3, total: 210000 },
      { order_id: 15, product_id: 6, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 15,
        product_id: 11,
        price: 310000,
        quantity: 1,
        total: 310000,
      },
      { order_id: 15, product_id: 17, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 16,
        product_id: 18,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 16, product_id: 6, price: 70000, quantity: 3, total: 210000 },
      { order_id: 16, product_id: 11, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 16,
        product_id: 17,
        price: 310000,
        quantity: 1,
        total: 310000,
      },
      { order_id: 16, product_id: 20, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 17,
        product_id: 1,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 17, product_id: 6, price: 70000, quantity: 3, total: 210000 },
      {
        order_id: 17,
        product_id: 17,
        price: 310000,
        quantity: 1,
        total: 310000,
      },
      { order_id: 17, product_id: 20, price: 50000, quantity: 1, total: 50000 },
      { order_id: 17, product_id: 22, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 18,
        product_id: 19,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 18, product_id: 6, price: 70000, quantity: 3, total: 210000 },
      { order_id: 18, product_id: 20, price: 50000, quantity: 1, total: 50000 },
      { order_id: 18, product_id: 22, price: 50000, quantity: 1, total: 50000 },
      { order_id: 18, product_id: 3, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 19,
        product_id: 21,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 19, product_id: 6, price: 70000, quantity: 3, total: 210000 },
      { order_id: 19, product_id: 22, price: 50000, quantity: 1, total: 50000 },
      { order_id: 19, product_id: 3, price: 50000, quantity: 1, total: 50000 },
      { order_id: 19, product_id: 4, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 20,
        product_id: 31,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 20, product_id: 6, price: 70000, quantity: 3, total: 210000 },
      { order_id: 20, product_id: 3, price: 50000, quantity: 1, total: 50000 },
      { order_id: 20, product_id: 4, price: 50000, quantity: 1, total: 50000 },
      { order_id: 20, product_id: 5, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 21,
        product_id: 32,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 21, product_id: 6, price: 70000, quantity: 3, total: 210000 },
      { order_id: 21, product_id: 3, price: 50000, quantity: 1, total: 50000 },
      { order_id: 21, product_id: 4, price: 50000, quantity: 1, total: 50000 },
      { order_id: 21, product_id: 5, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 22,
        product_id: 32,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 22, product_id: 6, price: 70000, quantity: 3, total: 210000 },
      { order_id: 22, product_id: 3, price: 50000, quantity: 1, total: 50000 },
      { order_id: 22, product_id: 4, price: 50000, quantity: 1, total: 50000 },
      { order_id: 22, product_id: 5, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 23,
        product_id: 32,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 23, product_id: 6, price: 70000, quantity: 3, total: 210000 },
      { order_id: 23, product_id: 3, price: 50000, quantity: 1, total: 50000 },
      { order_id: 23, product_id: 4, price: 50000, quantity: 1, total: 50000 },
      { order_id: 23, product_id: 5, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 24,
        product_id: 32,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 24, product_id: 6, price: 70000, quantity: 3, total: 210000 },
      { order_id: 24, product_id: 3, price: 50000, quantity: 1, total: 50000 },
      { order_id: 24, product_id: 4, price: 50000, quantity: 1, total: 50000 },
      { order_id: 24, product_id: 5, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 25,
        product_id: 32,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 25, product_id: 6, price: 70000, quantity: 3, total: 210000 },
      { order_id: 25, product_id: 3, price: 50000, quantity: 1, total: 50000 },
      { order_id: 25, product_id: 4, price: 50000, quantity: 1, total: 50000 },
      { order_id: 25, product_id: 5, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 26,
        product_id: 32,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 26, product_id: 6, price: 70000, quantity: 3, total: 210000 },
      { order_id: 26, product_id: 3, price: 50000, quantity: 1, total: 50000 },
      { order_id: 26, product_id: 4, price: 50000, quantity: 1, total: 50000 },
      { order_id: 26, product_id: 5, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 27,
        product_id: 32,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 27, product_id: 6, price: 70000, quantity: 3, total: 210000 },
      { order_id: 27, product_id: 3, price: 50000, quantity: 1, total: 50000 },
      { order_id: 27, product_id: 4, price: 50000, quantity: 1, total: 50000 },
      { order_id: 27, product_id: 5, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 28,
        product_id: 32,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 28, product_id: 6, price: 70000, quantity: 3, total: 210000 },
      { order_id: 28, product_id: 3, price: 50000, quantity: 1, total: 50000 },
      { order_id: 28, product_id: 4, price: 50000, quantity: 1, total: 50000 },
      { order_id: 28, product_id: 5, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 29,
        product_id: 32,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 29, product_id: 6, price: 70000, quantity: 3, total: 210000 },
      { order_id: 29, product_id: 3, price: 50000, quantity: 1, total: 50000 },
      { order_id: 29, product_id: 4, price: 50000, quantity: 1, total: 50000 },
      { order_id: 29, product_id: 5, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 30,
        product_id: 32,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      { order_id: 30, product_id: 6, price: 70000, quantity: 3, total: 210000 },
      { order_id: 30, product_id: 3, price: 50000, quantity: 1, total: 50000 },
      { order_id: 30, product_id: 4, price: 50000, quantity: 1, total: 50000 },
      { order_id: 30, product_id: 5, price: 50000, quantity: 1, total: 50000 },
      {
        order_id: 31,
        product_id: 16,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      {
        order_id: 31,
        product_id: 44,
        price: 70000,
        quantity: 3,
        total: 210000,
      },
      { order_id: 31, product_id: 59, price: 50000, quantity: 1, total: 50000 },
      { order_id: 31, product_id: 4, price: 50000, quantity: 1, total: 50000 },
      { order_id: 31, product_id: 27, price: 50000, quantity: 1, total: 50000 },

      {
        order_id: 32,
        product_id: 55,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      {
        order_id: 32,
        product_id: 31,
        price: 70000,
        quantity: 3,
        total: 210000,
      },
      { order_id: 32, product_id: 17, price: 50000, quantity: 1, total: 50000 },
      { order_id: 32, product_id: 49, price: 50000, quantity: 1, total: 50000 },
      { order_id: 32, product_id: 54, price: 50000, quantity: 1, total: 50000 },

      {
        order_id: 33,
        product_id: 42,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      {
        order_id: 33,
        product_id: 26,
        price: 70000,
        quantity: 3,
        total: 210000,
      },
      { order_id: 33, product_id: 29, price: 50000, quantity: 1, total: 50000 },
      { order_id: 33, product_id: 57, price: 50000, quantity: 1, total: 50000 },
      { order_id: 33, product_id: 38, price: 50000, quantity: 1, total: 50000 },

      {
        order_id: 34,
        product_id: 12,
        price: 125000,
        quantity: 2,
        total: 250000,
      },
      {
        order_id: 34,
        product_id: 43,
        price: 70000,
        quantity: 3,
        total: 210000,
      },
      { order_id: 34, product_id: 50, price: 50000, quantity: 1, total: 50000 },
      { order_id: 34, product_id: 41, price: 50000, quantity: 1, total: 50000 },
      { order_id: 34, product_id: 58, price: 50000, quantity: 1, total: 50000 },

            {
                order_id: 35,
                product_id: 15,
                price: 125000,
                quantity: 2,
                total: 250000,
            },
            {
                order_id: 35,
                product_id: 20,
                price: 70000,
                quantity: 3,
                total: 210000,
            },
            { order_id: 35, product_id: 33, price: 50000, quantity: 1, total: 50000 },
            { order_id: 35, product_id: 45, price: 50000, quantity: 1, total: 50000 },
            { order_id: 35, product_id: 52, price: 50000, quantity: 1, total: 50000 },
        ];
        await OrderItem.bulkCreate(orderItems);
        console.log("Đã chèn OrderItems vào cơ sở dữ liệu!");
    } catch (error) {
        console.error("Lỗi khi chèn dữ liệu:", error);
    }
};

// 20 emergencyContacts
const insertEmergencyContacts = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối với database thành công.");

    const emergencyContacts = [
      {
        shipperId: 1,
        name: "Nguyễn Văn A",
        relation: "Cha",
        phone: "0912345678",
      },
      { shipperId: 2, name: "Trần Thị B", relation: "Mẹ", phone: "0987654321" },
      {
        shipperId: 3,
        name: "Lê Văn C",
        relation: "Anh trai",
        phone: "0909123456",
      },
      {
        shipperId: 4,
        name: "Phạm Thị D",
        relation: "Chị gái",
        phone: "0976543210",
      },
      {
        shipperId: 5,
        name: "Hoàng Minh E",
        relation: "Vợ",
        phone: "0965432109",
      },
      {
        shipperId: 6,
        name: "Vũ Thị F",
        relation: "Chồng",
        phone: "0954321098",
      },
      {
        shipperId: 7,
        name: "Đỗ Xuân G",
        relation: "Bạn thân",
        phone: "0943210987",
      },
      {
        shipperId: 8,
        name: "Lý Thanh H",
        relation: "Đồng nghiệp",
        phone: "0932109876",
      },
      {
        shipperId: 9,
        name: "Cao Hoàng I",
        relation: "Chú",
        phone: "0921098765",
      },
      {
        shipperId: 10,
        name: "Phan Thu J",
        relation: "Cô",
        phone: "0910987654",
      },
      {
        shipperId: 11,
        name: "Trần Đình K",
        relation: "Mẹ",
        phone: "0978901234",
      },
      { shipperId: 12, name: "Lê Thị L", relation: "Cha", phone: "0967890123" },
      {
        shipperId: 13,
        name: "Hoàng Văn M",
        relation: "Anh trai",
        phone: "0956789012",
      },
      {
        shipperId: 14,
        name: "Phạm Thị N",
        relation: "Chị gái",
        phone: "0945678901",
      },
      {
        shipperId: 15,
        name: "Đặng Tiến O",
        relation: "Vợ",
        phone: "0934567890",
      },
      {
        shipperId: 16,
        name: "Vũ Ngọc P",
        relation: "Chồng",
        phone: "0923456789",
      },
      {
        shipperId: 17,
        name: "Bùi Thế Q",
        relation: "Bạn thân",
        phone: "0913456789",
      },
      {
        shipperId: 18,
        name: "Ngô Thùy R",
        relation: "Đồng nghiệp",
        phone: "0902345678",
      },
      { shipperId: 19, name: "Lê Cao S", relation: "Chú", phone: "0971234567" },
      {
        shipperId: 20,
        name: "Phạm Thị T",
        relation: "Cô",
        phone: "0960123456",
      },
    ];

    await EmergencyContact.bulkCreate(emergencyContacts);
    console.log("Đã tạo thành công 20 emergency contacts.");
  } catch (error) {
    console.error("Lỗi khi tạo dữ liệu:", error);
  }
};

const insertMedia = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối với database thành công.");

    const media = [
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
      { created_at: new Date(), updated_at: new Date() },
    ];

    await Media.bulkCreate(media);
    console.log("Dữ liệu đã được chèn thành công vào bảng Media.");
  } catch (error) {
    console.error(
      "Không thể kết nối với database hoặc xảy ra lỗi khi chèn dữ liệu:",
      error
    );
  }
};

const insertMediaItems = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối với database thành công.");

    const mediaItems = [
      // Order ID = 2
      {
        mediaItemURL: "https://example.com/media1.jpg",
        type: "image",
        orderItemID: 6,
      },
      {
        mediaItemURL: "https://example.com/media2.jpg",
        type: "video",
        orderItemID: 7,
      },
      {
        mediaItemURL: "https://example.com/media3.jpg",
        type: "image",
        orderItemID: 8,
      },
      {
        mediaItemURL: "https://example.com/media4.jpg",
        type: "video",
        orderItemID: 9,
      },
      {
        mediaItemURL: "https://example.com/media5.jpg",
        type: "image",
        orderItemID: 10,
      },
      // Order ID = 3
      {
        mediaItemURL: "https://example.com/media6.jpg",
        type: "image",
        orderItemID: 11,
      },
      {
        mediaItemURL: "https://example.com/media7.jpg",
        type: "video",
        orderItemID: 12,
      },
      {
        mediaItemURL: "https://example.com/media8.jpg",
        type: "image",
        orderItemID: 13,
      },
      {
        mediaItemURL: "https://example.com/media9.jpg",
        type: "video",
        orderItemID: 14,
      },
      {
        mediaItemURL: "https://example.com/media10.jpg",
        type: "image",
        orderItemID: 15,
      },
      // Order ID = 1
      {
        mediaItemURL: "https://example.com/media1.jpg",
        type: "image",
        orderItemID: 1,
      },
      {
        mediaItemURL: "https://example.com/media2.jpg",
        type: "video",
        orderItemID: 2,
      },
      {
        mediaItemURL: "https://example.com/media3.jpg",
        type: "image",
        orderItemID: 3,
      },
      {
        mediaItemURL: "https://example.com/media4.jpg",
        type: "video",
        orderItemID: 4,
      },
      {
        mediaItemURL: "https://example.com/media5.jpg",
        type: "image",
        orderItemID: 5,
      },
      // Order ID = 6
      {
        mediaItemURL: "https://example.com/media1.jpg",
        type: "image",
        orderItemID: 31,
      },
      {
        mediaItemURL: "https://example.com/media2.jpg",
        type: "video",
        orderItemID: 32,
      },
      {
        mediaItemURL: "https://example.com/media3.jpg",
        type: "image",
        orderItemID: 33,
      },
      {
        mediaItemURL: "https://example.com/media4.jpg",
        type: "video",
        orderItemID: 34,
      },
      {
        mediaItemURL: "https://example.com/media5.jpg",
        type: "image",
        orderItemID: 35,
      },
    ];

    await MediaItem.bulkCreate(mediaItems);
    console.log("Đã tạo thành công 15 MediaItems.");
  } catch (error) {
    console.error("Lỗi khi tạo dữ liệu:", error);
  }
};

const insertReplyFeedbacks = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối với database thành công.");

    const replyFeedbacks = [
      // Order ID = 2
      { content: "Cảm ơn bạn", replyUserID: 2 },
      { content: "Cảm ơn bạn", replyUserID: 2 },
      { content: "Cảm ơn bạn", replyUserID: 2 },
      { content: "Cảm ơn bạn", replyUserID: 2 },
      { content: "Cảm ơn bạn", replyUserID: 2 },
      // Order ID = 3
      { content: "Cảm ơn bạn", replyUserID: 3 },
      { content: "Cảm ơn bạn", replyUserID: 3 },
      { content: "Cảm ơn bạn", replyUserID: 3 },
      { content: "Cảm ơn bạn", replyUserID: 3 },
      { content: "Cảm ơn bạn", replyUserID: 3 },
      // Order ID = 1
      { content: "Cảm ơn bạn", replyUserID: 1 },
      { content: "Cảm ơn bạn", replyUserID: 1 },
      { content: "Cảm ơn bạn", replyUserID: 1 },
      { content: "Cảm ơn bạn", replyUserID: 1 },
      { content: "Cảm ơn bạn", replyUserID: 1 },
      // Order ID = 6
      { content: "Cảm ơn bạn", replyUserID: 1 },
      { content: "Cảm ơn bạn", replyUserID: 1 },
      { content: "Cảm ơn bạn", replyUserID: 1 },
      { content: "Cảm ơn bạn", replyUserID: 1 },
      { content: "Cảm ơn bạn", replyUserID: 1 },
    ];

    await ReplyFeedback.bulkCreate(replyFeedbacks);
    console.log("Đã tạo thành công 15 ReplyFeedbacks.");
  } catch (error) {
    console.error("Lỗi khi tạo dữ liệu:", error);
  }
};
const insertFeedbacks = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối với database thành công.");

    const feedbacks = [
      // Order ID = 2
      {
        content: "Sản phẩm rất tốt",
        star: 5,
        orderItemID: 6,
        customerID: 5,
        replyID: 1,
        mediaID: 1,
      },
      {
        content: "Chất lượng ổn định",
        star: 4,
        orderItemID: 7,
        customerID: 5,
        replyID: 2,
        mediaID: 2,
      },
      {
        content: "Giá cả hợp lý",
        star: 4,
        orderItemID: 8,
        customerID: 5,
        replyID: 3,
        mediaID: 3,
      },
      {
        content: "Đóng gói cẩn thận",
        star: 5,
        orderItemID: 9,
        customerID: 5,
        replyID: 4,
        mediaID: 4,
      },
      {
        content: "Giao hàng nhanh",
        star: 5,
        orderItemID: 10,
        customerID: 5,
        replyID: 5,
        mediaID: 5,
      },
      // Order ID = 3
      {
        content: "Chất lượng sản phẩm tốt",
        star: 5,
        orderItemID: 11,
        customerID: 1,
        replyID: 6,
        mediaID: 6,
      },
      {
        content: "Phù hợp với giá tiền",
        star: 4,
        orderItemID: 12,
        customerID: 1,
        replyID: 7,
        mediaID: 7,
      },
      {
        content: "Đóng gói đẹp",
        star: 5,
        orderItemID: 13,
        customerID: 1,
        replyID: 8,
        mediaID: 8,
      },
      {
        content: "Giao hàng đúng hẹn",
        star: 5,
        orderItemID: 14,
        customerID: 1,
        replyID: 9,
        mediaID: 9,
      },
      {
        content: "Mua lần thứ 2 rất hài lòng",
        star: 5,
        orderItemID: 15,
        customerID: 1,
        replyID: 10,
        mediaID: 10,
      },
      // Order ID = 1
      {
        content: "Sản phẩm đúng mô tả, rất hài lòng",
        star: 5,
        orderItemID: 1,
        customerID: 2,
        replyID: 11,
        mediaID: 11,
      },
      {
        content: "Chất lượng sản phẩm tuyệt vời",
        star: 5,
        orderItemID: 2,
        customerID: 2,
        replyID: 12,
        mediaID: 12,
      },
      {
        content: "Giá cả hợp lý, giao hàng nhanh",
        star: 4,
        orderItemID: 3,
        customerID: 2,
        replyID: 13,
        mediaID: 13,
      },
      {
        content: "Đóng gói cẩn thận, chất lượng tốt",
        star: 5,
        orderItemID: 4,
        customerID: 2,
        replyID: 14,
        mediaID: 14,
      },
      {
        content: "Giao hàng nhanh, phục vụ tốt",
        star: 5,
        orderItemID: 5,
        customerID: 2,
        replyID: 15,
        mediaID: 15,
      },
      // Order ID = 1
      {
        content: "Sản phẩm đúng mô tả, rất hài lòng",
        star: 5,
        orderItemID: 31,
        customerID: 6,
        replyID: 16,
        mediaID: 16,
      },
      {
        content: "Chất lượng sản phẩm tuyệt vời",
        star: 5,
        orderItemID: 32,
        customerID: 6,
        replyID: 17,
        mediaID: 17,
      },
      {
        content: "Giá cả hợp lý, giao hàng nhanh",
        star: 4,
        orderItemID: 33,
        customerID: 6,
        replyID: 18,
        mediaID: 18,
      },
      {
        content: "Đóng gói cẩn thận, chất lượng tốt",
        star: 5,
        orderItemID: 34,
        customerID: 6,
        replyID: 19,
        mediaID: 19,
      },
      {
        content: "Giao hàng nhanh, phục vụ tốt",
        star: 5,
        orderItemID: 35,
        customerID: 6,
        replyID: 20,
        mediaID: 20,
      },
    ];

    await Feedback.bulkCreate(feedbacks);
    console.log("Đã tạo thành công 15 Feedbacks.");
  } catch (error) {
    console.error("Lỗi khi tạo dữ liệu:", error);
  }
};

// 3 banners
const insertBanner = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối với database thành công.");

    const banner = [
      {
        title: "Chăm sóc da liễu",
        image:
          "https://i.pinimg.com/originals/5e/5b/b3/5e5bb386badcb19db0953e2a4edd002d.jpg",
        link: "https://example.com/tet-sale",
        status: "hidden", 
        approvalStatus: "pending",
        shopID: 1, 
        startDate: new Date(), 
        endDate: new Date("2023-12-31"), 
      },
      {
        title: "Ưu đãi 8/3",
        image:
          "https://mir-s3-cdn-cf.behance.net/project_modules/fs/74040b165201509.6403565e0b5a8.png",
        link: "https://example.com/8-march-sale",
        status: "visible", 
        approvalStatus: "approved",
        shopID: 2, 
        startDate: new Date("2023-03-01"), 
        endDate: new Date("2023-03-10"), 
      },
      {
        title: "Giảm giá sập sàn",
        image:
          "https://img.pikbest.com/origin/10/01/53/35bpIkbEsTBzN.png!bw700",
        link: "https://example.com/discount-sale",
        status: "visible", 
        approvalStatus: "approved",
        shopID: 3, 
        startDate: new Date("2023-05-01"), 
        endDate: new Date("2023-05-15"), 
      },
    ];

    await Banner.bulkCreate(banner);
    console.log("Đã tạo thành công 1 Banner.");
  } catch (error) {
    console.error("Lỗi khi tạo dữ liệu:", error);
  }
};

async function insertData() {
  try {
    await sequelize.authenticate(); // Kết nối chỉ 1 lần
    console.log("Kết nối với database thành công.");

    await insertOperators();
    await insertUsers();
    await insertShippers();
    await insertAddresses();
    await insertShops();
    await insertProducts();
    await insertOrders();
    await insertOrderItems();
    await insertMedia();
    await insertMediaItems();
    await insertReplyFeedbacks();
    await insertFeedbacks();
    await insertEmergencyContacts();
    await insertBanner();

    console.log("Tất cả dữ liệu đã được chèn thành công!");
  } catch (error) {
    console.error("Lỗi khi chèn dữ liệu:", error);
  } finally {
    await sequelize.close(); // Chỉ đóng kết nối sau khi tất cả các thao tác đã hoàn thành
    console.log("Đã đóng kết nối database.");
  }
}

insertData();
