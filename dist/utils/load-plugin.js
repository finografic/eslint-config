"use strict";
/// <reference types="node" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPlugin = loadPlugin;
const node_module_1 = require("node:module");
// Rename the variable to avoid conflict with Node's global require
const customRequire = (0, node_module_1.createRequire)(__filename);
function loadPlugin(pluginPath) {
    try {
        return customRequire(pluginPath);
    }
    catch (error) {
        console.error(`Failed to load plugin: ${pluginPath}`);
        console.error(error);
        throw error;
    }
}
//# sourceMappingURL=load-plugin.js.map