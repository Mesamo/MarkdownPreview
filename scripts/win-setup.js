const installer = require('electron-winstaller');
const pkg = require('../package.json');
const marked = require('marked');

const options = {
    appDirectory: 'dist/MarkdownPreview-win32-x64/',
    outputDirectory: 'dist/',
    exe: 'MarkdownPreview.exe',
    tags: pkg.keywords,
    setupExe: 'MarkdownPreview-setup-win32-x64.exe',
    noMsi: true
}

installer.createWindowsInstaller(options)