const SHEET_ID = require("./id");

let sheetElement = document.querySelector("#" + SHEET_ID);
if (!sheetElement) {
  sheetElement = document.head.appendChild(document.createElement("style"));
  sheetElement.innerHTML = " ";
  sheetElement.id = SHEET_ID;
}

const sheet = {
  /**
   * @type {CharacterData}
   */
  sheet: sheetElement.firstChild
};

function getSheet() {
  return sheet;
}

module.exports.getSheet = getSheet;
