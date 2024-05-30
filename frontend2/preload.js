const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
    fetchSystemInfo: (filepath) => ipcRenderer.invoke("fetch-system-info", filepath),
    runPlugin: (filePath, osName, plugin) => ipcRenderer.invoke('run-plugin', filePath, osName, plugin)
});

