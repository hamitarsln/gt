import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import {
  GT_IMPORT_SOURCES,
  GT_OTHER_FUNCTIONS,
} from '../../utils/constants/gt/constants';

/**
 * Inject `import { t } from 'gt-react'` as the first statement in the program.
 */
export function injectMacroImport(
  path: NodePath<t.Program>,
  importSource: 'gt-react' | 'gt-react/browser' = GT_IMPORT_SOURCES.GT_REACT
): void {
  const tName = GT_OTHER_FUNCTIONS.t;

  const importDecl = t.importDeclaration(
    [t.importSpecifier(t.identifier(tName), t.identifier(tName))],
    t.stringLiteral(importSource)
  );

  path.unshiftContainer('body', importDecl);
}
