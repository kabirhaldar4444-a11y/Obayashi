import XLSX from 'xlsx';

const workbook = XLSX.readFile('Japan Project.xlsx');
const worksheet = workbook.Sheets['Sheet2'];
const data = XLSX.utils.sheet_to_json(worksheet);

console.log(JSON.stringify(data.slice(0, 10), null, 2));
