var Encore = require('@symfony/webpack-encore');
var path = require('path');

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')
    .addEntry('base', [
      './assets/js/base/base.js',
      './assets/sass/base/base.sass'
    ])
    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .splitEntryChunks()
    .enableSassLoader(function(sassOptions) {
      sassOptions.includePaths = [
        "./node_modules",
        "./assets"
      ]
    })
    .autoProvidejQuery()
    // .configureBabel(function(babelConfig) {
    // }, {
    //     include_node_modules: ['bootstrap']
    // })
;

module.exports = Encore.getWebpackConfig();

// METHOD 1
// const webpackConfig = Encore.getWebpackConfig();
// const babelLoader = webpackConfig.module.rules.find(rule => { 
//   if (rule.use && rule.use[0]) {
//     const firstUse = rule.use[0];
//     return firstUse.loader === 'babel-loader';
//   } 
//   return false;
// });
// babelLoader.exclude = (filePath) => {
//   if (!/(node_modules|bower_components)/.test(filePath)) {
//       return false;
//   }
//   const whitelistedModules = ['bootstrap'].map(
//       module => path.join('node_modules', module) + path.sep
//   );

//   for (const modulePath of whitelistedModules) {
//       if (filePath.includes(modulePath)) {
//           return false;
//       }
//   }
//   return true;
// };

// METHOD 2
const webpackConfig = Encore.getWebpackConfig();
const babelLoader = webpackConfig.module.rules.find(
  rule =>
    rule.use &&
    rule.use[0] &&
    rule.use[0].loader === 'babel-loader'
);

babelLoader.exclude = /node_modules\/(?!bootstrap\/).*/;

module.exports = webpackConfig;