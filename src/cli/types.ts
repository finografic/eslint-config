export interface PromItem<T> {
  label: string;
  value: T;
  hint?: string;
}

export type FrameworkOption = 'react' | 'slidev';

export type ExtraLibrariesOption = 'formatter' | 'unocss';

export interface PromptResult {
  uncommittedConfirmed: boolean;
  frameworks: FrameworkOption[];
  extra: ExtraLibrariesOption[];
  updateVscodeSettings: unknown;
}
