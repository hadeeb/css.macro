//@ts-check
const { createMacro } = require("babel-plugin-macros");

const CSSMacro = require("./css.macro");
const globalCSSMacro = require("./global.macro");

const { pkgName, cssDir } = require("./vars");

const fs = require("fs");
const rimraf = require("rimraf");

if (fs.existsSync(cssDir)) {
  rimraf.sync(cssDir);
}
if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir, { recursive: true });
}

module.exports = createMacro(Macro, { configName: pkgName });

/**
 * @param {import("babel-plugin-macros").MacroParams} args
 */
function Macro(args) {
  const config = Object.assign(
    { emitCSS: true },
    //@ts-ignore
    args.config
  );
  CSSMacro(args, config);
  globalCSSMacro(args, config);
}
