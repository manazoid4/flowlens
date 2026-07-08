# FlowLens resume scheduler
# Computes a resume time ~5h05m from now, writes .agent-state/NEXT_RUN.md, and tries to
# register a Windows Scheduled Task that opens the repo/HANDOFF.md at that time. Falls back
# to printing manual instructions if the scheduler isn't available/permitted.

$repoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$resumeTime = (Get-Date).AddHours(5).AddMinutes(5)
$resumeTimeStr = $resumeTime.ToString("yyyy-MM-dd HH:mm:ss")

$claudePath = (Get-Command claude -ErrorAction SilentlyContinue).Source

$nextRunContent = @"
# FlowLens — NEXT_RUN

Computed: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Suggested resume time: $resumeTimeStr

## Resume command
"@

if ($claudePath) {
    $nextRunContent += "`nclaude found at: $claudePath`n`nSuggested resume command (run from $repoRoot):`n`n``````\nclaude `"Read .agent-state/RESUME_PROMPT.md and continue the FlowLens build from there.`"\n``````\n"
} else {
    $nextRunContent += "`nclaude CLI not found on PATH. Manual steps:`n1. Open a terminal in $repoRoot`n2. Open .agent-state/RESUME_PROMPT.md, copy its contents`n3. Start Claude Code and paste it as your first message`n"
}

Set-Content -Path (Join-Path $repoRoot ".agent-state/NEXT_RUN.md") -Value $nextRunContent -Encoding UTF8

$taskName = "FlowLens-Claude-Resume"
$handoffPath = Join-Path $repoRoot ".agent-state/HANDOFF.md"

try {
    $action = New-ScheduledTaskAction -Execute "explorer.exe" -Argument "`"$handoffPath`""
    $trigger = New-ScheduledTaskTrigger -Once -At $resumeTime
    Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Force -ErrorAction Stop | Out-Null
    Write-Host "Scheduled task '$taskName' registered for $resumeTimeStr"
} catch {
    Write-Host "Could not register scheduled task: $($_.Exception.Message)"
    Write-Host "Manual fallback: set a reminder for $resumeTimeStr to open $handoffPath and resume."
}

Write-Host "Resume info written to .agent-state/NEXT_RUN.md"
