/**
 * @ MAIN PROCESS SCRIPT
 * Ce fichier représente le processus principale de l'application
 */
import electron, { ipcMain } from "electron";
import { join } from "path";

const datas = require("../data/documents.json");
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

function createWindow() {
	const mainWindow = new BrowserWindow({
		height: 600,
		width: 800,
		titleBarStyle: "hidden",
		trafficLightPosition: { x: 16, y: 18 },
		webPreferences: {
			preload: join(__dirname, "preload/preload.js"),
		},
	});

	mainWindow.loadFile("../renderer/dist/index.html");
	mainWindow.webContents.openDevTools();
}

function dataHandler(event: Electron.IpcMainInvokeEvent, type: string) {
	return datas[type];
}

app.whenReady().then(() => {
	createWindow();

	ipcMain.handle("get-datas", dataHandler);
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});
