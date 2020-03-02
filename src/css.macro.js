//@ts-check
const { addSideEffect } = require("@babel/helper-module-imports");
const path = require("path");

const { getCSS, processCSS, toHash, writeCSS } = require("./common");

const { cssDir, importPath } = require("./vars");

module.exports = cssMacro;

/**
 * @param {import("babel-plugin-macros").MacroParams} param0
 * @param {{ emitCSS: boolean }} config
 */
function cssMacro({ references, babel, state }, config) {
  const t = babel.types;
  /**
   * @type {import("@babel/types").Program}
   */
  const program = state.file.path;

  const CSSRefs = references.css;

  if (CSSRefs) {
    CSSRefs.forEach(ref => {
      let CSS = getCSS(t, ref.parent);

      const className = toHash(CSS);
      CSS = processCSS("." + className + "{" + CSS + "}");

      const fileName = className + ".css";

      if (config.emitCSS) {
        // This flag is to disable writing to file during tests
        writeCSS(cssDir, fileName, CSS);
      }

      addSideEffect(program, path.join(importPath, fileName));

      const replacement = t.stringLiteral(className);

      ref.parentPath.replaceWith(replacement);
    });
  }
}
