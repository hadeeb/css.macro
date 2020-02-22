var css = require("./css");
var react = require("react");

function styled(Component, className, rule) {
  if (process.env.NODE_ENV !== "production") {
    var FnName =
      typeof Component === "string"
        ? Component
        : Component.displayName || Component.name;
    Styled.displayName = "Styled(" + FnName + ")";
  }

  css(rule);

  function Styled(props) {
    return react.createElement(
      Component,
      Object.assign({}, props, {
        className: props.className
          ? props.className + " " + className
          : className
      })
    );
  }
  return Styled;
}

module.exports = styled;
