var getSheet = require("./sheet");
/**
 * @param {string} className
 * @param {string} rule
 */
function css(className, rule) {
  const sheet = getSheet();
  if (sheet.data.indexOf(className) < 0) {
    sheet.appendData(rule);
  }
  return className;
}

module.exports = css;
