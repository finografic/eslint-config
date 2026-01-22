// src/constants/globs.constants.ts

/**
 * Note on naming:
 * - `GLOB_*` are raw glob patterns (string or array).
 * - `DEFAULT_*` are "recommended defaults" used by layers/helpers.
 */

/*
 * ─────────────────────────────────────────────────────────────
 * Core source globs
 * ─────────────────────────────────────────────────────────────
 */

export const GLOB_SRC_EXT = '?([cm])[jt]s?(x)';
export const GLOB_SRC = '**/*.?([cm])[jt]s?(x)';

export const GLOB_JS = '**/*.?([cm])js';
export const GLOB_JSX = '**/*.?([cm])jsx';

export const GLOB_TS = '**/*.?([cm])ts';
export const GLOB_TSX = '**/*.?([cm])tsx';

/*
 * ─────────────────────────────────────────────────────────────
 * Styles
 * ─────────────────────────────────────────────────────────────
 */

export const GLOB_STYLE = '**/*.{c,le,sc}ss';
export const GLOB_CSS = '**/*.css';
export const GLOB_POSTCSS = '**/*.{p,post}css';
export const GLOB_LESS = '**/*.less';
export const GLOB_SCSS = '**/*.scss';

/*
 * ─────────────────────────────────────────────────────────────
 * Data / documents
 * ─────────────────────────────────────────────────────────────
 */

export const GLOB_JSON = '**/*.json';
export const GLOB_JSON5 = '**/*.json5';
export const GLOB_JSONC = '**/*.jsonc';

export const GLOB_MARKDOWN = '**/*.md';

/**
 * Rare edge case: nested markdown files living inside a `.md/` folder.
 * Keep only if you have real usage for this.
 */
export const GLOB_MARKDOWN_IN_MARKDOWN = '**/*.md/*.md';

export const GLOB_YAML = '**/*.y?(a)ml';
export const GLOB_TOML = '**/*.toml';
export const GLOB_XML = '**/*.xml';
export const GLOB_SVG = '**/*.svg';
export const GLOB_HTML = '**/*.htm?(l)';
export const GLOB_GRAPHQL = '**/*.{g,graph}ql';

export const GLOB_MARKDOWN_CODE = `${GLOB_MARKDOWN}/${GLOB_SRC}`;

/*
 * ─────────────────────────────────────────────────────────────
 * Tests / tooling
 * ─────────────────────────────────────────────────────────────
 */

export const GLOB_TESTS = [
  `**/__tests__/**/*.${GLOB_SRC_EXT}`,
  `**/*.spec.${GLOB_SRC_EXT}`,
  `**/*.test.${GLOB_SRC_EXT}`,
  `**/*.bench.${GLOB_SRC_EXT}`,
  `**/*.benchmark.${GLOB_SRC_EXT}`,
];

export const GLOB_ALL_SRC = [
  GLOB_SRC,
  GLOB_STYLE,
  GLOB_JSON,
  GLOB_JSON5,
  GLOB_MARKDOWN,
  GLOB_YAML,
  GLOB_XML,
  GLOB_HTML,
];

export const GLOB_ESLINT_FILES = ['**/eslint.config.{js,mjs,cjs,ts}'];
export const GLOB_VITE_FILES = ['vite.config.*', 'vite.config-debug.*'];

/*
 * ─────────────────────────────────────────────────────────────
 * Excludes
 * ─────────────────────────────────────────────────────────────
 */

export const GLOB_EXCLUDE = [
  '**/node_modules',
  '**/dist',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',
  '**/output',
  '**/coverage',
  '**/temp',
  '**/.temp',
  '**/tmp',
  '**/.tmp',
  '**/.history',
  '**/.vitepress/cache',
  '**/.nuxt',
  '**/.next',
  '**/.vercel',
  '**/.changeset',
  '**/.idea',
  '**/.cache',
  '**/.output',
  '**/.vite-inspect',
  '**/.yarn',
  '**/vite.config.*.timestamp-*',

  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/__snapshots__',
  '**/auto-import?(s).d.ts',
  '**/components.d.ts',
];
