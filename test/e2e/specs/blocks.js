// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  // Default test, which also serves as setup for correct url
  'block page should be available': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/blocks/1'

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light', 5000)
      .waitForElementVisible('h1', 5000)
      .assert.containsText('h1', 'Blocks')
      .end()
  },

}
