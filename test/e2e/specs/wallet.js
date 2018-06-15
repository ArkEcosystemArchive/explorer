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
    browser
      .useXpath().expect.element("//div[contains(., 'Balance')]").to.be.present
    browser
      .expect.element("//div[contains(., 'Transactions')]").to.be.present
    browser
      .expect.element("//div[contains(., 'Transactions')]/following-sibling::div/span[contains(@class, 'text-green')]").to.be.present
    browser
      .expect.element("//div[contains(., 'Transactions')]/following-sibling::div/span[contains(@class, 'text-red')]").to.be.present
  },

  'it should show a list of transactions, including show more button': function (browser) {
    browser
      .useCss()
      .waitForElementVisible('div.hidden.sm\\:block div.table-component tbody.table-component__table__body tr', 5000)
    browser
      .elements('css selector', 'div.hidden.sm\\:block div.table-component tbody.table-component__table__body tr', function(result) {
        browser.assert.equal(25, result.value.length)
      })
    browser
      .expect.element('button.show-more-button').to.be.visible
  },

  'it should contain transaction tabs': function (browser) {
    browser
      .useXpath().expect.element("//div[contains(., 'All')]").to.be.present
    browser
      .useXpath().expect.element("//div[contains(., 'Sent')]").to.be.present
    browser
      .useXpath().expect.element("//div[contains(., 'Received')]").to.be.present
  },

  'it should be possible to toggle the QR code': function (browser) {
    browser
      .useCss()
      .expect.element('div.modal-container').to.be.not.present
    browser
      .click('button.address-button')
      .waitForElementVisible('div.modal-container', 5000)
    browser
      .click('button.absolute.pin-t')
      .waitForElementNotPresent('div.modal-container', 5000)
  },

  'it should show who the wallet voted for': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/wallets/ATsPMTAHNsUwKedzNpjTNRfcj1oRGaX5xC'

    browser
      .url(devServer)
      .useXpath()
      .waitForElementVisible("//div[text() = 'Votes']", 5000)
    browser
      .expect.element("//div[text() = 'Votes']/following-sibling::div//a").to.be.present
    browser.end()
  }
}
