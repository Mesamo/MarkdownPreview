/**
 * Created by Mesamo on 2015/11/30.
 */
var app = require('app');
var BrowserWindow = require('browser-window');
var globalShortcut = require('global-shortcut');

var mainWindow = null;

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        title: 'MarkdownPreview',
        width: '800',
        height: '600',
        'auto-hide-menu-bar': true
    });

    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    globalShortcut.register('ctrl+O', function () {
        console.log('ctrl+O is pressed');
        mainWindow.openDevTools();
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});

app.on('will-quit', function () {
    globalShortcut.unregisterAll();
});