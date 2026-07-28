const fs = require('fs');
const { execSync } = require('child_process');

const psContent = `
Add-Type -AssemblyName System.Drawing
$src = "C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\52fa554c-f0da-475f-892c-867a0f3dfcb6\\media__1784985374621.jpg"
$dst = "d:\\Obayashi-main\\public\\images\\work_india_002.jpg"
$img = [System.Drawing.Image]::FromFile($src)
$img.Save($dst, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$img.Dispose()
Write-Host "Western Dedicated Freight Corridor image conversion completed!"
`;

fs.writeFileSync('./convert_wdfc_temp.ps1', psContent);
try {
  const result = execSync('powershell -ExecutionPolicy Bypass -File ./convert_wdfc_temp.ps1');
  console.log(result.toString());
} finally {
  if (fs.existsSync('./convert_wdfc_temp.ps1')) {
    fs.unlinkSync('./convert_wdfc_temp.ps1');
  }
}
