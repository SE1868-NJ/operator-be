
import {
    getAllShippers,
    getShipperById,
    updateShipperStatus,
  updateShipperPending
} from "../controllers/shipper.controller.js";

const shipperRouter = express.Router();

shipperRouter.patch("/:id", updateShipperStatus);
shipperRouter.get("/:id", getShipperById);
shipperRouter.get("/", getAllShippers);
shipperRouter.patch("/:id", updateShipperPending);

export default shipperRouter;
