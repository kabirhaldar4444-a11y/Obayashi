Add-Type -AssemblyName System.Drawing
$files = Get-ChildItem 'D:\Obayashi-main\public\images' | Where-Object { $_.Name -like '*Purulia*' -and $_.Extension -eq '.png' }
Write-Host "Found: $($files.FullName)"
$img = [System.Drawing.Image]::FromFile($files.FullName)
$img.Save('D:\Obayashi-main\public\images\work_india_015.jpg', [System.Drawing.Imaging.ImageFormat]::Jpeg)
$img.Dispose()
Write-Host "Done: work_india_015.jpg"
