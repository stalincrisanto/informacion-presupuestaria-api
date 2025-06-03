/**
 * @swagger
 * tags:
 *   name: Files
 *   description: Subir archivo excel para leer información y procesar a la base de datos
 */
import { Router } from "express";
import { readExcelController } from "../../controllers";
import multer from "multer";
import { authenticateJWT } from "../../middleware/auth.middleware";

const upload = multer({ dest: "uploads/" });
const routerFiles = Router();

/**
 * @swagger
 * /files/read:
 *   post:
 *     summary:
 *     tags: [Files]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: informacion-presupuestaria
 *         type: file
 *         required: true
 *         description: Archivo Excel con datos presupuestarios
 *     responses:
 *       200:
 *         description: Archivo cargado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object

 *       401:
 *         description: No se proporcionó token de autenticación
 *       403:
 *         description: Token inválido o expirado
 *       500:
 *         description: Error al procesar el archivo
 */
routerFiles.use(authenticateJWT);
routerFiles.post(
  "/read",
  upload.single("informacion-presupuestaria"),
  readExcelController
);

export default routerFiles;
