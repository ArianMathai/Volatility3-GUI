const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const axios = require('axios');

async function handleFileOpen() {
    console.log("Hit the button.");
    const { canceled, filePaths } = await dialog.showOpenDialog();
    if (!canceled) {
        return filePaths[0];
    }
}

function createWindow() {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
    ipcMain.handle('dialog:openFile', handleFileOpen);
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
