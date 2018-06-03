// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  // Default test, which also serves as setup for correct url
  'delegate wallet summary page should be available': function (browser) {
    const devServer = browser.globals.devServerURL + '/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ'

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light', 5000)
      .assert.containsText('h1', 'Wallet Summary')
      .end()
  },

}