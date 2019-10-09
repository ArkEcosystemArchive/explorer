const gitRevision = require("./build/git-revision")();
const path = require("path");
const minimist = require("minimist");

let publicPath = "/";

// GitHub pages
if (process.env.RELEASE_TYPE === "gh-pages") {
  publicPath = "/explorer/";
}

// Parse command line arguments
const args = {};
args.host = process.env.HOST;
args.port = Number(process.env.PORT);
args.baseUrl = minimist(process.argv.slice(2)).base || "/";
args.network = minimist(process.argv.slice(2)).network || "mainnet";
args.networkConfig = require(path.resolve(__dirname, `networks/${args.network}.json`));
args.routerMode = minimist(process.argv.slice(2)).history ? "history" : "hash";

const argsPrint = [];
for (const argKey in args) {
  const argValue = args[argKey];
  if (typeof argValue === "object") {
    continue;
  }
  argsPrint.push(`${argKey}: '${argValue || "-"}'`);
}
console.log(`Will use the arguments: ${argsPrint.join(", ")}`);

// Set proper ENV variables
process.env["VUE_APP_EXPLORER_CONFIG"] = args.network;
process.env["VUE_APP_ROUTER_MODE"] = args.routerMode;
process.env["VUE_APP_TITLE"] = args.networkConfig.title;
process.env["VUE_APP_GIT_VERSION"] = gitRevision.version;
process.env["VUE_APP_GIT_DATE"] = gitRevision.date;

module.exports = {
  publicPath,
  lintOnSave: false,
  runtimeCompiler: true,

  pluginOptions: {
    i18n: {
      locale: "en-GB",
      fallbackLocale: "en-GB",
      localeDir: "locales",
      enableInSFC: true,
    },
    svgSprite: {
      /*
       * The directory containing your SVG files.
       */
      dir: "src/assets/images/svg",
      /*
       * The reqex that will be used for the Webpack rule.
       */
      test: /\.(svg)(\?.*)?$/,
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      loaderOptions: {
        extract: true,
        spriteFilename: "img/svg.[hash:8].svg", // or 'img/icons.svg' if filenameHashing == false
      },
      /*
       * @see https://github.com/kisenka/svg-sprite-loader#configuration
       */
      pluginOptions: {
        plainSprite: true,
      },
    },
  },

  chainWebpack: config => {
    config.module
      .rule("svg-sprite")
      .use("svgo-loader")
      .loader("svgo-loader");
  },
};
