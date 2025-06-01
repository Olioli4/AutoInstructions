# Auto Instructions VS Code Extension

## Overview

This extension ensures that every workspace contains a `.github/copilot-instructions.md` file, following a user-configurable template. The template is stored at the user (global) settings level and can be edited via a dedicated command. You can also update the copilot instructions file in your workspace at any time with a single command.

- On activation, the extension checks for the existence of `.github/copilot-instructions.md` in your workspace and creates it from your template if missing.
- The template is managed globally and can be edited in a real markdown editor using the Command Palette.
- You can replace the workspace's copilot instructions file with the current template at any time using a command.
- The extension no longer manages or opens `Instructions.instructions.md` in the workspace root.

### Available Commands

- **Auto Instructions: Edit Copilot Template**
  - Opens the copilot instructions template in a markdown editor for editing. Changes are saved globally for all future workspaces.
- **Auto Instructions: Replace Copilot Instructions File**
  - Overwrites `.github/copilot-instructions.md` in the current workspace with the latest template.

### Usage Example
1. **Open a folder as a workspace in VS Code.**
2. The extension will ensure `.github/copilot-instructions.md` exists, creating it from your template if needed.
3. Use the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and run:
   - `Auto Instructions: Edit Copilot Template` to update the template for future workspaces.
   - `Auto Instructions: Replace Copilot Instructions File` to overwrite `.github/copilot-instructions.md` with your template.

## Features
- Automatically creates a `.github` folder and `copilot-instructions.md` file if missing.
- Stores the copilot instructions template at the user (global) settings level.
- Command to edit the copilot instructions template in a real markdown editor.
- Command to replace `.github/copilot-instructions.md` with the current template.

## Contributing
- Follow the modular structure.
- Use PNG icons from the Assets folder; do not use base64 icons.
- Write clear comments and docstrings for maintainability.
- Commit only necessary files; avoid committing cache or test files.

## Support
For questions or issues, contact the project maintainer at https://github.com/Olioli4/AutoInstructions.
