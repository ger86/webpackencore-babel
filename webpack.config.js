var Encore = require("@symfony/webpack-encore");
var path = require("path");

Encore
  // directory where compiled assets will be stored
  .setOutputPath("public/build/")
  // public path used by the web server to access the output path
  .setPublicPath("/build")
  // only needed for CDN's or sub-directory deploy
  //.setManifestKeyPrefix('build/')
  .addEntry("base", [
    "./assets/js/base/base.js",
    "./assets/sass/base/base.sass",
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
  .enableSassLoader(function (sassOptions) {
    sassOptions.sassOptions.includePaths = ["./node_modules", "./assets"];
  })
  .autoProvidejQuery()
  .configureBabel(null, {
    includeNodeModules: ['bootstrap'],
  });

module.exports = Encore.getWebpackConfig();