"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
exports.app = {
    openActiveWindow: (app, BrowserWindow, cb) => {
        app.on("activate", () => {
            //if (BrowserWindow.getAllWindow().length === 0) cb();
        });
    },
};
