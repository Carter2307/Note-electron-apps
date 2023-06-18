const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("documentDatas", {
	getDatas: (type: string) => {
		return ipcRenderer.invoke("get-datas", type);
	},
});
