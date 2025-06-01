#!/usr/bin/env pwsh
# Publish the latest .vsix to GitHub and create a release

# Find the latest .vsix file in the release folder
$releaseDir = Join-Path $PSScriptRoot 'release'
$latestVsix = Get-ChildItem -Path $releaseDir -Filter '*.vsix' | Sort-Object LastWriteTime -Descending | Select-Object -First 1

if (-not $latestVsix) {
    Write-Error 'No .vsix file found in the release folder.'
    exit 1
}

# Get version from filename (e.g., auto-instructions-1.0.2.vsix)
if ($latestVsix.Name -match '\d+\.\d+\.\d+') {
    $version = $Matches[0]
} else {
    Write-Error 'Could not extract version from .vsix filename.'
    exit 1
}



# Create a GitHub release and upload the .vsix (requires gh CLI)
Write-Host "Creating GitHub release v$version and uploading $($latestVsix.Name)..."
$releaseNotes = "Auto-generated release for $($latestVsix.Name)"

# Find the .vsix file in the repo (relative path for GitHub release upload)
$vsixRelativePath = $latestVsix.FullName.Replace((git rev-parse --show-toplevel), ".")

# Create the release and upload the .vsix from the repo (not local path)
gh release create "v$version" $vsixRelativePath --title "v$version" --notes $releaseNotes --latest --repo "Olioli4/AutoInstructions"

Write-Host "Done."
