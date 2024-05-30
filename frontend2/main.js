const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const axios = require('axios');
const {format} = require("url");

async function handleFileOpen() {
    console.log("Hit the button.");
    const { canceled, filePaths } = await dialog.showOpenDialog();
    if (!canceled) {
        return filePaths[0];
    }
}

async function handleSubmitFilePath(filePath) {
    const response = await axios.post('http://localhost:8000/api/detectos', { "filepath": filePath });
    return response;
}

function createWindow() {

    const startUrl = format({
        pathname: path.join(__dirname,'./app/build/index.html'),
        protocol:'file',
    })

    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    mainWindow.webContents.openDevTools();
    mainWindow.loadURL(startUrl);
}

app.whenReady().then(() => {
    ipcMain.handle('dialog:openFile', handleFileOpen);
    ipcMain.handle('send-file-path', async (event, filePath) => {
        try {
            const response = await handleSubmitFilePath(filePath);
            return response.data;
        } catch (error) {
            console.error('Error sending file path to backend:', error);
            throw new Error('Failed to send file path to backend');
        }
    });
    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
