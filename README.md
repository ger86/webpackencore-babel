# 1. Working method

1. Rename .babelrc to babelrc in order to prevent webpack encore to detect it
2. Add this to webpack.config.js

.configureBabel(function(babelConfig) {
}, {
     include_node_modules: ['bootstrap']
})

3. run yarn run encore production and check public/build/vendors-xxxxx.js file. It does not contain spread operator

# 2. Working method

1. Set the .babelrc file with the following content:


{
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {},
          "modules": false,
          "forceAllTransforms": true,
          "useBuiltIns": "entry"
        }
      ]
    ],
    "plugins": ["@babel/plugin-syntax-dynamic-import"]
  }


2. Comment the following lines in webpack.config.js


.configureBabel(function(babelConfig) {
}, {
     include_node_modules: ['bootstrap']
})

3. Add this at the end:

const webpackConfig = Encore.getWebpackConfig();
const babelLoader = webpackConfig.module.rules.find(
  rule =>
    rule.use &&
    rule.use[0] &&
    rule.use[0].loader === 'babel-loader'
);

babelLoader.exclude = /node_modules\/(?!bootstrap\/).*/;

4. Run again yarn run encore production and check public/build/vendors-xxx.js. It *contains* the spread operator