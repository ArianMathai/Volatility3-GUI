const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
    fetchSystemInfo: (filepath) => ipcRenderer.invoke("fetch-system-info", filepath),
    fetchProcessList: (filepath, operatingSystem, plugin) => ipcRenderer.invoke("fetch-process-list", filepath, operatingSystem, plugin),
});

