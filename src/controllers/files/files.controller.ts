import type { Request, Response } from "express";
import { readExcelService } from "../../services/files.service";

export const readExcelController = async (req: Request, res: Response) => {
  console.log("--------------->", req);
  try {
    const excelFile = req.file;
    if (!excelFile) {
      res.status(400).json({ error: "No se ha enviado ningún archivo" });
    }
    await readExcelService(excelFile!);
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
