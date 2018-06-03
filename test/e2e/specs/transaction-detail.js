// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  // Default test, which also serves as setup for correct url
  'transaction detail page should be available': function (browser) {
    const devServer = browser.globals.devServerURL + '/transaction/818c157383c814a353efbfbbdd3dccabb13cb35e156bb70d31e77248166657a7'

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light', 5000)
      .assert.containsText('h1', 'Transaction')
      .end()
  },

}