import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
    cloud_name: "dafn4ktx0",
    api_key: "672787978155335",
    api_secret: "NIIA2y4a3bnC3fhKVfu7qxd9b8s",
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "png"],
    params: {
        folder: "swp_storage_image",
    },
});

const uploadCloud = multer({ storage });
export default uploadCloud;
