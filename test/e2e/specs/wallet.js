// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Disable eslint for .to.not.be.present statements
/* eslint-disable no-unused-expressions */

module.exports = {
  // Default test, which also serves as setup for correct url
  'wallet summary page should be available': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs'

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light', 5000)
      .waitForElementVisible('h1', 5000)
      .assert.containsText('h1', 'Wallet Summary')
  },

  'it should be possible to copy the wallet address': function(browser) {
    browser
      .waitForElementVisible('img.block', 5000)
      .assert.cssClassNotPresent('img.block', 'animated')
    browser
      .click('button.has-tooltip')
      .waitForElementVisible('img.block.animated', 5000)
  },

  'it should be possible to see the balance and transaction count': function (browser) {

  },

  'it should be possible to toggle between public key and address': function (browser) {

  },

  'it should show a list of transactions, including show more button': function (browser) {

  },

  'it should contain transaction tabs': function (browser) {

  },

  'it should show who the wallet voted for': function (browser) {
    //ATsPMTAHNsUwKedzNpjTNRfcj1oRGaX5xC

    browser.end()
  }
}
