import { app, BrowserWindow, Menu } from 'electron';
import * as url from 'url'
require('dotenv').config()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var win: Electron.BrowserWindow = null

/**
 * Creates a {@link BrowserWindow}.
 */
function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1000,
        height: 1000,
        frame: false,
        webPreferences: {
          nodeIntegration: true
        }
    })

    // since 7.1.1 only way to remove electron menu.
    // see https://github.com/electron/electron/issues/21088
    Menu.setApplicationMenu(null)

    // Add the React dev tools manually to the chromium window, Make sure you have the FULL path here or it won't work
    // since v.6.0.0 to 7.1.1 there is an issue with dev tools and Windows Dark Mode makes electron hang and not
    // open a window, see https://github.com/electron/electron/issues/19468
	  //BrowserWindow.addDevToolsExtension(process.env.REACT_TOOLS_PATH)

    // Open the DevTools.
    win.webContents.openDevTools()

    var indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:8080',
			pathname: 'app.html',
			slashes: true
    })
    
    // and load the index.html of the app.
    win.loadURL(indexPath)

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.