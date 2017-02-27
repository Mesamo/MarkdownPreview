const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

let win

// 保持窗口对象的全局引用，如果不这样做，当JavaScript对象被垃圾回收时，窗口将被自动关闭。
function createWindow () {

    // 创建浏览器窗口。
    win = new BrowserWindow({
        width: 800, 
        height: 600, 
        // transparent: true,
        // frame: false
    })

    // 并加载应用程序的index.html。
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }))

    // 打开开发工具。
    win.webContents.openDevTools()

    ipc.on('open-file-dialog', (event) => {
        dialog.showOpenDialog({properties: ['openFile']}, function (files) {
            if (files) {
                event.sender.send('selected-files', files)
            }
        })
    })

    ipc.on('tab-all-closed', (event) => {
        win.close()
    })

    // 窗口关闭时触发。
    win.on('closed', () => {
        win = null
    })
}

// 当Electron完成时，将调用此方法初始化并准备创建浏览器窗口。
// 一些API只能在此事件发生后使用。
app.on('ready', createWindow)

// 所有窗口关闭时退出。
app.on('window-all-closed', () => {

    // 在macOS上它是常见的应用程序及其菜单栏，保持活动状态，直到用户使用Cmd + Q显式退出
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('active', () => {
    if (win === null) {
        createWindow()
    }
})
