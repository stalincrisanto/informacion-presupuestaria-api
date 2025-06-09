import { readFile, utils } from "xlsx";
import { formatKey, parseValue } from "../utils/cleanData";


export const readExcelService = (excelFile: Express.Multer.File) => {
  const workbook = readFile(excelFile.path);
  const hoja = workbook.Sheets[workbook.SheetNames[0]!];
  const rawData = utils.sheet_to_json<Record<string, any>>(hoja!, {
    defval: "",
    raw: false,
    header: 1,
    blankrows: false,
    skipHidden: true
  });

  // Obtener los encabezados de la primera fila
  const headers = rawData[0] as string[];
  
  // Procesar el resto de las filas
  const processedData = rawData.slice(1).map((row: Record<string, any>) => {
    const newRow: Record<string, any> = {};
    
    headers.forEach((header, index) => {
      if (header) { // Solo procesar columnas con encabezado
        const formattedKey = formatKey(header);
        newRow[formattedKey] = parseValue(row[index], formattedKey);
      }
    });

    return newRow;
  });

  return processedData;
};

