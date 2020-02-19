import * as CSS from "csstype";
import {
  ReactHTML,
  FunctionComponent,
  ComponentType,
  CSSProperties
} from "react";

interface NestedCSSProperties extends CSSProperties {
  [x: string]: CSSProperties | NestedCSSProperties;
}

type CSSReturn = string & { readonly __opaque__: "CSSReturn" };
declare function css(
  styleObject: CSSProperties | NestedCSSProperties
): CSSReturn;
declare function css(cssString: TemplateStringsArray): CSSReturn;

type createStyled<T> = (
  cssString: TemplateStringsArray | CSSProperties | NestedCSSProperties
) => FunctionComponent<T>;

interface styledFunction {
  <T extends keyof JSX.IntrinsicElements>(comp: T): createStyled<
    JSX.IntrinsicElements[T]
  >;
  <T extends { className?: string }>(comp: ComponentType<T>): createStyled<T>;
}

type styledTags = {
  [x in keyof JSX.IntrinsicElements]: createStyled<JSX.IntrinsicElements[x]>;
};

interface styledObject extends styledFunction, styledTags { }

declare const styled: styledObject;

export { css, styled };
