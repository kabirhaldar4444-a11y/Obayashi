const fs = require('fs');
const { execSync } = require('child_process');

const psContent = `
Add-Type -AssemblyName System.Drawing
$src = "C:\\Users\\Dell\\.gemini\\antigravity-ide\\brain\\52fa554c-f0da-475f-892c-867a0f3dfcb6\\mumbai_ahmedabad_high_speed_rail_1784984868445.png"
$dst = "d:\\Obayashi-main\\public\\images\\work_mumbai_ahmedabad_rail_200.jpg"
$img = [System.Drawing.Image]::FromFile($src)
$img.Save($dst, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$img.Dispose()
Write-Host "Mumbai-Ahmedabad High-Speed Rail image conversion completed!"
`;

fs.writeFileSync('./convert_mumbai_temp.ps1', psContent);
try {
  const result = execSync('powershell -ExecutionPolicy Bypass -File ./convert_mumbai_temp.ps1');
  console.log(result.toString());
} finally {
  if (fs.existsSync('./convert_mumbai_temp.ps1')) {
    fs.unlinkSync('./convert_mumbai_temp.ps1');
  }
}
