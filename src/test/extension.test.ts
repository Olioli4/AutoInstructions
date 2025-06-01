import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const DEFAULT_INSTRUCTIONS = `# USER INSTRUCTIONS

Welcome to the project!

Please read these instructions carefully before making changes or running the code.

## Getting Started
- Ensure you have all required dependencies installed.
- Review the project structure and main files.
- Use the provided VS Code tasks for setup and reminders.

## Usage
- Run main.py to start the application.
- Use the custom form to interact with the ODS spreadsheet.
- Refer to the Assets folder for all icon resources.

## Contributing
- Follow the modular structure.
- Use PNG icons from the Assets folder; do not use base64 icons.
- Write clear comments and docstrings for maintainability.
- Commit only necessary files; avoid committing cache or test files.

## Automation
- On opening the workspace, you will be prompted to read these instructions via a VS Code task.
- Click the provided link in the terminal to open this file directly.

## Support
For questions or issues, contact the project maintainer.
`;

let standardInstructions = DEFAULT_INSTRUCTIONS;

function ensureFile(filePath: string, content: string) {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content, { encoding: 'utf8' });
    }
}

function ensureTasksJson(vscodeDir: string, workspaceFolder: string) {
    const tasksPath = path.join(vscodeDir, 'tasks.json');
    if (!fs.existsSync(tasksPath)) {
        const tasksJson = {
            version: "2.0.0",
            tasks: [
                {
                    label: "read-user-instructions-on-start",
                    type: "shell",
                    command: `echo Please read the USER INSTRUCTIONS for this project. Open them here: vscode://file/${workspaceFolder}/Instructions.instructions.md`,
                    isBackground: false,
                    group: "build"
                }
            ]
        };
        fs.writeFileSync(tasksPath, JSON.stringify(tasksJson, null, 2), { encoding: 'utf8' });
    }
}

function ensureInstructions(workspaceFolder: string): string {
    const instructionsPath = path.join(workspaceFolder, 'Instructions.instructions.md');
    ensureFile(instructionsPath, standardInstructions);
    return instructionsPath;
}

export function activate(context: vscode.ExtensionContext) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
        const workspaceFolder = workspaceFolders[0].uri.fsPath;
        const vscodeDir = path.join(workspaceFolder, '.vscode');
        if (!fs.existsSync(vscodeDir)) {
            fs.mkdirSync(vscodeDir);
        }
        ensureTasksJson(vscodeDir, workspaceFolder);
        const instructionsPath = ensureInstructions(workspaceFolder);

        // Automatically open the instructions file
        vscode.workspace.openTextDocument(instructionsPath).then(doc => {
            vscode.window.showTextDocument(doc, { preview: false });
        });
    }

    // Command to change the standard instructions
    let disposable = vscode.commands.registerCommand('auto-instructions.changeStandardInstructions', async () => {
        const newInstructions = await vscode.window.showInputBox({
            prompt: 'Paste new standard instructions for Instructions.instructions.md',
            value: standardInstructions,
            ignoreFocusOut: true
        });
        if (newInstructions !== undefined) {
            standardInstructions = newInstructions;
            vscode.window.showInformationMessage('Standard instructions updated. New workspaces will use this content.');
        }
    });

    context.subscriptions.push(disposable);

    // Command to re-initialize current workspace
    let reinit = vscode.commands.registerCommand('auto-instructions.reinitWorkspace', () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            const workspaceFolder = workspaceFolders[0].uri.fsPath;
            const vscodeDir = path.join(workspaceFolder, '.vscode');
            if (!fs.existsSync(vscodeDir)) {
                fs.mkdirSync(vscodeDir);
            }
            ensureTasksJson(vscodeDir, workspaceFolder);
            ensureInstructions(workspaceFolder);
            vscode.window.showInformationMessage('Workspace re-initialized with instructions and tasks.');
        }
    });

    context.subscriptions.push(reinit);
}

export function deactivate() {}