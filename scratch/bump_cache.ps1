$files = @(
  "src\pages\Works.jsx",
  "src\pages\WorkDetail.jsx",
  "src\pages\ProjectDetail.jsx",
  "src\components\ProjectDetailModal.jsx",
  "src\components\ProjectMapPopup.jsx",
  "src\components\ProjectCard.jsx"
)
foreach ($f in $files) {
  $content = Get-Content $f -Raw
  $updated = $content -replace 'obayashi_real_2026_v34', 'obayashi_real_2026_v35'
  Set-Content $f $updated -NoNewline
  Write-Host "Updated: $f"
}
