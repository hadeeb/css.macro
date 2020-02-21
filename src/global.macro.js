//@ts-check
const { addNamespace } = require("@babel/helper-module-imports");

const { getCSS, processCSS } = require("./common");

// @ts-ignore
const pkgName = require("../package.json").name;

module.exports = globalCSSMacro;

/**
 * @param {import("babel-plugin-macros").MacroParams} param0
 */
function globalCSSMacro({ references, babel, state }) {
  const t = babel.types;
  /**
   * @type {import("@babel/types").Program}
   */
  const program = state.file.path;

  const globalRefs = references.injectGlobal;

  if (globalRefs) {
    const cssFn = addNamespace(program, pkgName + "/runtime/css", {
      nameHint: "css"
    });

    globalRefs.forEach(ref => {
      let CSS = getCSS(t, ref.parent);

      CSS = processCSS(CSS);

      const replacement = t.callExpression(t.identifier(cssFn.name), [
        t.stringLiteral(CSS)
      ]);
      ref.parentPath.replaceWith(replacement);
    });
  }
}
