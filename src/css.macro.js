//@ts-check
const { addNamed } = require("@babel/helper-module-imports");

const annotateAsPure = require("@babel/helper-annotate-as-pure").default;

const { getCSS, processCSS, toHash } = require("./common");

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
    const cssFn = addNamed(program, "css", "./lib");

    CSSRefs.forEach(ref => {
      let CSS = getCSS(t, ref.parent);

      const className = toHash(CSS);
      CSS = processCSS(CSS, className);

      const replacement = t.callExpression(t.identifier(cssFn.name), [
        t.stringLiteral(className),
        t.stringLiteral(CSS)
      ]);
      annotateAsPure(replacement);
      ref.parentPath.replaceWith(replacement);
    });
  }
}
