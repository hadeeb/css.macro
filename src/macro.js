//@ts-check
const { createMacro } = require("babel-plugin-macros");

const CSSMacro = require("./css.macro");
const globalCSSMacro = require("./global.macro");

module.exports = createMacro(Macro);

/**
 * @param {import("babel-plugin-macros").MacroParams} args
 */
function Macro(args) {
  CSSMacro(args);
  globalCSSMacro(args);
}
