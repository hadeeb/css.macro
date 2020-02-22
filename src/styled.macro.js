//@ts-check
const { MacroError } = require("babel-plugin-macros");
const { addNamespace } = require("@babel/helper-module-imports");

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
    const styledFn = addNamespace(program, pkgName + "/runtime/styled", {
      nameHint: "styled"
    });

    StyledRefs.forEach(ref => {
      /**
       * @type {import("@babel/types").CallExpression}
       */
      let Caller;
      if (t.isMemberExpression(ref.parent)) {
        let elementName = ref.parent.property.name;

        // Custom elements
        if (/[A-Z]/.test(elementName)) {
          elementName = elementName.replace(/[A-Z]/g, "-$&").toLowerCase();
        }

        // replace styled.* with styled("*")
        Caller = t.callExpression(t.identifier(styledFn.name), [
          t.stringLiteral(elementName)
        ]);
      } else if (t.isCallExpression(ref.parent)) {
        if (ref.parent.arguments.length !== 1) {
          throw new MacroError(
            "styled function should be called with exactly one argument"
          );
        }
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
      CSS = processCSS("." + className + "{" + CSS + "}");

      Caller.arguments.push(t.stringLiteral(className), t.stringLiteral(CSS));
      annotateAsPure(Caller);

      ref.parentPath.parentPath.replaceWith(Caller);
    });
  }
}
