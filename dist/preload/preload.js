"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("documentDatas", {
    getDatas: (type) => {
        return ipcRenderer.invoke("get-datas", type);
    },
});
