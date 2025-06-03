import type { Request, Response } from "express";
import { getAllRecords } from "../../services/database.service";

export const getAllRecordsController = async (req: Request, res: Response) => {
  try {
    if (!req.query || Object.keys(req.query).length === 0) {
      res.status(400).json({
        success: false,
        message: "Parámetros de consulta requeridos: periodo, anio",
      });
    }
    const { periodo, anio } = req.query;
    const data = await getAllRecords(Number(periodo), Number(anio));
    res.status(200).json({
      success: true,
      message: "Datos obtenidos correctamente",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error del servidor",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
