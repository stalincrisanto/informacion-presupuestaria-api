import type { Request, Response } from "express";
import {
  readExcelService,
} from "../../services/files.service";
import fs from "fs";
import { RegistroPresupuestario } from "../../utils/types";
import { saveExcelDataToDb } from "../../services/database.service";

export const readExcelController = async (req: Request, res: Response) => {
  try {
    const excelFile = req.file;
    if (!excelFile) {
      res.status(400).json({ error: "No se ha enviado ningún archivo" });
    }
    const dataToDb = await readExcelService(excelFile!);
    await saveExcelDataToDb(dataToDb as RegistroPresupuestario[]);
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    res.status(200).json({
      success: true,
      message: "Archivo cargado correctamente",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error del servidor",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
