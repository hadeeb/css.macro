//@ts-check
const { addSideEffect, addNamespace } = require("@babel/helper-module-imports");
const path = require("path");

const { getCSS, processCSS, toHash, writeCSS } = require("./common");

const { cssDir, importPath, pkgName } = require("./vars");

module.exports = cssMacro;

/**
 * @param {import("babel-plugin-macros").MacroParams} param0
 * @param {{ emitCSS: boolean,useRuntime:boolean }} config
 */
function cssMacro({ references, babel, state }, config) {
  const t = babel.types;
  /**
   * @type {import("@babel/types").Program}
   */
  const program = state.file.path;

  const CSSRefs = references.css;

  if (CSSRefs) {
    let cssFn;

    if (config.useRuntime) {
      cssFn = addNamespace(program, pkgName + "/runtime/css", {
        nameHint: "css"
      });
    }

    CSSRefs.forEach(ref => {
      let CSS = getCSS(t, ref.parent);

      const className = toHash(CSS);
      CSS = processCSS("." + className + "{" + CSS + "}");

      let replacement;
      if (config.useRuntime) {
        replacement = t.sequenceExpression([
          t.callExpression(t.identifier(cssFn.name), [t.stringLiteral(CSS)]),
          t.stringLiteral(className)
        ]);
      } else {
        const fileName = className + ".css";

        if (config.emitCSS) {
          // This flag is to disable writing to file during tests
          writeCSS(cssDir, fileName, CSS);
        }

        addSideEffect(program, path.join(importPath, fileName));

        replacement = t.stringLiteral(className);
      }

      ref.parentPath.replaceWith(replacement);
    });
  }
}
