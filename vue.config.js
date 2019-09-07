const gitRevision = require('./build/git-revision')()

let publicPath = "/";

if (process.env.RELEASE_TYPE === "dist") {
    publicPath = "./";
} else if (process.env.RELEASE_TYPE === "gh-pages") {
    publicPath = "/explorer/";
}

process.env['VUE_APP_GIT_VERSION'] = JSON.stringify(gitRevision.version);
process.env['VUE_APP_GIT_DATE'] = JSON.stringify(gitRevision.date);

module.exports = {
    publicPath,
    lintOnSave: false,
    runtimeCompiler: true,

    pluginOptions: {
      i18n: {
        locale: 'en-GB',
        fallbackLocale: 'en-GB',
        localeDir: 'locales',
        enableInSFC: true
      }
    }
};
