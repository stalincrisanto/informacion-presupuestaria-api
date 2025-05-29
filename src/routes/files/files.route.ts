import { Router } from "express";
import { readExcelController } from "../../controllers";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const routerFiles = Router();

routerFiles.post("/read", upload.single("archivo"), readExcelController);

export default routerFiles;
