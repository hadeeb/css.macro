import * as CSS from "csstype";
import {
  ReactHTML,
  FunctionComponent,
  ComponentType,
  CSSProperties
} from "react";

type Nested<T> = Record<string, T>;

//@ts-ignore
interface NestedCSSProperties
  extends CSSProperties,
    Nested<NestedCSSProperties> {}

type CSSReturn = string & { readonly __opaque__: "CSSReturn" };
declare function css(
  styleObject: TemplateStringsArray | CSSProperties | NestedCSSProperties
): CSSReturn;

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

interface styledObject extends styledFunction, styledTags {}

declare const styled: styledObject;

export { css, styled };
