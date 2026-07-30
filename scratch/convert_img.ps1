Add-Type -AssemblyName System.Drawing
$src = "D:\Obayashi-main\public\images\ChatGPT Image Jul 30, 2026, 11_09_06 AM.png"
$dst = "D:\Obayashi-main\public\images\work_india_005.jpg"
$bmp = New-Object System.Drawing.Bitmap($src)
$bmp.Save($dst, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()
Write-Output "Successfully replaced work_india_005.jpg"
