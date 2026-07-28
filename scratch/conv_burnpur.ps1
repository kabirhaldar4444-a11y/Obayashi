Add-Type -AssemblyName System.Drawing
$src = 'D:\Obayashi-main\public\images\ChatGPT Image Jul 27, 2026, 03_54_38 PM.png'
$dst = 'D:\Obayashi-main\public\images\work_india_021.jpg'
$img = [System.Drawing.Image]::FromFile($src)
$img.Save($dst, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$img.Dispose()
Write-Host "Done: work_india_021.jpg"
