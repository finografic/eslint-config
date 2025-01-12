/// <reference types="node" />

import { createRequire } from "node:module";

// Rename the variable to avoid conflict with Node's global require
const customRequire = createRequire(__filename);

export function loadPlugin(pluginPath: string) {
  try {
    return customRequire(pluginPath);
  } catch (error) {
    console.error(`Failed to load plugin: ${pluginPath}`);
    console.error(error);
    throw error;
  }
}
