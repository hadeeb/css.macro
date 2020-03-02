const css = require("../runtime/css");
const { extractCSS, styleID } = require("../server");
const getSheet = require("../runtime/sheet");

describe("CSS", () => {
  afterEach(() => {
    const sheet = getSheet();
    sheet.reset();
  });

  it("add CSS rules to sheet", () => {
    const sheet = getSheet();
    const CSSRule = "css Rule string";
    css(CSSRule);
    expect(sheet.data).toContain(CSSRule);
  });

  it("add a rule only once", () => {
    const sheet = getSheet();
    const CSSRule = ".className{rule}";
    css(CSSRule);

    const sheetLength = sheet.data.length;
    css(CSSRule);

    expect(sheet.data.length).toEqual(sheetLength);
  });
});

describe("extractCSS", () => {
  afterEach(() => {
    const sheet = getSheet();
    sheet.reset();
  });

  it("returns all CSS rules", () => {
    const rule1 = "rule1";
    const rule2 = "rule2";
    css(rule1);
    css(rule2);
    const styles = extractCSS();
    expect(styles).toContain(rule1);
    expect(styles).toContain(rule2);
  });

  it("resets style cache", () => {
    const rule1 = "rule1";
    const rule2 = "rule2";
    css(rule1);
    css(rule2);
    extractCSS();

    const sheet = getSheet();
    expect(sheet.data).not.toContain(rule1);
    expect(sheet.data).not.toContain(rule2);
  });
});

describe("styleID", () => {
  it("is a string", () => {
    expect(typeof styleID).toEqual("string");
  });
});
