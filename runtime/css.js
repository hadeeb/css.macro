var getSheet = require("./sheet");
/**
 * @param {string} rule
 */
function css(rule) {
  const sheet = getSheet();
  if (sheet.data.indexOf(rule) < 0) {
    sheet.appendData(rule);
  }
}

module.exports = css;
