# Auto Instructions VS Code Extension

## Overview

This extension automatically creates and manages a user instructions file (`Instructions.instructions.md`) in your workspace. It also sets up a VS Code task to remind users to read the instructions and provides commands to update or re-initialize the instructions.

## Features
- Automatically creates an `Instructions.instructions.md` file with customizable content when a workspace is opened.
- Opens the instructions file automatically for the user.
- Adds a VS Code task to remind users to read the instructions.
- Command to change the standard instructions for new workspaces.
- Command to re-initialize the current workspace with the latest instructions and tasks.

## Usage
1. **Open a folder as a workspace in VS Code.**
2. The extension will create and open the instructions file if it does not exist.
3. Use the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and run:
   - `auto-instructions.changeStandardInstructions` to update the default instructions for future workspaces.
   - `auto-instructions.reinitWorkspace` to re-create the instructions and tasks in the current workspace.

## Contributing
- Follow the modular structure.
- Use PNG icons from the Assets folder; do not use base64 icons.
- Write clear comments and docstrings for maintainability.
- Commit only necessary files; avoid committing cache or test files.

## Support
For questions or issues, contact the project maintainer at https://github.com/Olioli4/AutoInstructions.
