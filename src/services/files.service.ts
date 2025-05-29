import { readFile, utils } from 'xlsx';

export const readExcelService = (excelFile: Express.Multer.File) => {
    // Leer archivo Excel
    const workbook = readFile(excelFile.path);
    const hoja = workbook.Sheets[workbook.SheetNames[0]];
    const datos = utils.sheet_to_json<Record<string, any>>(hoja);
    
    console.log("datos", datos);
}