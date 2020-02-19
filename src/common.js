//@ts-check
const { MacroError } = require("babel-plugin-macros");

const postCSS = require("postcss");
const postCSSJS = require("postcss-js");
const postcssNested = require("postcss-nested");
const csso = require("postcss-csso");
const autoprefixer = require("autoprefixer");

const processor = postCSS();

/**
 * @param {object} obj
 */
//@ts-ignore
const processJS = obj => processor.process(obj, { parser: postCSSJS });

/**
 * @param {typeof import("@babel/types")} t
 * @param {import("@babel/types").ObjectExpression} arg
 */
function AstToLiteral(t, arg) {
  let obj = {};
  arg.properties.forEach(prop => {
    if (t.isObjectProperty(prop)) {
      const key = getKey(t, prop.key);
      const value = getValue(t, prop.value);
      obj[key] = value;
    } else {
      throw new MacroError("Only inline Object expressions are supported");
    }
  });

  return obj;
}

/**
 * @param {typeof import("@babel/types")} t
 * @param {object} key
 */
function getKey(t, key) {
  if (t.isIdentifier(key)) {
    return key.name;
  } else if (t.isStringLiteral(key)) {
    return key.value;
  }
  throw new MacroError("Invalide type for key " + key.type);
}

/**
 * @param {typeof import("@babel/types")} t
 * @param {object} key
 */
function getValue(t, key) {
  if (t.isStringLiteral(key) || t.isNumericLiteral(key)) {
    return key.value;
  } else if (t.isObjectExpression(key)) {
    let a = AstToLiteral(t, key);
    return a;
  } else {
    throw new MacroError("Invalide type for value " + key.type);
  }
}

/**
 * @param {string} str
 * @returns {string}
 */
function toHash(str) {
  let hash = 0,
    i = 0,
    chr;
  for (; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return "css" + hash.toString(36);
}

/**
 * @param {typeof import("@babel/types")} t
 * @param {import("@babel/types").Node} node
 */
function getCSS(t, node) {
  /**
   * @type {string}
   */
  let CSS;
  if (t.isCallExpression(node)) {
    const arg = node.arguments[0];
    if (t.isObjectExpression(arg)) {
      let obj = AstToLiteral(t, arg);
      CSS = processJS(obj).css;
    } else {
      throw new MacroError("Only inline Object expressions are supported");
    }
  } else if (t.isTaggedTemplateExpression(node)) {
    const arg = node.quasi.quasis;
    if (arg.length > 1) {
      throw new MacroError("Arguments are not supported in tagged templates");
    }
    CSS = arg[0].value.raw;
  } else {
    throw new MacroError("Standalone declarations are not supported");
  }
  return CSS;
}

const CssProcessor = postCSS([postcssNested(), autoprefixer(), csso()]);

/**
 * @param {string} CssString
 * @param {string} className
 */
function processCSS(CssString, className) {
  return CssProcessor.process("." + className + "{" + CssString + "}").css;
}

module.exports = {
  getCSS,
  processCSS,
  toHash
};
