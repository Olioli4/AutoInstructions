# Auto Instructions VS Code Extension

## Overview

This extension ensures that every workspace contains a `.github/copilot-instructions.md` file, following a user-configurable template. It provides commands to edit the template and to update the copilot instructions file in your workspace.

## Features
- Automatically creates a `.github` folder and `copilot-instructions.md` file if missing.
- Stores the copilot instructions template at the user (global) settings level.
- Command to edit the copilot instructions template in a real markdown editor.
- Command to replace `.github/copilot-instructions.md` with the current template.
- No longer manages or opens `Instructions.instructions.md` in the workspace root.

## Usage
1. **Open a folder as a workspace in VS Code.**
2. The extension will ensure `.github/copilot-instructions.md` exists, creating it from your template if needed.
3. Use the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and run:
   - `Auto Instructions: Edit Copilot Template` to update the template for future workspaces.
   - `Auto Instructions: Replace Copilot Instructions File` to overwrite `.github/copilot-instructions.md` with your template.

## Contributing
- Follow the modular structure.
- Use PNG icons from the Assets folder; do not use base64 icons.
- Write clear comments and docstrings for maintainability.
- Commit only necessary files; avoid committing cache or test files.

## Support
For questions or issues, contact the project maintainer at https://github.com/Olioli4/AutoInstructions.
