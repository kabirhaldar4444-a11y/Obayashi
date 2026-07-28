Add-Type -AssemblyName System.Drawing
$src = 'C:\Users\Dell\.gemini\antigravity-ide\brain\52fa554c-f0da-475f-892c-867a0f3dfcb6\ghatghar_pumped_storage_1785137135550.png'
$dst = 'D:\Obayashi-main\public\images\work_india_017.jpg'
$img = [System.Drawing.Image]::FromFile($src)
$img.Save($dst, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$img.Dispose()
Write-Host "Done: work_india_017.jpg"
