# Change Log

All notable changes to the "auto-instructions" extension will be documented in this file.

## [2.0.5] - 2025-06-02
- All automation scripts and documentation are now located in the `automation/` folder as required by project rules.
- The extension now persists the user-level copilot template in VS Code user settings (with proper configuration in package.json).
- Editing the user template is seamless and never prompts for a save location; changes are saved directly to user settings.
- Removed legacy test and code for `Instructions.instructions.md`.
- Updated documentation and README for new workflow and compliance.
- Added cache-cleaning to the build-and-release script for reliable extension testing.

## [1.1.0] - 2025-06-02
- Now manages `.github/copilot-instructions.md` only.
- Template is stored in user settings and can be edited via Command Palette.
- Command to replace `.github/copilot-instructions.md` with the template.
- No longer manages or opens `Instructions.instructions.md` in the workspace root.

## [Unreleased]
- Initial release