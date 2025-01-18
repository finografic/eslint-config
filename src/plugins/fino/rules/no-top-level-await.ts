import type { TSESTree } from '@typescript-eslint/utils';
import { createEslintRule } from '../utils';

export const RULE_NAME = 'no-top-level-await';
export type MessageIds = 'NoTopLevelAwait';
export type Options = [];

export default createEslintRule<Options, MessageIds>({
  create: (context) => {
    return {
      AwaitExpression: (node) => {
        let parent: TSESTree.Node | undefined = node.parent;
        while (parent) {
          if (parent.type === 'FunctionDeclaration' || parent.type === 'FunctionExpression' || parent.type === 'ArrowFunctionExpression') {
            return;
          }
          parent = parent.parent;
        }
        context.report({
          messageId: 'NoTopLevelAwait',
          node,
        });
      },
    };
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: 'Prevent using top-level await',
    },
    messages: {
      NoTopLevelAwait: 'Do not use top-level await',
    },
    schema: [],
    type: 'problem',
  },
  name: RULE_NAME,
});
