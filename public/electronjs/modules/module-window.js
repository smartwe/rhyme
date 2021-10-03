"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = __importDefault(require("./module"));
class ModuleWindow extends module_1.default {
    constructor(dirname, window) {
        super(dirname);
        this.window = window;
    }
    getWindow() {
        return this.window;
    }
}
exports.default = ModuleWindow;
