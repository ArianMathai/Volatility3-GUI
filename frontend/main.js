const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const axios = require('axios');
const {format} = require("url");
const { spawn, exec } = require('child_process');
const fs = require('fs');
const util = require('util');


const isMacOrLinux = process.platform === "darwin" || process.platform === "linux"



let appProcess;
let projectPath;

const pythonScriptPath = '../backend/app.py'


const execAsync = util.promisify(exec);

async function runPyInstaller() {
  const pyinstallerOptions = isMacOrLinux
    ? '--add-data "app.py:." --add-data "./util/*.py:util" --add-data "../volatility3/*:volatility3"'
    : '--add-data "app.py;." --add-data "./util/*.py;util" --add-data "../volatility3/*;volatility3"';
  const pyinstallerCommand = `pyinstaller ${pyinstallerOptions} app.py`;

  try {
    // Change the working directory in the command itself
    const cwdCommand = `cd ${path.join(__dirname, '../backend')} && ${pyinstallerCommand}`;
    const { stdout, stderr } = await execAsync(cwdCommand);
    console.log(stdout);
    console.error(stderr);
  } catch (error) {
    console.error(`Failed to run PyInstaller: ${error}`);
    throw error; // Rethrow the error to be handled by the caller
  }
}

const resultPath = path.join(__dirname,'..','results');
if(!fs.existsSync(resultPath)){
    fs.mkdirSync(resultPath);
    console.log("'Created 'results' folder");
}

//This function checks if folder exist. If it does, it creates a (<number>) to make it unique
function getUniqueFolderName(basePath,baseName){
    let folderName = baseName;
    let counter = 1;
    while (fs.existsSync(path.join(basePath,folderName))){
        folderName = `${baseName}_(${counter})`;
        counter++;
    }
    return folderName;
}

ipcMain.handle('create-project-folder', (event,projectName) => {
    const uniqueProjectName = getUniqueFolderName(resultPath,projectName);
    projectPath = path.join(resultPath,uniqueProjectName);
    fs.mkdirSync(projectPath);
    console.log(`Created project folder: ${projectPath}`)
    return {
        projectPath:projectPath,
        projectName:uniqueProjectName,
    }
});

ipcMain.handle('save-csv', async (event, folderPath, csvContent, plugin) => {
    try {
        const filePath = path.join(folderPath, `${plugin}.csv`);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(filePath, buffer);

        return { status: 'success', message: `${plugin}.csv file saved successfully.` };
    } catch (error) {
        return { status: 'error', message: `Error saving ${plugin}.csv file.` };
    }
});

async function handleSubmitFilePath(filePath) {
    const response = await axios.post('http://localhost:8000/api/detectos', { "filepath": filePath });
    return response;
}

async function handleGetPlugins(os){
    console.log(os)
    return await axios.post('http://localhost:8000/api/get-plugins',{"os":os});
}

