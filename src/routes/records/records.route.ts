import { Router } from "express";
import { getAllRecordsController } from "../../controllers";
import { authenticateJWT } from "../../middleware/auth.middleware";

const routerRecords = Router();

routerRecords.use(authenticateJWT);
routerRecords.get("/getAll", getAllRecordsController);

export default routerRecords;
