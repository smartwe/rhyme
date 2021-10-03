"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const module_window_1 = __importDefault(require("./module-window"));
class GlobalShortcutsModule extends module_window_1.default {
    async load() {
        electron_1.globalShortcut.register("MediaPlayPause", () => {
            this.window.webContents.send("play/pause");
        });
        electron_1.globalShortcut.register("MediaPreviousTrack", () => {
            this.window.webContents.send("previous");
        });
        electron_1.globalShortcut.register("MediaNextTrack", () => {
            this.window.webContents.send("next");
        });
    }
}
exports.default = GlobalShortcutsModule;
