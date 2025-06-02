import { Router } from "express";
import { getAllRecordsController } from "../../controllers";

const routerRecords = Router();

routerRecords.get("/getAll", getAllRecordsController);

export default routerRecords;
