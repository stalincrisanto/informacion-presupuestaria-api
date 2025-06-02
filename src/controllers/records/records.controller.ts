import type { Request, Response } from "express";
import { getAllRecords } from "../../services/database.service";

export const getAllRecordsController = async (req: Request, res: Response) => {
  try {
    const data = await getAllRecords();
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
