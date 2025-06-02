import { Router } from "express";
import { readExcelController } from "../../controllers";
import multer from "multer";
import { authenticateJWT } from "../../middleware/auth.middleware";

const upload = multer({ dest: "uploads/" });
const routerFiles = Router();

routerFiles.use(authenticateJWT);
routerFiles.post("/read", upload.single("informacion-presupuestaria"), readExcelController);

export default routerFiles;
