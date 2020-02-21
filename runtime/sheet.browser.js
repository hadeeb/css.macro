var SHEET_ID = "_css";

var sheetElement = document.querySelector("#" + SHEET_ID);
if (!sheetElement) {
  sheetElement = document.head.appendChild(document.createElement("style"));
  sheetElement.innerHTML = " ";
  sheetElement.id = SHEET_ID;
}
/**
 * @type {CharacterData}
 */
var sheet = sheetElement.firstChild;

function getSheet() {
  return sheet;
}

module.exports = getSheet;
