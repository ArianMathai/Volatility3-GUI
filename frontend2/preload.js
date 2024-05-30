const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
    send: (filepath) => ipcRenderer.invoke("fetch-system-info", filepath),
});

