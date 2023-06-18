export const app = {
	openActiveWindow: (app: Electron.App, BrowserWindow: Electron.BrowserWindow, cb: CallableFunction) => {
		app.on("activate", () => {
			//if (BrowserWindow.getAllWindow().length === 0) cb();
		});
	},
};
