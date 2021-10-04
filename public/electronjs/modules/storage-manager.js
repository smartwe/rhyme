"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Store = require("electron-store");
const store = new Store();
const module_1 = __importDefault(require("./module"));
const electron_1 = require("electron");
class StorageManagerModule extends module_1.default {
    constructor(dirname) {
        super(dirname);
    }
    async load() {
        this.setDataToStore("settings", {
            musicPath: electron_1.app.getPath("music"),
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
