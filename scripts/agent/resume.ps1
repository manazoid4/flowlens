# FlowLens resume helper — prints everything needed to pick this build back up.
$repoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Write-Host "=== FlowLens repo path ===" -ForegroundColor Cyan
Write-Host $repoRoot
Write-Host "`n=== git status ===" -ForegroundColor Cyan
Push-Location $repoRoot
git status
Write-Host "`n=== git log (last 10) ===" -ForegroundColor Cyan
git log --oneline -10
Pop-Location
Write-Host "`n=== HANDOFF.md ===" -ForegroundColor Cyan
Get-Content (Join-Path $repoRoot ".agent-state/HANDOFF.md")
Write-Host "`n=== RESUME_PROMPT.md ===" -ForegroundColor Cyan
Get-Content (Join-Path $repoRoot ".agent-state/RESUME_PROMPT.md")
Write-Host "`n=== Next steps ===" -ForegroundColor Green
Write-Host "1. Open a terminal in $repoRoot"
Write-Host "2. Start Claude Code"
Write-Host "3. Paste the RESUME_PROMPT.md content above as your first message"
