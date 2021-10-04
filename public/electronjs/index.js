"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const electron_store_1 = __importDefault(require("electron-store"));
electron_store_1.default.initRenderer();
__dirname = electron_1.app.getAppPath();
const ModulesManager = __importStar(require("./modules-manager"));
const global_shortcuts_1 = __importDefault(require("./modules/global-shortcuts"));
const storage_manager_1 = __importDefault(require("./modules/storage-manager"));
const tray_1 = __importDefault(require("./modules/tray"));
const isDev = !electron_1.app.isPackaged;
const htmlFile = path_1.default.join(__dirname, "public", "index.html");
if (isDev) {
    require("electron-reload")(path_1.default.join(__dirname, "public"));
}
let win;
const gotTheLock = electron_1.app.requestSingleInstanceLock();
if (!gotTheLock) {
    electron_1.app.quit();
    console.error("Rhyme is already running");
    process.exit(0);
}
electron_1.app.on("ready", () => {
    win = new electron_1.BrowserWindow({
        icon: path_1.default.join(__dirname, "icon.png"),
        title: "Rhyme",
        width: 900,
        height: 600,
        minWidth: 800,
        minHeight: 400,
        webPreferences: {
            webSecurity: true,
            contextIsolation: false,
            nodeIntegration: true,
            autoplayPolicy: "no-user-gesture-required",
        },
    });
    electron_1.ipcMain.on("notification", (_event, body) => {
        new electron_1.Notification({ title: "Rhyme", body }).show();
    });
    electron_1.ipcMain.handle("show-dialog", async (event, config) => {
        let data = await electron_1.dialog.showOpenDialog(win, {
            properties: [config.dialogType],
            title: config.title,
            defaultPath: config.defaultPath,
        });
        return data.filePaths[0];
    });
    win.loadFile(htmlFile);
    if (isDev) {
        win.setMenu(electron_1.Menu.buildFromTemplate([
            {
                label: "Toggle Dev Tools",
                click() {
                    win.webContents.toggleDevTools();
                },
            },
            {
                label: "Force Reload",
                click() {
                    win.loadFile(htmlFile);
                },
            },
        ]));
    }
    else {
        win.setMenu(null);
    }
    ModulesManager.init(new global_shortcuts_1.default(__dirname, win), new tray_1.default(__dirname, win), new storage_manager_1.default(__dirname)).catch((error) => {
        if (error)
            throw error;
    });
});
electron_1.app.on("second-instance", (_event, _commandLine, _workingDirectory) => {
    // Un-hide window
    win.show();
});
