// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Disable eslint for .to.not.be.present statements
/* eslint-disable no-unused-expressions */

module.exports = {
  // Default test, which also serves as setup for correct url
  'wallet summary page should be available': function(browser) {
    const devServer = browser.globals.devServerURL + '/#/wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs'

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light')
      .waitForElementVisible('h1')
      .assert.containsText('h1', 'Wallet Summary')
  },

  'it should be possible to copy the wallet address': function(browser) {
    browser
      .waitForElementVisible('img.block')
      .assert.cssClassNotPresent('img.block', 'animated')
    browser
      .click('button.has-tooltip')
      .waitForElementVisible('img.block.animated')
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

  'it should contain transaction tabs': function (browser) {
    browser
      .useXpath().expect.element("//div[contains(., 'All')]").to.be.present
    browser
      .useXpath().expect.element("//div[contains(., 'Sent')]").to.be.present
    browser
      .useXpath().expect.element("//div[contains(., 'Received')]").to.be.present
  },

  'it should show a list of transactions, including show more button': function (browser) {
    browser
      .useCss()
      .waitForElementVisible('div.hidden.sm\\:block div.table-component tbody.table-component__table__body tr')
    browser
      .elements('css selector', 'div.hidden.sm\\:block div.table-component tbody.table-component__table__body tr', function(result) {
        browser.assert.equal(25, result.value.length)
      })
    browser
      .expect.element('button.show-more-button').to.be.visible
  },

  'it should be possible to click on the show more button': function (browser) {
    browser
      .useCss()
      .waitForElementVisible('button.show-more-button')
      .click('button.show-more-button')
    browser
      .assert.urlContains('wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs/transactions/all/2')
  },

  'it should be possible to switch transaction type': function (browser) {
    browser
      .useXpath()
      .expect.element("//span[contains(., 'Transactions')]").to.be.present
    browser
      .click("//span[contains(., 'Transactions')]/following-sibling::div//span")
      .waitForElementVisible("//span[contains(., 'Transactions')]/following-sibling::div//ul//li[2]//a")
    browser
      .click("//span[contains(., 'Transactions')]/following-sibling::div//ul//li[2]//a")
      .assert.urlContains('wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs/transactions/sent/1')
  },

  'it should be possible to toggle the QR code': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs'

    browser
      .url(devServer)
      .waitForElementVisible("//h1[text() = 'Wallet Summary']")
    browser
      .useCss()
      .expect.element('div.modal-container').to.be.not.present
    browser
      .click('button.address-button')
      .waitForElementVisible('div.modal-container')
    browser
      .click('button.absolute.pin-t')
      .waitForElementNotPresent('div.modal-container')
  },

  'it should show who the wallet voted for': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/wallets/ATsPMTAHNsUwKedzNpjTNRfcj1oRGaX5xC'

    browser
      .url(devServer)
      .useXpath()
      .waitForElementVisible("//div[text() = 'Votes']")
    browser
      .waitForElementVisible("//div[text() = 'Votes']/following-sibling::div//a")
    browser
      .click("//div[text() = 'Votes']/following-sibling::div//a")
      .waitForElementVisible("//div[text() = 'Delegate']")
    browser
      .assert.urlContains('/wallets/')
  },

  'it should redirect to 404 if the wallet address is invalid': function(browser) {
    const devServer = browser.globals.devServerURL + '/#/wallets/ffffffffffffffffffffffffffffffffff'

    browser
      .url(devServer)
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Ooops!']")
    browser
      .assert.urlContains('/404')
      .end()
  }
}
