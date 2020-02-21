var SHEET_ID = "_css";

var isServer = typeof window === "undefined";

/**
 * https://github.com/cristianbote/goober/blob/ffd974336cb3dd3322612e095e316aa85cafe42f/src/core/get-sheet.js
 * @returns {CharacterData}
 */
function getSheetElement() {
  if (isServer) {
    return {
      data: "",
      appendData: function(rule) {
        this.data += rule;
      }
    };
  }
  var sheet = document.querySelector("#" + SHEET_ID);
  if (!sheet) {
    // Note to self: head.innerHTML +=, triggers a layout/reflow. Avoid it.
    sheet = document.head.appendChild(document.createElement("style"));
    sheet.innerHTML = " ";
    sheet.id = SHEET_ID;
  }
  return sheet.firstChild;
}

var getSheet = (function() {
  /**
   * @type {CharacterData}
   */
  var sheet;
  function reset() {
    sheet = null;
  }
  return function() {
    if (!sheet) {
      sheet = getSheetElement();
      sheet.reset = reset;
    }
    return sheet;
  };
})();

module.exports = getSheet;
