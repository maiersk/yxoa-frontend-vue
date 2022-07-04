import XLSX from 'xlsx';

function readFileCustom(file: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      resolve(workbook);
    }
    reader.readAsBinaryString(file);
  })
}
export async function readXlsxFile(file: any) {
  const workbook = await readFileCustom(file);
  return workbook;
}
export async function SelectSheet({ Sheets, SheetNames }: any, sheetIndex: number = 0) {
  const worksheet = Sheets[SheetNames[sheetIndex]];
  const data = await XLSX.utils.sheet_to_json(worksheet);
  return data;
}