async function handleGetAllPlugins(){
    return await axios.get('http://localhost:8000/api/get-all-plugins');
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

async function handleSubmitProcessInfo(filePath, operatingSystem, plugin, pid) {
    const response = await axios.post('http://localhost:8000/api/runpluginwithpid',
    {
        "filepath": filePath,
        "os": operatingSystem,
        "plugin": plugin,
        "pid": pid
        }
    );
    return response;
}

async function startAppExecutable() {
  const folderPath = path.join(__dirname, '../backend/dist');

  // Check if the folder exists
  if (fs.existsSync(folderPath)) {
    console.log('The folder backend/dist exists. Deleting and recreating...');
    fs.rmdirSync(folderPath, { recursive: true });
  }

  // Create a new dist folder by running PyInstaller
  await runPyInstaller();

  let appExecutablePath = path.join(__dirname, '../backend/dist/app/app');
  if (process.platform === 'win32') {
    appExecutablePath += '.exe';
  }

  try {
    const process = spawn(appExecutablePath);

    process.stdout.on('data', (data) => {
      console.log(`App stdout: ${data}`);
    });

    process.stderr.on('data', (data) => {
      console.error(`App stderr: ${data}`);
    });

    process.on('close', (code) => {
      console.log(`App process exited with code ${code}`);
    });

    return process;
  } catch (error) {
    console.error(`Failed to start app process: ${error}`);
    throw error; // Rethrow the error to be handled by the caller
  }
}

// Example usage
startAppExecutable().catch((error) => {
  console.error('An error occurred:', error);
});


function createWindow() {

    const startUrl = format({
        pathname: path.join(__dirname,'./build/index.html'),
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
    mainWindow.loadURL(startUrl);
}

app.whenReady().then( async () => {


    try {
         appProcess = await startAppExecutable();
    } catch (error) {
        console.error('Both python3 and python commands failed:', error);
        appProcess.quit();
        return;
    }
    console.log("appProcess: ", appProcess)

        appProcess.stderr.on('data', (data) => {
            console.error(`Python terminal stderr: ${data}`);
        });

        appProcess.on('exit', (code) => {
            console.log(`App process exited with code ${code}`);
        });

    ipcMain.handle('fetch-system-info', async (event, filePath) => {

        let response;

        try {
            const axiosResponse = await handleSubmitFilePath(filePath);

            response = axiosResponse.data;

            if (response.data) {
                console.log('System info retrieved successfully:', response.data);
                return response;
            }

        } catch (error) {
            console.error('Error when fetching system info', error);
            if(error.response.status === 400){
                return { error: 'Bad Request. Invalid file path.' };
            } else {
                return { error: 'Internal Server Error. Make sure file is compatible.' };
            }
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

    ipcMain.handle('dump-file-pid', async (event, filePath, os, plugin, pid) => {
    let dumpPath;

    try {
        dumpPath = path.join(projectPath, "dump", plugin);
        console.log("Path: ", dumpPath);
        console.log("Plugin: ", plugin);
        if (!fs.existsSync(dumpPath)) {
            fs.mkdirSync(dumpPath, { recursive: true });
        }

    } catch (error) {
        console.error("Error creating directory", error);
        return { "status":false,"message":`Failed creating directory` };
    }

    try {
        const axiosResponse = await axios.post('http://localhost:8000/api/dump-with-pid', {
            "filepath": filePath, "os": os, "plugin": plugin, "outputDir": dumpPath, "pid": pid
        });

        return {"status":true,"message":`${plugin} dump created at: ${dumpPath}`}

    } catch (error) {
        console.error("Error when running dump", error);
        return { "status":false,"message":`${plugin} dump failed` };
    }
});

    ipcMain.handle('dump-file-physaddr', async (event, filePath, os, physaddr) => {
    let dumpPath;

    console.log("physaddr:", filePath)
    console.log("physaddr:", os)
    console.log("physaddr:", physaddr)

    try {
        dumpPath = path.join(projectPath, "dumpfiles", physaddr);
        console.log("Path: ", dumpPath);
        console.log("physaddr: ", physaddr);
        if (!fs.existsSync(dumpPath)) {
            fs.mkdirSync(dumpPath, { recursive: true });
        }

    } catch (error) {
        console.error("Error creating directory", error);
        return { "status":false,"message":`Failed creating directory` };
    }

    try {
        const axiosResponse = await axios.post('http://localhost:8000/api/run-dumpfiles', {
            "filepath": filePath, "os": os, "physaddr": physaddr, "outputDir": dumpPath
        });
        console.log({"status":true,"message":`${physaddr} dump created at: ${dumpPath}`})
        return {"status":true,"message":`${physaddr} dump created at: ${dumpPath}`}

    } catch (error) {
        console.error("Error when running dumpfiles", error);
        return { "status":false,"message":`${physaddr} dumpfiles failed` };
    }
});



    ipcMain.handle('fetch-process-plugin-result', async (event, filePath, operatingSystem, plugin, pid) => {
        console.log(filePath + " |  " + operatingSystem + " | " + plugin + " | " + pid)
        try {
            const response = await handleSubmitProcessInfo(filePath, operatingSystem, plugin, pid);
            return response.data;
        } catch (error) {
            console.error('Error sending file info to backend:', error);
            throw new Error('Failed to send file info to backend');
        }
    });

    ipcMain.handle('get-plugin-list', async (event, os) => {
        try{
            const response = await handleGetPlugins(os);
            return response.data.plugins;
        } catch (error){
            console.error('Error getting plugins from backend.', error);
        }
    })

    ipcMain.handle('get-all-plugins', async (event) => {
        try{
            const response = await handleGetAllPlugins();
            return response.data.plugins;
        } catch (error){
            console.error('Error getting all plugins from backend.', error);
        }
    })

    ipcMain.handle('show-dialog', async (event, options) => {
        const response = await dialog.showMessageBox(options);
        return response.response;
    });

    createWindow();
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('quit', () => {
    if (appProcess) {
        appProcess.kill();
    }
});

