Add-Type -AssemblyName System.Drawing
$src = 'D:\Obayashi-main\public\images\ChatGPT Image Jul 28, 2026, 11_52_31 AM.png'
$dst = 'D:\Obayashi-main\public\images\work_india_026.jpg'
$img = [System.Drawing.Image]::FromFile($src)
$img.Save($dst, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$img.Dispose()
Write-Host "Done: work_india_026.jpg"
