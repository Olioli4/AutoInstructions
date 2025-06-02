#!/usr/bin/env pwsh
# build-and-release.ps1
# Interactive script to build, package, and optionally push and release the VS Code extension

function Update-PackageJsonVersion {
    param([string]$Version)
    $packageJson = Get-Content -Raw -Path "package.json" | ConvertFrom-Json
    $packageJson.version = $Version
    $packageJson | ConvertTo-Json -Depth 100 | Set-Content -Path "package.json" -Encoding UTF8
    Write-Host "Updated package.json to version $Version"
}

function Build {
    Write-Host "Running TypeScript build..."
    npm run compile
}

function Package {
    param([string]$Version)
    $vsixPath = "./release/auto-instructions-$Version.vsix"
    Write-Host "Packaging extension as $vsixPath ..."
    npx vsce package -o $vsixPath
}

function Push {
    Write-Host "Committing and pushing to git..."
    git add .
    git commit -m "Release $Version"
    git push
}

function Release {
    param([string]$Version)
    $vsixPath = "./release/auto-instructions-$Version.vsix"
    Write-Host "Creating GitHub release v$Version ..."
    gh release create "v$Version" $vsixPath --title "v$Version" --notes "Release $Version" --latest --repo "Olioli4/AutoInstructions"
}

function CleanCache {
    Write-Host "Uninstalling extension and cleaning VS Code cache..."
    code --uninstall-extension Olioli4.auto-instructions
    $globalStorage = "$env:APPDATA\Code\User\globalStorage\olioli4.auto-instructions"
    if (Test-Path $globalStorage) { Remove-Item -Recurse -Force $globalStorage }
    Write-Host "Extension and global storage cleaned."
}

# --- Main Script ---

$version = Read-Host "Enter new version number (e.g., 2.0.1)"
Update-PackageJsonVersion $version

Write-Host "Choose an action:"
Write-Host "0. Clean VS Code extension cache only"
Write-Host "1. Build only"
Write-Host "2. Build and package"
Write-Host "3. Build, package, and push"
Write-Host "4. Build, package, push, and create GitHub release"
$choice = Read-Host "Enter 0, 1, 2, 3, or 4"

if ($choice -eq 0) {
    CleanCache
    exit
}

CleanCache

Build

if ($choice -ge 2) {
    Package $version
}
if ($choice -ge 3) {
    Push
}
if ($choice -eq 4) {
    Release $version
}

Write-Host "Done."
