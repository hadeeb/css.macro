const path = require("path");

/**
 * @type {string}
 */
// @ts-ignore
const pkgName = require("../package.json").name;

const cssDirName = "css";

const importPath = path.join(pkgName, cssDirName);

const cssDir = path.join(__dirname, "..", cssDirName);

module.exports = {
  pkgName,
  cssDir,
  importPath
};
