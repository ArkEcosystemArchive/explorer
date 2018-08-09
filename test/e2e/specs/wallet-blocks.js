// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Disable eslint for .to.not.be.present statements
/* eslint-disable no-unused-expressions */

module.exports = {
  // Default test, which also serves as setup for correct url
  'wallet block page should be available': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ/blocks/1'

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light')
      .waitForElementVisible('h1')
      .assert.containsText('h1', 'Blocks')
  },

  'it should display the delegates name': function (browser) {
    browser
      .useXpath()
      .waitForElementVisible('//h1//span')
      .expect.element("//h1//span[contains(., 'arkpool')]").to.be.visible
    browser
      .end()
  }
}
