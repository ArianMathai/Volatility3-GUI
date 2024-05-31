const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
    fetchSystemInfo: (filepath) => ipcRenderer.invoke("fetch-system-info", filepath),
    fetchPluginInfo:(filepath,operatingSystem) => ipcRenderer.invoke('fetch-plugin-report', filepath,operatingSystem),
});

