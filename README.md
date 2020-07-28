# Configuring Webpack Encore & Babel for passing by node_modules

This project show how you can configure WebpackEncore & Babel to pass by a library in `node_modules`.

In this case, I am using a versión of Bootstrap 4 that uses the spread operator but whose modules are not ES6 compliant so I have to use the raw javascript files and traspile them using **Babel**:

```
import dropdown from 'bootstrap/js/src/dropdown.js';
```

In order to avoid the presence of the spread operator in the final built two steps are needed:

## Create babel.config.js

Since the `.babelrc` file does not apply to files living in `node_modules` I have to use a `babel.config.js` file instead ([see this comment](https://github.com/symfony/webpack-encore/issues/670#issuecomment-628672354))

```
{
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "chrome": "58",
            "ie": "11"
          },
          "corejs": 3,
          "modules": false,
          "forceAllTransforms": true,
          "useBuiltIns": "entry"
        }
      ]
    ],
    "plugins": ["@babel/plugin-syntax-dynamic-import"]
  }
```

## Use configureBabel method of Webpack Encore

Finally, it is needed to tell Babel that transpiles the Bootstrap JS files, so we use its method `.configureBabel` in file `webpack.config.js`:

```
.configureBabel(null, {
  includeNodeModules: ['bootstrap'],
});
```

Running `yarn encore production` we get a final build without the spread operator.