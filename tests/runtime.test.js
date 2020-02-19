const { createElement } = require("react");
const TestRenderer = require("react-test-renderer");

const { css } = require("../runtime/css");
const { styled } = require("../runtime/styled");
const { extractCSS, styleID } = require("../server");
const { getSheet } = require("../runtime/sheet");

describe("CSS", () => {
  afterEach(() => {
    const { reset } = getSheet();
    reset();
  });

  it("returns className", () => {
    const className = "QWERTY";
    expect(css(className, "")).toEqual(className);
  });

  it("adds CSS rules to sheet", () => {
    const { sheet } = getSheet();
    const CSSRule = "css Rule string";
    css("rule", CSSRule);
    expect(sheet.data).toContain(CSSRule);
  });

  it("add a rule only once", () => {
    const { sheet } = getSheet();
    const CSSRule = ".className{rule}";
    css("className", CSSRule);

    const sheetLength = sheet.data.length;
    css("rule", CSSRule);

    expect(sheet.data.length).toEqual(sheetLength);
  });
});

describe("Styled", () => {
  it("is a function component", () => {
    const styledComp = styled("a")("", "");
    expect(styledComp).toBeInstanceOf(Function);
    expect(styledComp.length).toEqual(1);
  });

  it("renders intrinsic elements", () => {
    const className = "class";
    const styledComp = styled("a")(className, "");
    const styledEl = TestRenderer.create(createElement(styledComp));
    const unstyledEl = TestRenderer.create(createElement("a", { className }));
    expect(styledEl.toJSON()).toEqual(unstyledEl.toJSON());
  });

  it("renders components", () => {
    function Comp({ className }) {
      return createElement("div", { className }, "child");
    }
    const className = "class";
    const styledComp = styled(Comp)(className, "");
    const styledEl = TestRenderer.create(createElement(styledComp));
    const unstyledEl = TestRenderer.create(createElement(Comp, { className }));
    expect(styledEl.toJSON()).toEqual(unstyledEl.toJSON());
  });

  it("appends generated className to className prop", () => {
    const generatedClass = "css-class";
    const inputClass = "text-blue";
    const styledComp = styled("a")(generatedClass, "");
    const styledEl = TestRenderer.create(
      createElement(styledComp, { className: inputClass })
    );

    expect(styledEl.toJSON().props.className).toEqual(
      inputClass + " " + generatedClass
    );
  });
});

describe("extractCSS", () => {
  afterEach(() => {
    const { reset } = getSheet();
    reset();
  });

  it("returns all CSS rules", () => {
    const rule1 = "rule1";
    const rule2 = "rule2";
    css(rule1, rule1);
    css(rule2, rule2);
    const styles = extractCSS();
    expect(styles).toContain(rule1);
    expect(styles).toContain(rule2);
  });

  it("resets style cache", () => {
    const rule1 = "rule1";
    const rule2 = "rule2";
    css(rule1, rule1);
    css(rule2, rule2);
    extractCSS();

    const { sheet } = getSheet();
    expect(sheet.data).not.toContain(rule1);
    expect(sheet.data).not.toContain(rule2);
  });
});

describe("styleID", () => {
  it("is a string", () => {
    expect(typeof styleID).toEqual("string");
  });
});
