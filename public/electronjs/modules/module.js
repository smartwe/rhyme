"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
class Module {
    constructor(dirname) {
        this.loaded = false;
        this.dirname = dirname;
        this.platforms = ["win32", "linux", "darwin"];
    }
    // To not be overriden
    async init() {
        if (this.loaded)
            throw new TypeError(`Module ${this.constructor.name} is already loaded`);
        if (this.platforms.includes(os_1.default.platform())) {
            await this.load().catch((err) => {
                throw err;
            });
            this.loaded = true;
        }
        else {
            console.info(`[INFO] Skipping load of ${this.constructor.name}`);
        }
    }
    // Can (now) be an asynchronous method
    async load() {
        throw new TypeError(`Module ${this.constructor.name} should have a load() method`);
        // Do whatever you want here :)
    }
}
exports.default = Module;
