"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const module_window_1 = __importDefault(require("./module-window"));
class TrayModule extends module_window_1.default {
    async load() {
        const tray = new electron_1.Tray(path_1.default.join(this.dirname, "icon" + (process.platform === "win32" ? ".ico" : ".png")));
        console.log(this.dirname);
        const contextMenu = electron_1.Menu.buildFromTemplate(this.getTrayItems());
        tray.setToolTip("Rhyme");
        tray.setContextMenu(contextMenu);
    }
    getTrayItems() {
        const self = this;
        return [
            {
                label: "Previous",
                click() {
                    self.window.webContents.send("previous");
                },
            },
            {
                label: "PlayOrPause",
                click() {
                    self.window.webContents.send("play/pause");
                },
            },
            {
                label: "Next",
                click() {
                    self.window.webContents.send("next");
                },
            },
            {
                label: "Show",
                click() {
                    self.window.show();
                },
            },
            {
                label: "Hide",
                click() {
                    self.window.hide();
                },
            },
            {
                label: "Quit",
                click() { },
            },
        ];
    }
}
exports.default = TrayModule;
