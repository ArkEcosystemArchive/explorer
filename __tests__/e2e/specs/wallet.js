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
      .waitForElementVisible('main.theme-light')
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
  },

  'it should be possible to copy the wallet address': function (browser) {
    browser
      .useCss()
      .waitForElementVisible('img.block')
      .assert.cssClassNotPresent('img.block', 'animated')
    browser
      .click('button.has-tooltip')
      .waitForElementVisible('img.block.animated')
  },

  'it should be possible to see the balance': function (browser) {
    browser
      .useXpath().expect.element("//div[contains(., 'Balance')]").to.be.present
  },

  'it should contain transaction tabs and transaction count': function (browser) {
    browser
      .useXpath()
      .expect.element("//div[contains(., 'All')]").to.be.present
    browser
      .expect.element("//div[contains(., 'Sent')]").to.be.present
    browser
      .expect.element("//div[contains(., 'Sent')]//span").to.be.present
    browser
      .expect.element("//div[contains(., 'Received')]").to.be.present
    browser
      .expect.element("//div[contains(., 'Received')]//span").to.be.present
  },

  'it should show a list of transactions, including show more button': function (browser) {
    browser
      .useCss()
      .waitForElementVisible('div.hidden.sm\\:block table.vgt-table tbody tr')
    browser
      .elements('css selector', 'div.hidden.sm\\:block table.vgt-table tbody tr', function (result) {
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
      .waitForElementVisible("//h1[text() = 'Transactions']")
    browser
      .click("//div[contains(., 'Type')]/following-sibling::div//span")
      .waitForElementVisible("//div[contains(., 'Type')]/following-sibling::div//ul//li[2]//a")
    browser
      .click("//div[contains(., 'Type')]/following-sibling::div//ul//li[2]//a")
      .assert.urlContains('wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs/transactions/sent/1')
  },

  'it should be possible to toggle the QR code': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs'

    browser
      .url(devServer)
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
    browser
      .useCss()
      .expect.element('div.modal-container').to.be.not.present
    browser
      .click('button.address-button')
      .waitForElementVisible('div.modal-container')
    browser
      .click('button.absolute.top-0')
      .waitForElementNotPresent('div.modal-container')
  },

  'it should show who the wallet voted for': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/wallets/AKzB7dWkCsYnt4u9P4Sch6iKyZ7QnDjBav'

    browser
      .url(devServer)
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .waitForElementVisible("//div[contains(text(), 'Voting for')]")
      .waitForElementVisible("//div[contains(text(), 'Voting for')]/following-sibling::span//a")
  },

  'it should hide the container if the wallet is not voting': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/wallets/AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv'

    browser
      .url(devServer)
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .waitForElementNotVisible("//div[contains(text(), 'Voting for')]")
  },

  'it should redirect to 404 if the wallet address is invalid': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/wallets/ffffffffffffffffffffffffffffffffff'

    browser
      .url(devServer)
      .waitForElementVisible("//h1[text() = 'Ooops!']")
    browser
      .assert.urlContains('/404')
  },

  'it should show delegate information': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ'

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('main.theme-light')
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet summary']")

    browser.expect.element("//div[text() = 'Delegate']").to.be.present
    browser.expect.element("//div[text() = 'Rank/Status']").to.be.present
    browser.expect.element("//div[text() = 'Votes']").to.be.present
    browser.expect.element("//div[text() = 'Forged']").to.be.present
    browser.expect.element("//div[text() = 'Blocks']").to.be.present
  },

  'it should be possible to show the list of forged blocks': function (browser) {
    browser
      .waitForElementVisible("//a[contains(@href, '/blocks/1') and contains(text(), 'See all')]")
      .click("//a[contains(@href, '/blocks/1') and contains(text(), 'See all')]")
      .waitForElementVisible("//h1[text() = 'Blocks']")
      .waitForElementVisible("//div[contains(., 'Generated by')]/following-sibling::div//span")
      .expect.element("//div[contains(., 'Generated by')]/following-sibling::div//span[contains(., 'arkpool')]").to.be.visible
    browser
      .assert.urlContains('/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ/blocks/1')
  },

  'it should be possible to show the list of voters': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ'

    browser
      .url(devServer)
      .useXpath()
      .waitForElementVisible("//a[contains(@href, '/voters/1') and contains(text(), 'See all')]")
      .click("//a[contains(@href, '/voters/1') and contains(text(), 'See all')]")
      .waitForElementVisible("//h1[contains(text(), 'Voters')]")
    browser
      .assert.urlContains('/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ/voters/1')
    browser.end()
  }
}
