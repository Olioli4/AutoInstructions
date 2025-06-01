import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const DEFAULT_TEMPLATE = `# Copilot Instructions

Welcome to this project! Please follow these best practices to ensure high-quality, maintainable, and collaborative code.

## General Guidelines

- Always write clear, concise, and well-documented code.
- Use modularization: break code into small, reusable functions and components.
- Follow the project's coding style and naming conventions.
- Write meaningful commit messages and keep commits focused.
- Use version control best practices (feature branches, pull requests, code reviews).
- **Always resume code changes before editing and always ask for OK before editing the code.**

## Project Structure

- Organize code into logical folders (e.g., \`src/\`, \`test/\`, \`docs/\`, \`assets/\`).
- Place documentation in \`README.md\` and update it as the project evolves.
- Store configuration and environment files separately from source code.

## Documentation

- Every module, class, and function should have a clear docstring or comment explaining its purpose and usage.
- Update \`README.md\` with setup instructions, usage examples, and contribution guidelines.
- Document any non-obvious design decisions or dependencies.

## Testing

- Write automated tests for all critical functionality.
- Place tests in a dedicated \`test/\` folder, mirroring the structure of \`src/\`.
- Use descriptive test names and include edge cases.

## Collaboration

- Communicate changes and design decisions with the team.
- Review and test code before merging.
- Respect existing code and refactor only with clear justification.

## Automation

- Use scripts or tasks for common workflows (build, test, lint, deploy).
- Document all automation in a dedicated \`automation/\` folder.

## Support

For questions or issues, contact the project maintainer or open an issue in the repository.
`;
const COPILOT_FILENAME = 'copilot-instructions.md';
const GITHUB_DIR = '.github';

function getTemplate(): string {
    const config = vscode.workspace.getConfiguration('auto-instructions');
    return config.get<string>('copilotTemplate', DEFAULT_TEMPLATE);
}

async function ensureGithubAndCopilotFile(workspaceFolder: string) {
    const githubDir = path.join(workspaceFolder, GITHUB_DIR);
    if (!fs.existsSync(githubDir)) {
        fs.mkdirSync(githubDir);
    }
    const copilotPath = path.join(githubDir, COPILOT_FILENAME);
    if (!fs.existsSync(copilotPath)) {
        fs.writeFileSync(copilotPath, getTemplate(), { encoding: 'utf8' });
    }
}

export function activate(context: vscode.ExtensionContext) {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
        const workspaceFolder = workspaceFolders[0].uri.fsPath;
        ensureGithubAndCopilotFile(workspaceFolder);
    }

    // Command to edit the template in a real editor
    let editTemplateCmd = vscode.commands.registerCommand('auto-instructions.editCopilotTemplate', async () => {
        const config = vscode.workspace.getConfiguration('auto-instructions');
        const current = config.get<string>('copilotTemplate', DEFAULT_TEMPLATE);
        const doc = await vscode.workspace.openTextDocument({
            content: current,
            language: 'markdown'
        });
        await vscode.window.showTextDocument(doc, { preview: false });
        const saveDisposable = vscode.workspace.onDidSaveTextDocument(async (savedDoc) => {
            if (savedDoc.uri.toString() === doc.uri.toString()) {
                await config.update('copilotTemplate', savedDoc.getText(), vscode.ConfigurationTarget.Global);
                vscode.window.showInformationMessage('Copilot instructions template updated.');
            }
        });
        context.subscriptions.push(saveDisposable);
    });
    context.subscriptions.push(editTemplateCmd);

    // Command to replace .github/copilot-instructions.md with template
    let replaceCopilotCmd = vscode.commands.registerCommand('auto-instructions.replaceCopilotInstructions', async () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            const workspaceFolder = workspaceFolders[0].uri.fsPath;
            const githubDir = path.join(workspaceFolder, GITHUB_DIR);
            if (!fs.existsSync(githubDir)) {
                fs.mkdirSync(githubDir);
            }
            const copilotPath = path.join(githubDir, COPILOT_FILENAME);
            fs.writeFileSync(copilotPath, getTemplate(), { encoding: 'utf8' });
            vscode.window.showInformationMessage('copilot-instructions.md replaced with template.');
        }
    });
    context.subscriptions.push(replaceCopilotCmd);
}

export function deactivate() {}