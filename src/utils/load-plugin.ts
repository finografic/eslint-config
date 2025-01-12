/// <reference types="node" />

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export function loadPlugin(pluginPath: string) {
  try {
    return require(pluginPath);
  } catch (error) {
    console.error(`Failed to load plugin: ${pluginPath}`);
    console.error(error);
    throw error;
  }
}
