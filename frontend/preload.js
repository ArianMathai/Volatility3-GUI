const { contextBridge, ipcRenderer } = require('electron/renderer');
const {ipcMain} = require("electron");

contextBridge.exposeInMainWorld('electronAPI', {
    fetchSystemInfo: (filepath) => ipcRenderer.invoke("fetch-system-info", filepath),
    fetchProcessList: (filepath, operatingSystem, plugin) => ipcRenderer.invoke("fetch-process-list", filepath, operatingSystem, plugin),
    fetchProcessPluginResult: (filepath, operatingSystem, plugin, pid) => ipcRenderer.invoke("fetch-process-plugin-result", filepath, operatingSystem, plugin, pid),
    fetchPhysaddrDumpfiles: (filepath, operatingSystem, plugin, physaddr) => ipcRenderer.invoke("dump-file-physaddr", filepath, operatingSystem, plugin, physaddr),
    fetchPlugins:(os) => ipcRenderer.invoke("get-plugin-list",os),
    fetchAllPlugins: () => ipcRenderer.invoke('get-all-plugins'),
    showDialog: (options) => ipcRenderer.invoke('show-dialog', options)
});

contextBridge.exposeInMainWorld('fileAPI', {
    createProjectFolder: (projectName) => ipcRenderer.invoke('create-project-folder', projectName),
    saveCSV: (folderPath,csvContent,plugin) => ipcRenderer.invoke('save-csv', folderPath,csvContent,plugin),
    dumpFilePid:(filePath, os, plugin, pid ) => ipcRenderer.invoke('dump-file-pid', filePath,os,plugin,pid),
})