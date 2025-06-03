/**
 * @swagger
 * tags:
 *   name: Records
 *   description: Leer información de la base de datos
 */
import { Router } from "express";
import { getAllRecordsController } from "../../controllers";
import { authenticateJWT } from "../../middleware/auth.middleware";

const routerRecords = Router();

routerRecords.use(authenticateJWT);

/**
 * @swagger
 * /records/getAll:
 *   get:
 *     summary: Obtener todos los registros presupuestarios
 *     tags: [Records]
 *     parameters:
 *       - in: query
 *         name: periodo
 *         required: true
 *         schema:
 *           type: integer
 *         example: 520
 *       - in: query
 *         name: anio
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2025
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de registros presupuestarios
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
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/RegistroPresupuestario'
 *       400:
 *         description: Parámetros de consulta requeridos periodo, anio
 *       401:
 *         description: No se proporcionó token de autenticación
 *       403:
 *         description: Token inválido o expirado
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     RegistroPresupuestario:
 *       type: object
 *       properties:
 *         TIPO_CEDULA:
 *           type: integer
 *           example: 1
 *         PERIODO:
 *           type: integer
 *           example: 520
 *         ANIO:
 *           type: integer
 *           example: 2025
 *         COD_PROG:
 *           type: string
 *           example: "A901"
 *         PROGRAMA:
 *           type: string
 *           example: "Fortalecimiento Institucional"
 *         COD_PROY:
 *           type: string
 *           example: "GI25A90100058DK030"
 *         PROYECTO:
 *           type: string
 *           example: "GESTION DE TALENTO HUMANO"
 *         COD_ACTIVIDAD:
 *           type: string
 *           example: "GI25A90100058DK03001P"
 *         ACTIVIDAD:
 *           type: string
 *           example: "Remuneración de personal"
 *         COD_OBRA:
 *           type: string
 *           example: "N/A"
 *         OBRA:
 *           type: string
 *           example: "N/A"
 *         COD_TAREA:
 *           type: string
 *           example: "GI25A90100058DK03001P0001"
 *         TAREA:
 *           type: string
 *           example: "PAGO DE NÓMINA Y REMUNERACIONES INSTITUCIONAL"
 *         COD_FUENTE:
 *           type: integer
 *           example: 566
 *         PARTIDA:
 *           type: integer
 *           example: 510602
 *         ASIGNACION:
 *           type: number
 *           format: float
 *           example: 270693.03
 *         REFORMAS:
 *           type: number
 *           format: float
 *           example: 29352.9
 *         CODIFICADO:
 *           type: number
 *           format: float
 *           example: 300045.93
 *         CERTIFICACION:
 *           type: number
 *           format: float
 *           example: 232071
 *         COMPROMISOS:
 *           type: number
 *           format: float
 *           example: 67974.93
 *         DEVENGADO:
 *           type: number
 *           format: float
 *           example: 67916.61
 *         PAGADO:
 *           type: number
 *           format: float
 *           example: 67916.61
 */

routerRecords.get("/getAll", getAllRecordsController);

export default routerRecords;

// Para número de página y límite
// parameters:
//  *       - in: query
//  *         name: page
//  *         schema:
//  *           type: integer
//  *           minimum: 1
//  *           default: 1
//  *         description: Número de página
//  *       - in: query
//  *         name: limit
//  *         schema:
//  *           type: integer
//  *           minimum: 1
//  *           maximum: 100
//  *           default: 10
//  *         description: Cantidad de registros por página