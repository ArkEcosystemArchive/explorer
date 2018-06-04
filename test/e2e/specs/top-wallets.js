// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  // Default test, which also serves as setup for correct url
  'top wallets page should be available': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/top-wallets/1'

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light', 5000)
      .waitForElementVisible('h1', 5000)
      .assert.containsText('h1', 'Top Wallets')
      .end()
  },

}
