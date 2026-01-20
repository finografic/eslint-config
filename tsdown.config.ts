import { defineConfig } from 'tsdown';

export default defineConfig({
  exports: { legacy: true },
  entry: ['src/cli.ts', 'src/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'esnext',
});
