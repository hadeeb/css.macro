//@ts-check
const { MacroError } = require("babel-plugin-macros");
const { addNamed } = require("@babel/helper-module-imports");

const annotateAsPure = require("@babel/helper-annotate-as-pure").default;

const { getCSS, processCSS, toHash } = require("./common");

// @ts-ignore
const pkgName = require("../package.json").name;

module.exports = styledMacro;

/**
 * @param {import("babel-plugin-macros").MacroParams} param0
 */
function styledMacro({ references, babel, state }) {
  const t = babel.types;
  /**
   * @type {import("@babel/types").Program}
   */
  const program = state.file.path;

  const StyledRefs = references.styled;
  if (StyledRefs) {
    const styledFn = addNamed(program, "styled", pkgName + "/runtime/styled");

    StyledRefs.forEach(ref => {
      /**
       * @type {import("@babel/types").CallExpression}
       */
      let Caller;
      if (t.isMemberExpression(ref.parent)) {
        const { parentPath, parent } = ref;
        let elementName = parent.property.name;

        // Custom elements
        if (/[A-Z]/.test(elementName)) {
          elementName = elementName.replace(/[A-Z]/g, "-$&").toLowerCase();
        }

        // replace styled.* with styled("*")
        Caller = t.callExpression(t.identifier(styledFn.name), [
          t.stringLiteral(elementName)
        ]);
        parentPath.replaceWith(Caller);
      } else if (t.isCallExpression(ref.parent)) {
        Caller = t.callExpression(
          t.identifier(styledFn.name),
          ref.parent.arguments
        );
      } else {
        throw new MacroError("Invalid expression");
      }

      let parent = ref.parentPath.parent;

      let CSS = getCSS(t, parent);
      const className = toHash(CSS);
      CSS = processCSS(CSS, className);

      const replacement = t.callExpression(Caller, [
        t.stringLiteral(className),
        t.stringLiteral(CSS)
      ]);
      annotateAsPure(replacement);

      ref.parentPath.parentPath.replaceWith(replacement);
    });
  }
}
