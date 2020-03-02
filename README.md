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
- Zero runtime cost (your bundler should handle `.css` imports).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Classname](#classname)
  - [Global Styles](#global-styles)
  - [Style Objects](#style-objects)
- [Caveats](#caveats)

## Installation

```
yarn add @hadeeb/css.macro
// OR
npm install @hadeeb/css.macro
```

> You'll also need to install and configure
> [`babel-plugin-macros`][babel-plugin-macros] if you haven't already.
>
> If you are using [`create-react-app`][cra] or [`Gatsby`][gatsby], it's already configured for you.

## Usage

### Classname

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
import { css, injectGlobal } from "@hadeeb/css.macro";

<span className={css({ fontSize: 14 })}>Content</span>;

injectGlobal({
  ".root": {
    height: "100vh"
  }
});
```

## Caveats

- Dynamic styles are not supported
- Style objects have to be declared inline

[babel]: https://babeljs.io/
[babel-plugin-macros]: https://github.com/kentcdodds/babel-plugin-macros
[postcss]: https://postcss.org/
[autoprefixer]: https://github.com/postcss/autoprefixer
[postcss-nested]: https://github.com/postcss/postcss-nested
[cra]: https://create-react-app.dev/
[gatsby]: https://www.gatsbyjs.org/
