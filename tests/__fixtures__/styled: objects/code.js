import { styled } from "../../../src/macro";

let StyledA = styled("a")({
  color: "red"
});

let StyledDiv = styled("div")({
  display: "flex",
  div: {
    backgroundColor: "#ff00ef"
  }
});

let StyledHeader = styled.h1({
  fontSize: 18
});

let StyledComp = styled(StyledHeader)({
  color: "#222222"
});
