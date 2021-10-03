"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const init = async (...modules) => {
    await Promise.all(modules.map((module) => module.init().catch((err) => {
        throw err;
    }))).catch((err) => {
        console.error(`[ERROR] An error occured when loading ${module.constructor.name} could not be loaded:\n${err}`);
    });
};
exports.init = init;
