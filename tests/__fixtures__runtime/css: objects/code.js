import { css, injectGlobal } from "../../../src/macro";

let class1 = css({
  color: "red"
});

let class2 = css({
  display: "flex",
  div: {
    backgroundColor: "#ff00ef"
  }
});

injectGlobal({
  body: {
    color: "black",
    backgroundColor: "white",
    "&.dark-mode": {
      color: "white",
      backgroundColor: "black"
    }
  }
});
