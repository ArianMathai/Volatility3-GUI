const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
    openFile: () => ipcRenderer.invoke('dialog:openFile'),
    sendFilePath: (filePath) => ipcRenderer.invoke('send-file-path', filePath),
});