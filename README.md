# css.macro

A tiny CSS in JS solution for simple use cases, built with [`babel-plugin-macros`][babel-plugin-macros] and [`PostCSS`][postcss].

```js
<span
  className={css`
    color: #222222;
  `}
>
  Content
</span>
```

- Vendor prefixing with [`autoprefixer`][autoprefixer].
- Nested styles with [`postcss-nested`][postcss-nested].
- Write styles in tagged templates or objects.
- Tiny runtime (`~200 Bytes`).

## Install

```
yarn add @hadeeb/css.macro
// OR
npm install @hadeeb/css.macro
```

You'll also need to install and configure
[`babel-plugin-macros`][babel-plugin-macros] if you haven't already.

## Examples

### CSS

```js
import { css } from "@hadeeb/css.macro";

<button
  className={css`
    font-weight: 500;
  `}
>
  Content
</button>;
```

## Styled components

```js
import { styled } from "@hadeeb/css.macro";

const StyledDiv = styled.div`
  font-weight: 500;
  span {
    font-size: 12px;
  }
`;
// OR
const StyledDiv = styled("div")`
  font-weight: 500;
  span {
    font-size: 12px;
  }
`;
```

`styled` can also wrap any component which accepts a `className` prop

```js
import { styled } from "@hadeeb/css.macro";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: blue;
  &:hover {
    color: red;
  }
`;
```

### Global styles

```js
import { injectGlobal } from "@hadeeb/css.macro";
injectGlobal`
  body {
    margin: 0;
  }
`;
```

### Style objects

Styles can also be declared as objects

> Note: objects should be declared inline.

```js
import { css, styled, injectGlobal } from "@hadeeb/css.macro";

<span className={css({ fontSize: 14 })}>Content</span>;

const StyledDiv = styled.div({
  fontWeight: 500,
  ".someClass": {
    fontSize: 12
  }
});

injectGlobal({
  ".root": {
    height: "100vh"
  }
});
```

## Server Side Rendering

After rendering the components extract the CSS and add it to the DOM

```js
import { extractCSS, styleID } from "@hadeeb/css.macro/server";

const styleTag = `<style id="${styleID}">${extractCSS()}</style>`;
```

## Caveats

- Dynamic styles are not supported
- Style objects have to be declared inline

[babel]: https://babeljs.io/
[babel-plugin-macros]: https://github.com/kentcdodds/babel-plugin-macros
[postcss]: https://postcss.org/
[autoprefixer]: https://github.com/postcss/autoprefixer
[postcss-nested]: https://github.com/postcss/postcss-nested
