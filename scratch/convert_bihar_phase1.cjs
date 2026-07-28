const fs = require('fs');
const { execSync } = require('child_process');

const psContent = `
Add-Type -AssemblyName System.Drawing
$src = "d:\\Obayashi-main\\public\\images\\ChatGPT Image Jul 25, 2026, 07_30_08 PM.png"
$dst = "d:\\Obayashi-main\\public\\images\\work_india_009.jpg"
$img = [System.Drawing.Image]::FromFile($src)
$img.Save($dst, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$img.Dispose()
Write-Host "Bihar Phase I image conversion completed!"
`;

fs.writeFileSync('./convert_bihar_temp.ps1', psContent);
try {
  const result = execSync('powershell -ExecutionPolicy Bypass -File ./convert_bihar_temp.ps1');
  console.log(result.toString());
} finally {
  if (fs.existsSync('./convert_bihar_temp.ps1')) {
    fs.unlinkSync('./convert_bihar_temp.ps1');
  }
}
