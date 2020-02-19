import { styled } from "../../../src/macro";

let StyledA = styled("a")`
  color: red;
`;

let StyledDiv = styled("div")`
  display: flex;
  div {
    background-color: #ff00ef;
  }
`;

let StyledHeader = styled.h1`
  font-size: 18px;
`;

let StyledComp = styled(StyledHeader)`
  color: #222222;
`;
