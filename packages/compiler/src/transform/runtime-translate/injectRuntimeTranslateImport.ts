import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import {
  GT_IMPORT_SOURCES,
  GT_OTHER_FUNCTIONS,
} from '../../utils/constants/gt/constants';

/**
 * Inject runtime translate import with only the specifiers needed.
 * `import { GtInternalRuntimeTranslateString, GtInternalRuntimeTranslateJsx } from 'gt-react'`
 */
export function injectRuntimeTranslateImport(
  path: NodePath<t.Program>,
  {
    needsString,
    needsJsx,
    importSource = GT_IMPORT_SOURCES.GT_REACT,
  }: {
    needsString: boolean;
    needsJsx: boolean;
    importSource?: 'gt-react' | 'gt-react/browser';
  }
): NodePath<t.ImportDeclaration> | null {
  const specifiers: t.ImportSpecifier[] = [];

  if (needsString) {
    const name = GT_OTHER_FUNCTIONS.GtInternalRuntimeTranslateString;
    specifiers.push(t.importSpecifier(t.identifier(name), t.identifier(name)));
  }

  if (needsJsx) {
    const name = GT_OTHER_FUNCTIONS.GtInternalRuntimeTranslateJsx;
    specifiers.push(t.importSpecifier(t.identifier(name), t.identifier(name)));
  }

  if (specifiers.length === 0) return null;

  const importDecl = t.importDeclaration(
    specifiers,
    t.stringLiteral(importSource)
  );

  const [inserted] = path.unshiftContainer('body', importDecl);
  return inserted as NodePath<t.ImportDeclaration>;
}
