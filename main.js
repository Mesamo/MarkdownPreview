/**
 * Created by Mesamo on 2015/9/9.
 */
var app = require('app');
var BrowserWindow = require('browser-window');
//var ipc = require('ipc');

var mainWindow = null;

app.on('window-all-closed', function(){
    if (process.platform != 'darwin'){
        app.quit();
    }
});

app.on('ready', function(){
    //��������
    mainWindow = new BrowserWindow({
        title : 'MarkdownPreview',
        width : '800',
        height : '600'
        //frame: false
    });

    //��ҳ��
    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    //mainWindow.openDevTools();

    mainWindow.on('closed', function(){
        mainWindow = null;
    });
});

/*ipc.on('quit', function(event, arg){
   app.quit();
});*/