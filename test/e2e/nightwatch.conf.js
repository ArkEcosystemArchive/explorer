require('babel-register')
var config = require('../../config')

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: 'test/e2e/custom-assertions',
  globals_path: 'test/e2e/globalModules.js',

  selenium: {
    start_process: !process.env.WITHOUT_SELENIUM_SERVER,
    server_path: require('selenium-server').path,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path
    }
  },

  test_settings: {
    default: {
      webdriver: {
        webdriver_port: 4444,
        webdriver_host: '127.0.0.1',
      },
      silent: true,
      globals: {
        devServerURL: 'http://127.0.0.1:' + (process.env.PORT || config.dev.port)
      },
      desiredCapabilities: {
        chromeOptions: {
          args: [
            'window-size=1920,1080',
            'disable-dev-shm-usage'
          ]
        }
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
}
