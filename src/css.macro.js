//@ts-check
const { addNamespace } = require("@babel/helper-module-imports");

const { getCSS, processCSS, toHash } = require("./common");

// @ts-ignore
const pkgName = require("../package.json").name;

module.exports = cssMacro;

/**
 * @param {import("babel-plugin-macros").MacroParams} param0
 */
function cssMacro({ references, babel, state }) {
  const t = babel.types;
  /**
   * @type {import("@babel/types").Program}
   */
  const program = state.file.path;

  const CSSRefs = references.css;
  if (CSSRefs) {
    const cssFn = addNamespace(program, pkgName + "/runtime/css", {
      nameHint: "css"
    });

    CSSRefs.forEach(ref => {
      let CSS = getCSS(t, ref.parent);

      const className = toHash(CSS);
      CSS = processCSS("." + className + "{" + CSS + "}");

      const replacement = t.sequenceExpression([
        t.callExpression(t.identifier(cssFn.name), [t.stringLiteral(CSS)]),
        t.stringLiteral(className)
      ]);

      ref.parentPath.replaceWith(replacement);
    });
  }
}
