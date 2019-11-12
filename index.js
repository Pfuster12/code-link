const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var win

function createWindow () {
	// Create the browser window.
	win = new BrowserWindow({ 
		width: 1600,
		height: 1000,
		webPreferences: {
			nodeIntegration: true,
			nodeIntegrationInWorker: true
		}
	})

	// set menu bar visibility
	// ONLY Win & Linux
	win.setMenuBarVisibility(false)

	// Keep a reference for dev mode
	var dev = false

	if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
		dev = true
	}

	// and load the index.html of the app.
	var indexPath

	// Implementing Webpack dev server,
	if (dev) {
		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:8080',
			pathname: 'index.html',
			slashes: true
		})

		// Add the React dev tools manually to the chromium window,
		// Make sure you have the FULL path here or it won't work
		BrowserWindow.addDevToolsExtension(
			"C:/Users/pfust/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.2.0_0"
		);

		// Open the DevTools.
		win.webContents.openDevTools()

	// if not dev load from the file index html,
	} else {
		indexPath = url.format({
			protocol: 'file:',
			pathname: path.join(__dirname, 'dist', 'index.html'),
			slashes: true
		})
	}

	// load url of the index path
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