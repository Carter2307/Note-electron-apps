"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @ MAIN PROCESS SCRIPT
 * Ce fichier représente le processus principale de l'application
 */
const electron_1 = __importStar(require("electron"));
const path_1 = require("path");
const datas = require("../data/documents.json");
const BrowserWindow = electron_1.default.BrowserWindow;
const app = electron_1.default.app;
function createWindow() {
    const mainWindow = new BrowserWindow({
        height: 800,
        width: 1200,
        titleBarStyle: "hidden",
        trafficLightPosition: { x: 16, y: 18 },
        webPreferences: {
            preload: (0, path_1.join)(__dirname, "preload/preload.js"),
        },
    });
    mainWindow.loadFile("../renderer/dist/index.html");
    mainWindow.webContents.openDevTools();
}
function dataHandler(event, type) {
    return datas[type];
}
app.whenReady().then(() => {
    createWindow();
    electron_1.ipcMain.handle("get-datas", dataHandler);
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
