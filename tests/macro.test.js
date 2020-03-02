const path = require("path");
const { create } = require("babel-test");

const pkgName = require("../package.json").name;

const { fixtures } = create({
  plugins: [
    [
      require.resolve("babel-plugin-macros"),
      {
        [pkgName]: {
          emitCSS: false
        }
      }
    ]
  ]
});

fixtures("css.macro", path.join(__dirname, "__fixtures__"));
