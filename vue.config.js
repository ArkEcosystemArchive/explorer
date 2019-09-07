const gitRevision = require('./build/git-revision')()

let publicPath = "/";

if (process.env.RELEASE_TYPE === "dist") {
    publicPath = "./";
} else if (process.env.RELEASE_TYPE === "gh-pages") {
    publicPath = "/explorer/";
}

module.exports = {
    publicPath,
    lintOnSave: false,
    runtimeCompiler: true,

    pluginOptions: {
      i18n: {
        locale: 'en',
        fallbackLocale: 'en',
        localeDir: 'locales',
        enableInSFC: true
      }
    }
};
