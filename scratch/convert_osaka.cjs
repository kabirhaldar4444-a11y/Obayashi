const fs = require('fs');
const { execSync } = require('child_process');

const psContent = `
Add-Type -AssemblyName System.Drawing
$src = "d:\\Obayashi-main\\public\\ChatGPT Image Jul 25, 2026, 04_02_36 PM.png"
$dst = "d:\\Obayashi-main\\public\\images\\work_osaka_smart_met_123.jpg"
$img = [System.Drawing.Image]::FromFile($src)
$img.Save($dst, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$img.Dispose()
Write-Host "Osaka Metro image conversion completed!"
`;

fs.writeFileSync('./convert_osaka_temp.ps1', psContent);
try {
  const result = execSync('powershell -ExecutionPolicy Bypass -File ./convert_osaka_temp.ps1');
  console.log(result.toString());
} finally {
  if (fs.existsSync('./convert_osaka_temp.ps1')) {
    fs.unlinkSync('./convert_osaka_temp.ps1');
  }
}
