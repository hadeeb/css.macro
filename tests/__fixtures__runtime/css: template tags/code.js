import { css, injectGlobal } from "../../../src/macro";

let class1 = css`
  color: red;
`;

let class2 = css`
  display: flex;
  div {
    background-color: #ff00ef;
  }
`;

injectGlobal`
  body {
    color: black;
    background-color: white;
    &.dark-mode {
      color: white;
      background-color: black;
    }
  }
`;
