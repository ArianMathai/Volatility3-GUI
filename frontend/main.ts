import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";
import { spawn } from "child_process";
import {ChildProcess} from "node:child_process";

let pythonProcess: ChildProcess;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../dist/index.html"),
      protocol: "file:",
      slashes: true,
    });
  mainWindow.loadURL(startUrl);
}

app.whenReady().then(() => {
  console.log("Starting Python script...");
  pythonProcess = spawn('python3', [path.join(__dirname, '../../backend/app.py')]);

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
  if (pythonProcess) {
    pythonProcess.kill();
  }
});
