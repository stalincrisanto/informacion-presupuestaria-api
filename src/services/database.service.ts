import { PrismaClient } from "@prisma/client";
import { RegistroPresupuestario } from "../utils/types";

const prisma = new PrismaClient();

export const saveExcelDataToDb = async (data: RegistroPresupuestario[]) => {
  try {
    const cleanData = data.map((item) => ({
      ...item,
      ASIGNACION: Number(item.ASIGNACION) || 0.0,
      REFORMAS: Number(item.REFORMAS) || 0.0,
      CODIFICADO: Number(item.CODIFICADO) || 0.0,
      CERTIFICACION: Number(item.CERTIFICACION) || 0.0,
      COMPROMISOS: Number(item.COMPROMISOS) || 0.0,
      DEVENGADO: Number(item.DEVENGADO) || 0.0,
      PAGADO: Number(item.PAGADO) || 0.0,
    }));

    const response = await prisma.registroPresupuestario.createMany({
      data: cleanData,
    });

    console.log("Registros insertados:", response.count);

    return { success: true, message: "Datos guardados correctamente." };
  } catch (error) {
    console.error("❌ Error en createMany:", error);
    return { success: false, message: "Error al guardar los datos.", error };
  }
};

export const getAllRecords = async () => {
  try {
    const records = await prisma.registroPresupuestario.findMany();
    const data = records.map(({ id, createdAt, updatedAt, ...record }) => ({
      ...record,
    }));
    return data;
  } catch (error) {
    console.error("❌ Error al obtener los registros:", error);
    return {
      success: false,
      message: "Error al obtener los registros.",
      error,
    };
  }
};
