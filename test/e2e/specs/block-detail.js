// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Disable eslint for .to.not.be.present statements
/* eslint-disable no-unused-expressions */

module.exports = {
  // Default test, which also serves as setup for correct url
  'block detail page should be available': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/block/3487084709104787070'

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light', 5000)
      .waitForElementVisible('h1', 5000)
      .assert.containsText('h1', 'Block')
  },

  'it should be possible to navigate to next block and back': function(browser) {
    browser
      .assert.containsText('div.semibold.truncate span', '3487084709104787070')
      .useXpath().click("//button[contains(., 'Next')]")
      .pause(500)
    browser
      .useCss().assert.containsText('div.semibold.truncate span', '12152817243754268433')
      .useXpath().click("//button[contains(., 'Previous')]")
      .pause(500)
    browser
      .useCss().assert.containsText('div.semibold.truncate span', '3487084709104787070')
  },

  'it should not have a transaction table if block has no transactions': function(browser) {
    browser
      .useXpath().assert.containsText("//div[.='Transactions']/following-sibling::div[1]", '0')
    browser
      .useCss().expect.element('h2').to.not.be.present
    browser
      .expect.element('div.table-component').to.not.be.present
  }

  // 'it should be possible to click on the delegate'
  // should be able to copy the block id
  // should be able to see a transaction table if block has transactions
  // latest block (home -> latest blocks -> first block) should not have next block
}
