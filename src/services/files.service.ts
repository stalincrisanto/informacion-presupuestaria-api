import { readFile, utils } from "xlsx";
import { formatKey, parseValue } from "../utils/cleanData";


export const readExcelService = (excelFile: Express.Multer.File) => {
  const workbook = readFile(excelFile.path);
  const hoja = workbook.Sheets[workbook.SheetNames[0]!];
  const rawData = utils.sheet_to_json<Record<string, any>>(hoja!, {
    defval: "",
    raw: false,
  });

  const processedData = rawData.map((row) => {
    const newRow: Record<string, any> = {};

    for (const [key, value] of Object.entries(row)) {
      const formattedKey = formatKey(key);
      newRow[formattedKey] = parseValue(value, formattedKey);
    }

    return newRow;
  });

  return processedData;
};

