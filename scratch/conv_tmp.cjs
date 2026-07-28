const fs = require('fs');
const { execSync } = require('child_process');

const psContent = `
Add-Type -AssemblyName System.Drawing
$src = "d:\\Obayashi-main\\public\\images\\15. Purulia Pumped Storage Project — Purulia, West Bengal (Energy).png"
$dst = "d:\\Obayashi-main\\public\\images\\work_india_015.jpg"
$img = [System.Drawing.Image]::FromFile($src)
$img.Save($dst, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$img.Dispose()
Write-Host "Done: work_india_015.jpg"
`;

fs.writeFileSync('./conv_tmp.ps1', psContent);
try { console.log(execSync('powershell -ExecutionPolicy Bypass -File ./conv_tmp.ps1').toString()); }
finally { if (fs.existsSync('./conv_tmp.ps1')) fs.unlinkSync('./conv_tmp.ps1'); }
