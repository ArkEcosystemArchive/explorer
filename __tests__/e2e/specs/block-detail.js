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
      .waitForElementVisible('main.theme-light')
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Block']")
  },

  'it should be possible to navigate to next block and back': function (browser) {
    browser
      .waitForElementVisible("//div[contains(@class, 'semibold') and contains(@class, 'truncate')]/span[contains(text(), '3487084709104787070')]")
      .click("//button[contains(., 'Next')]")
      .waitForElementVisible("//div[contains(@class, 'semibold') and contains(@class, 'truncate')]/span[contains(text(), '12152817243754268433')]")
    browser
      .click("//button[contains(., 'Previous')]")
      .waitForElementVisible("//div[contains(@class, 'semibold') and contains(@class, 'truncate')]/span[contains(text(), '3487084709104787070')]")
  },

  'it should not contain a transaction table if block has no transactions': function (browser) {
    browser
      .useXpath().assert.containsText("//div[contains(., 'Transactions')]/following-sibling::div[1]", '0')
    browser
      .useCss().expect.element('h2').to.not.be.present
    browser
      .expect.element('table.vgt-table').to.not.be.present
    browser.end()
  },

  'it should contain a transaction table if block has 1 or more transactions': function (browser) {
    browser
      .url(browser.globals.devServerURL + '/#/block/12287662939647858585')
      .pause(500)
      .waitForElementVisible('table.vgt-table')
      .useXpath().assert.containsText("//div[contains(., 'Transactions')]/following-sibling::div[1]", '1')
      .useCss().expect.element('h2').to.be.present
    browser
      .expect.element('table.vgt-table').to.be.present
    browser
      .elements('css selector', '.vgt-table tbody tr', function (result) {
        browser.assert.equal(1, result.value.length)
      })
  },

  'it should be possible to copy the block id': function (browser) {
    browser
      .assert.cssClassNotPresent('img.block', 'animated')
    browser
      .click('button.has-tooltip')
      .waitForElementVisible('img.block.animated')
  },

  'it should refresh the confirmation count automatically': function (browser) {
    const element = "//div[contains(@class, 'list-row-border-b')][2]//div[2]"

    browser
      .waitForElementVisible('div.list-row-border-b')
      .useXpath()
      .getText(element, function (result) {
        browser.expect.element(element).text.to.not.contain(result.value.trim()).after(20000)
      })
  },

  'it should be possible to click on the delegate': function (browser) {
    browser
      .useXpath()
      .waitForElementVisible("//div[contains(@class, 'list-row')]//a")
      .click("//div[contains(@class, 'list-row')]//a")
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .assert.urlContains('wallets/ALLZ3TQKTaHm2Bte4SrXL9C5cS8ZovqFfZ')
    browser.end()
  }
}
