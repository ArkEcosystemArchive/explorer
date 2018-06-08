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

  'it should not contain a transaction table if block has no transactions': function(browser) {
    browser
      .useXpath().assert.containsText("//div[.='Transactions']/following-sibling::div[1]", '0')
    browser
      .useCss().expect.element('h2').to.not.be.present
    browser
      .expect.element('div.table-component').to.not.be.present
    browser.end()
  },

  'it should contain a transaction table if block has 1 or more transactions': function(browser) {
    browser
      .url(browser.globals.devServerURL + '/#/block/12287662939647858585')
      .pause(500)
      .waitForElementVisible('main.theme-light', 5000)
      .waitForElementVisible('h1', 5000)
      .useXpath().assert.containsText("//div[.='Transactions']/following-sibling::div[1]", '1')
      .useCss().expect.element('h2').to.be.present
    browser
      .expect.element('div.table-component').to.be.present
    browser 
      .elements('css selector', '.table-component__table__body tr', function(result) {
        browser.assert.equal(1, result.value.length)
      })
  },

  'it should be possible to click on the delegate': function(browser) {
    browser
      .click('div.list-row a')
      .pause(500)
      .waitForElementVisible('h1', 5000)
    browser
      .assert.containsText('h1', 'Wallet Summary')
      .assert.urlContains('wallets/ALLZ3TQKTaHm2Bte4SrXL9C5cS8ZovqFfZ')
  },

  // TODO
  // 'it should be possible to copy the block ID': function(browser) {
  //   browser
  //     .assert.cssClassNotPresent('img.block', 'animated')
  //   browser
  //     .click('button.has-tooltip')
  //     .pause(50)
  //     .assert.cssClassPresent('img.block', 'animated')
  // }
}
