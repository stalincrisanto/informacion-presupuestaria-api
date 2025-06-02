import { Router } from "express";
import { readExcelController } from "../../controllers";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const routerFiles = Router();

routerFiles.post("/read", upload.single("informacion-presupuestaria"), readExcelController);

export default routerFiles;
