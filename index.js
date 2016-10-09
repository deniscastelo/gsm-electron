const {app, BrowserWindow} = require('electron');
const {ipcMain} = require('electron');


let mainWindow;

app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 1024, height: 768 });
  mainWindow.loadURL('file://' + __dirname + '/app/index.html');
  mainWindow.openDevTools();
});

ipcMain.on('db-path', (event, arg) => {
	console.log(__dirname +'/app/database/bd_sistema_gsm.mdb');
	event.returnValue = __dirname +'/app/database/bd_sistema_gsm.mdb';
});