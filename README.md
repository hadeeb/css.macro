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
- Author CSS in tagged templates or objects.
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

```js
import { css, styled } from "@hadeeb/css.macro";

<button
  className={css`
    font-weight: 500;
  `}
>
  Content
</button>;

const StyledDiv = styled.div`
  font-weight: 500;
  span {
    font-size: 12px;
  }
`;

// OR use style objects

<span className={css({ fontSize: 14 })}>Content</span>;

const StyledDiv = styled.div({
  fontWeight: 500,
  ".someClass": {
    fontSize: 12
  }
});
```

`styled` can wrap any component which accepts a `className` prop

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

## Server Side Rendering

After rendering the components extract the CSS and add it to the DOM

```js
import { extractCSS, styleID } from "@hadeeb/css.macro/server";

const styleTag = `<style id="${styleID}">${extractCSS()}</style>`;
```

## Caveats

- Dynamic styles are not supported
- Style objects have to declared inline

[babel]: https://babeljs.io/
[babel-plugin-macros]: https://github.com/kentcdodds/babel-plugin-macros
[postcss]: https://postcss.org/
[autoprefixer]: https://github.com/postcss/autoprefixer
[postcss-nested]: https://github.com/postcss/postcss-nested
