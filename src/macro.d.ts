import * as CSS from "csstype";

interface CSSProperties extends CSS.Properties<string | number> {}

type Nested<T> = Record<string, T>;

//@ts-ignore
interface NestedCSSProperties
  extends CSSProperties,
    Nested<NestedCSSProperties> {}

type CSSObject = CSSProperties | NestedCSSProperties;

declare function css(styleObject: TemplateStringsArray | CSSObject): string;

type GlobalStyles = Record<string, CSSObject>;

declare function injectGlobal(
  styleObject: TemplateStringsArray | GlobalStyles
): void;

export { css, injectGlobal };
