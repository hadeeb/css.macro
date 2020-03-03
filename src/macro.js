//@ts-check
const { createMacro } = require("babel-plugin-macros");

const CSSMacro = require("./css.macro");
const globalCSSMacro = require("./global.macro");

const { pkgName, cssDir } = require("./vars");

const fs = require("fs-extra");

if (fs.existsSync(cssDir)) {
  fs.emptyDirSync(cssDir);
} else {
  fs.mkdirSync(cssDir, { recursive: true });
}

module.exports = createMacro(Macro, { configName: pkgName });

/**
 * @param {import("babel-plugin-macros").MacroParams} args
 */
function Macro(args) {
  /**
   * @type {{ emitCSS: boolean,useRuntime:boolean }}
   */
  const config = Object.assign(
    { emitCSS: true, useRuntime: process.env.NODE_ENV !== "production" },
    //@ts-ignore
    args.config
  );
  CSSMacro(args, config);
  globalCSSMacro(args, config);
}
