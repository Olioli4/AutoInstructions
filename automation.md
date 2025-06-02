# Automation Scripts and Tasks

This folder documents all automation used in this project, as required by the project instructions.

## PowerShell Scripts

- **build-and-release.ps1**: Automates building, packaging, cleaning cache, pushing, and releasing the VS Code extension.
- **publish-latest-vsix.ps1**: Publishes the latest .vsix file to GitHub and creates a release.

## VS Code Tasks

- **.vscode/tasks.json**: Defines an npm watch task for TypeScript compilation.

## Release Artifacts

- **release/**: Contains packaged .vsix files for each version of the extension.

---

All automation scripts are currently in the project root. To fully comply with the instructions, consider moving them into an `automation/` folder and updating references accordingly.
