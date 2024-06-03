const { contextBridge, ipcRenderer } = require('electron/renderer');

contextBridge.exposeInMainWorld('electronAPI', {
    fetchSystemInfo: (filepath) => ipcRenderer.invoke("fetch-system-info", filepath),
    fetchProcessList: (filepath, operatingSystem, plugin) => ipcRenderer.invoke("fetch-process-list", filepath, operatingSystem, plugin),
    fetchPlugins:(os) => ipcRenderer.invoke("get-plugin-list",os),
    fetchAllPlugins: () => ipcRenderer.invoke('get-all-plugins')
});

contextBridge.exposeInMainWorld('fileAPI', {
    createProjectFolder: (projectName) => ipcRenderer.invoke('create-project-folder', projectName),
})
