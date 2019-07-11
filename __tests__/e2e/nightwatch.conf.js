require('@babel/register')
var config = require('../../config')

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['__tests__/e2e/specs'],
  output_folder: '__tests__/e2e/reports',
  custom_assertions_path: '__tests__/e2e/custom-assertions',
  globals_path: './globalModules.js',

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
        use_legacy_jsonwire: true,
        default_path_prefix: '/wd/hub',
        webdriver_port: 4444,
        webdriver_host: '127.0.0.1'
      },
      silent: true,
      globals: {
        devServerURL: 'http://127.0.0.1:' + (process.env.PORT || config.dev.port)
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: false,
          prefs: { 'profile.managed_default_content_settings.notifications': 1 },
          args: [
            'window-size=1920,1080',
            'no-sandbox',
            'disable-dev-shm-usage'
          ]
        },
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
