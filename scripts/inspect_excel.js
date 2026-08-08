const xlsx = require('xlsx');

console.log('=== INDIA JAPAN.xlsx ===');
try {
  const wb = xlsx.readFile('INDIA JAPAN.xlsx');
  console.log('Sheets:', wb.SheetNames);
  wb.SheetNames.forEach(name => {
    const data = xlsx.utils.sheet_to_json(wb.Sheets[name]);
    console.log('Sheet:', name, 'Total Rows:', data.length);
    console.log('Keys:', data[0] ? Object.keys(data[0]) : []);
    console.log('Sample rows:', JSON.stringify(data.slice(0, 3), null, 2));
  });
} catch (e) {
  console.error('Error reading INDIA JAPAN.xlsx:', e.message);
}

console.log('\n=== Japan Project.xlsx ===');
try {
  const wb2 = xlsx.readFile('Japan Project.xlsx');
  console.log('Sheets:', wb2.SheetNames);
  wb2.SheetNames.forEach(name => {
    const data = xlsx.utils.sheet_to_json(wb2.Sheets[name]);
    console.log('Sheet:', name, 'Total Rows:', data.length);
    console.log('Keys:', data[0] ? Object.keys(data[0]) : []);
    console.log('Sample rows:', JSON.stringify(data.slice(0, 3), null, 2));
  });
} catch (e) {
  console.error('Error reading Japan Project.xlsx:', e.message);
}
