import { createRequire } from 'module';
const require = createRequire(import.meta.url);
export function loadPlugin(pluginPath) {
    try {
        return require(pluginPath);
    }
    catch (error) {
        console.error(`Failed to load plugin: ${pluginPath}`);
        console.error(error);
        throw error;
    }
}
//# sourceMappingURL=load-plugin.js.map