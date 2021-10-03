"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Store = require("electron-store");
const store = new Store();
const module_window_1 = __importDefault(require("./module-window"));
class StorageManagerModule extends module_window_1.default {
    constructor(dirname, win, app) {
        super(dirname, win);
        this.app = app;
    }
    async load() {
        this.setDataToStore("settings", {
            musicPath: this.app.getPath("music"),
            heyRhymeActivate: false,
            showNotifications: true,
            minimizeToTray: false,
        });
        this.setDataToStore("theme-manager", {
            currentTheme: "default-dark",
            installedThemes: [
                {
                    id: "default-dark",
                    name: "Default dark",
                    author: "Rhyme Designers",
                    accentColor: "#ea3548",
                    sidebarActiveColor: "#fff",
                    panelsColor: "#121212",
                    textColor: "#bbbbbb",
                    titleColor: "#fff",
                    backgroundColor: "#000",
                },
                {
                    id: "default-light",
                    name: "Default light",
                    author: "Rhyme Designers",
                    accentColor: "#ea3548",
                    sidebarActiveColor: "#fff",
                    panelsColor: "#e0e0e0",
                    textColor: "#5c5c5c",
                    titleColor: "#000",
                    backgroundColor: "#fff",
                },
            ],
        });
    }
    setDataToStore(id, data) {
        if (store.has(id))
            return;
        store.set(id, data);
    }
}
exports.default = StorageManagerModule;
