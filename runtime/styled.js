const css = require("./css").css;
const createElement = require("react").createElement;

function styled(comp) {
  return function(className, rule) {
    if (process.env.NODE_ENV !== "production") {
      const FnName =
        typeof comp === "string" ? comp : comp.displayName || comp.name;
      Styled.displayName = `Styled${FnName}`;
    }

    css(className, rule);

    function Styled(props) {
      return createElement(comp, {
        ...props,
        className: props.className
          ? props.className + " " + className
          : className
      });
    }
    return Styled;
  };
}

module.exports.styled = styled;
