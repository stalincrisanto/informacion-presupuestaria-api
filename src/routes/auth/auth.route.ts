/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación de api
 */
import { Router } from "express";
import { loginController } from "../../controllers/auth/auth.controller";

const routerLogin = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Credenciales válidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     username:
 *                       type: string
 *       400:
 *         description: Usuario y contraseña son requeridos
 *
 *       401:
 *         description: Credenciales inválidas
 */
routerLogin.post("/login", loginController);

export default routerLogin;
