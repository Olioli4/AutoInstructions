# Automation Scripts and Tasks

This folder contains all automation for the project, as required by the copilot instructions.

## PowerShell Scripts

- **build-and-release.ps1**: Automates building, packaging, cleaning cache, pushing, and releasing the VS Code extension.
- **publish-latest-vsix.ps1**: Publishes the latest .vsix file to GitHub and creates a release.

## VS Code Tasks

- **tasks.json** (in `.vscode/`): Defines an npm watch task for TypeScript compilation.

## Release Artifacts

- **release/**: Contains packaged .vsix files for each version of the extension.

---

All automation scripts have been documented here. If you want to move the scripts themselves into this folder, let me know.
