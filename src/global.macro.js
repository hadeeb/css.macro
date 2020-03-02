//@ts-check
const { addSideEffect } = require("@babel/helper-module-imports");
const path = require("path");

const { getCSS, processCSS, toHash, writeCSS } = require("./common");

const { cssDir, importPath } = require("./vars");

module.exports = globalCSSMacro;

/**
 * @param {import("babel-plugin-macros").MacroParams} param0
 * @param {{ emitCSS: boolean }} config
 */
function globalCSSMacro({ references, babel, state }, config) {
  const t = babel.types;
  /**
   * @type {import("@babel/types").Program}
   */
  const program = state.file.path;

  const globalRefs = references.injectGlobal;

  if (globalRefs) {
    globalRefs.forEach(ref => {
      let CSS = getCSS(t, ref.parent);

      CSS = processCSS(CSS);

      const fileName = toHash(CSS) + ".css";

      if (config.emitCSS) {
        // This flag is to disable writing to file during tests
        writeCSS(cssDir, fileName, CSS);
      }

      addSideEffect(program, path.join(importPath, fileName));

      ref.parentPath.remove();
    });
  }
}
