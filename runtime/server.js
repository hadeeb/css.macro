const getSheet = require("./sheet").getSheet;

function extractCSS() {
  const { sheet, reset } = getSheet();
  const css = sheet.data;
  reset();
  return css;
}

module.exports.extractCSS = extractCSS;
module.exports.styleID = require("./id");
