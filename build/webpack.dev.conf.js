'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const gitRevision = require('./utils/git-revision')()
const argumentParser = require('./argument-parser')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const createDevWebpackConfig = (host, port, network, networkConfig, routerMode) => {
  return merge(baseWebpackConfig, {
    module: {
      rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {
      clientLogLevel: 'warning',
      historyApiFallback: {
        rewrites: [
          {from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html')},
        ],
      },
      hot: true,
      contentBase: false, // since we use CopyWebpackPlugin.
      compress: true,
      host: host || config.dev.host,
      port: port || config.dev.port,
      open: config.dev.autoOpenBrowser,
      overlay: config.dev.errorOverlay
        ? {warnings: false, errors: true}
        : false,
      publicPath: config.dev.assetsPublicPath,
      proxy: config.dev.proxyTable,
      quiet: true, // necessary for FriendlyErrorsPlugin
      watchOptions: {
        poll: config.dev.poll,
      }
    },
    plugins: [
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          ...require('../config/dev.env'),
          ...{EXPLORER_CONFIG: `"${network}"`},
          ...{ROUTER_MODE: `"${routerMode}"`},
          ...{TITLE: `"${networkConfig.title}"`}
        },
        GIT_VERSION: JSON.stringify(gitRevision.version),
        GIT_DATE:  JSON.stringify(gitRevision.date)
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
      new webpack.NoEmitOnErrorsPlugin(),
      // https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        title: networkConfig.title,
        base_url: '/',
        filename: 'index.html',
        template: 'index.html',
        inject: true
      }),
      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../static'),
          to: config.dev.assetsSubDirectory,
          ignore: ['.*']
        }
      ])
    ]
  })
}

module.exports = (env) => {
  const args = argumentParser(env)

  return new Promise((resolve, reject) => {
    portfinder.basePort = args.port || config.dev.port
    portfinder.getPort((err, port) => {
      if(err) {
        reject(err)
      } else {
        // publish the new Port, necessary for e2e tests
        process.env.PORT = port
        const devWebpackConfig = createDevWebpackConfig(args.host, args.port, args.network, args.networkConfig, args.routerMode)
        devWebpackConfig.mode = 'development'
        // add port to devServer config
        devWebpackConfig.devServer.port = port

        // Add FriendlyErrorsPlugin
        devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined
        }))

        resolve(devWebpackConfig)
      }
    })
  })
}
