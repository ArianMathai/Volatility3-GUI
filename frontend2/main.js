const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const axios = require('axios');
const {format} = require("url");
/*
async function handleFileOpen() {
    console.log("Hit the button.");
    const { canceled, filePaths } = await dialog.showOpenDialog();
    if (!canceled) {
        return filePaths[0];
    }
}

 */

async function handleSubmitFilePath(filePath) {
    const response = await axios.post('http://localhost:8000/api/detectos', { "filepath": filePath });
    return response;
}

async function handleSubmitFileInfo(filePath, operatingSystem, plugin) {
    const response = await axios.post('http://localhost:8000/api/runplugin',
    { "filepath": filePath,
        "os": operatingSystem,
        "plugin": plugin
        }
    );
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
    //ipcMain.handle('dialog:openFile', handleFileOpen);
    ipcMain.handle('fetch-system-info', async (event, filePath) => {
        console.log("in main func file = ", filePath)
        try {
            const response = await handleSubmitFilePath(filePath);
            return response.data;
        } catch (error) {
            console.error('Error sending file path to backend:', error);
            throw new Error('Failed to send file path to backend');
        }
    });

    ipcMain.handle('fetch-process-list', async (event, filePath, operatingSystem, plugin) => {
        console.log(filePath + " |  " + operatingSystem + " | " + plugin)
        try {
            const response = await handleSubmitFileInfo(filePath, operatingSystem, plugin);
            return response.data;
        } catch (error) {
            console.error('Error sending file info to backend:', error);
            throw new Error('Failed to send file info to backend');
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
