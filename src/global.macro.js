//@ts-check
const { addSideEffect, addNamespace } = require("@babel/helper-module-imports");
const path = require("path");

const { getCSS, processCSS, toHash, writeCSS } = require("./common");

const { cssDir, importPath, pkgName } = require("./vars");

module.exports = globalCSSMacro;

/**
 * @param {import("babel-plugin-macros").MacroParams} param0
 * @param {{ emitCSS: boolean,useRuntime:boolean }} config
 */
function globalCSSMacro({ references, babel, state }, config) {
  const t = babel.types;
  /**
   * @type {import("@babel/types").Program}
   */
  const program = state.file.path;

  const globalRefs = references.injectGlobal;

  if (globalRefs) {
    let cssFn;

    if (config.useRuntime) {
      cssFn = addNamespace(program, pkgName + "/runtime/css", {
        nameHint: "css"
      });
    }
    globalRefs.forEach(ref => {
      let CSS = getCSS(t, ref.parent);

      CSS = processCSS(CSS);

      if (config.useRuntime) {
        const replacement = t.callExpression(t.identifier(cssFn.name), [
          t.stringLiteral(CSS)
        ]);

        ref.parentPath.replaceWith(replacement);
      } else {
        const fileName = toHash(CSS) + ".css";

        if (config.emitCSS) {
          // This flag is to disable writing to file during tests
          writeCSS(cssDir, fileName, CSS);
        }

        addSideEffect(program, path.join(importPath, fileName));

        ref.parentPath.remove();
      }
    });
  }
}
