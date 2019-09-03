'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const gitRevision = require('./utils/git-revision')()
const argumentParser = require('./argument-parser')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const safeParser = require('postcss-safe-parser')

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g) || [];
  }
}

const createWebpackConfig = (baseUrl, network, networkConfig, routerMode) => {
  return merge(baseWebpackConfig, {
    module: {
      rules: utils.styleLoaders({
        sourceMap: config.build.productionSourceMap,
        extract: true,
        usePostCSS: true
      })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
      path: config.build.assetsRoot,
      filename: utils.assetsPath('js/[name].[chunkhash].js'),
      chunkFilename: utils.assetsPath('js/[id].[chunkhash].js'),
      publicPath: baseUrl
    },
    plugins: [
      new VueLoaderPlugin(),
      // http://vuejs.github.io/vue-loader/en/workflow/production.html
      new webpack.DefinePlugin({
        'process.env': {
          ...require('../config/prod.env'),
          ...{EXPLORER_CONFIG: `"${network}"`},
          ...{ROUTER_MODE: `"${routerMode}"`},
          ...{TITLE: `"${networkConfig.title}"`}
        },
        GIT_VERSION: JSON.stringify(gitRevision.version),
        GIT_DATE: JSON.stringify(gitRevision.date)
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: utils.assetsPath('css/[name].[contenthash].css'),
        chunkFilename: '[id].css'
      }),
      // Remove unused CSS using purgecss. See https://github.com/FullHuman/purgecss
      // for more information about purgecss.
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, './../index.html'),
          path.join(__dirname, './../**/*.vue'),
          path.join(__dirname, './../src/**/*.js')
        ]),
        whitelist: [
          'border-theme-page-background',
          'table-component__th--sort-asc', 'table-component__th--sort-desc',
          'tooltip', 'tooltip-inner', 'tooltip-arrow',
          'tr', 'td',
          'v-spinner'
        ],
        whitelistPatterns: [
          /^tooltip-bg-/
        ],
        extractors: [{
          extractor: TailwindExtractor,
          extensions: ["html", "js", "vue"]
        }]
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSPlugin({
        cssProcessorOptions: config.build.productionSourceMap
          ? { parser: safeParser, map: { inline: false } }
          : { parser: safeParser }
      }),
      // generate dist index.html with correct asset hash for caching.
      // you can customize output by editing /index.html
      // see https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        title: networkConfig.title,
        base_url: baseUrl,
        filename: config.build.index,
        template: 'index.html',
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency'
      }),
      // keep module.id stable when vendor modules does not change
      new webpack.HashedModuleIdsPlugin(),
      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../static'),
          to: config.build.assetsSubDirectory,
          ignore: ['.*']
        }
      ])
    ],
    optimization: {
      // enable scope hoisting
      concatenateModules: true, //ModuleConcatenationPlugin
      splitChunks: {
        cacheGroups: {
          vendor: {
            // split vendor js into its own file
            name: 'vendor',
            test: (module) => {
              // any required modules inside node_modules are extracted to vendor
              return (
                module.resource &&
                /\.js$/.test(module.resource) &&
                module.resource.indexOf(
                  path.join(__dirname, '../node_modules')
                ) === 0
              )
            }
          },
          manifest: {
            // extract webpack runtime and module manifest to its own file in order to
            // prevent vendor hash from being updated whenever app bundle is updated
            name: 'manifest',
            minChunks: Infinity
          },
          app: {
            // This instance extracts shared chunks from code splitted chunks and bundles them
            // in a separate chunk, similar to the vendor chunk
            name: 'app',
            minChunks: 3
          }
        }
      },
      minimizer: [
        new TerserPlugin({
          test: /\.js(\?.*)?$/i,
        }),
      ]
    }
  })
}

module.exports = (env) => {
  const args = argumentParser(env)

  const webpackConfig = createWebpackConfig(args.baseUrl, args.network, args.networkConfig, args.routerMode)
  webpackConfig.mode = 'production'

  if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          config.build.productionGzipExtensions.join('|') +
          ')$'
        ),
        threshold: 10240,
        minRatio: 0.8
      })
    )
  }

  if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
  }

  return webpackConfig
}
