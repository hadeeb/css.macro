var getSheet = require("./sheet");

function extractCSS() {
  var sheet = getSheet();
  var css = sheet.data;
  sheet.reset();
  return css;
}

module.exports.extractCSS = extractCSS;
module.exports.styleID = "_css";
