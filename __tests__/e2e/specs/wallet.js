// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Disable eslint for .to.not.be.present statements
/* eslint-disable no-unused-expressions */

module.exports = {
  // Default test, which also serves as setup for correct url
  'wallet summary page should be available': function (browserName) {
    const devServer = browserName.globals.devServerURL + '/#/wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs'

    browserName
      .url(devServer)
      .waitForElementVisible('main.theme-light')
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
  },

  'it should be possible to copy the wallet address': function (browserName) {
    browserName
      .useCss()
      .waitForElementVisible('img.block')
      .assert.cssClassNotPresent('img.block', 'animated')
    browserName
      .click('button.has-tooltip')
      .waitForElementVisible('img.block.animated')
  },

  'it should be possible to see the balance': function (browserName) {
    browserName
      .useXpath().expect.element("//div[contains(., 'Balance')]").to.be.present
  },

  'it should contain transaction tabs and transaction count': function (browserName) {
    browserName
      .useXpath()
      .expect.element("//div[contains(., 'All')]").to.be.present
    browserName
      .expect.element("//div[contains(., 'Sent')]").to.be.present
    browserName
      .expect.element("//div[contains(., 'Sent')]//span").to.be.present
    browserName
      .expect.element("//div[contains(., 'Received')]").to.be.present
    browserName
      .expect.element("//div[contains(., 'Received')]//span").to.be.present
  },

  'it should show a list of transactions, including show more button': function (browserName) {
    browserName
      .useCss()
      .waitForElementVisible('div.hidden.sm\\:block div.table-component tbody.table-component__table__body tr')
    browserName
      .elements('css selector', 'div.hidden.sm\\:block div.table-component tbody.table-component__table__body tr', function (result) {
        browserName.assert.equal(25, result.value.length)
      })
    browserName
      .expect.element('button.show-more-button').to.be.visible
  },

  'it should be possible to click on the show more button': function (browserName) {
    browserName
      .useCss()
      .waitForElementVisible('button.show-more-button')
      .click('button.show-more-button')
    browserName
      .assert.urlContains('wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs/transactions/all/2')
  },

  'it should be possible to switch transaction type': function (browserName) {
    browserName
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Transactions']")
    browserName
      .click("//div[contains(., 'Type')]/following-sibling::div//span")
      .waitForElementVisible("//div[contains(., 'Type')]/following-sibling::div//ul//li[2]//a")
    browserName
      .click("//div[contains(., 'Type')]/following-sibling::div//ul//li[2]//a")
      .assert.urlContains('wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs/transactions/sent/1')
  },

  'it should be possible to toggle the QR code': function (browserName) {
    const devServer = browserName.globals.devServerURL + '/#/wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs'

    browserName
      .url(devServer)
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
    browserName
      .useCss()
      .expect.element('div.modal-container').to.be.not.present
    browserName
      .click('button.address-button')
      .waitForElementVisible('div.modal-container')
    browserName
      .click('button.absolute.pin-t')
      .waitForElementNotPresent('div.modal-container')
  },

  'it should show who the wallet voted for': function (browserName) {
    const devServer = browserName.globals.devServerURL + '/#/wallets/AKzB7dWkCsYnt4u9P4Sch6iKyZ7QnDjBav'

    browserName
      .url(devServer)
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .waitForElementVisible("//div[contains(text(), 'Voting for')]")
      .waitForElementVisible("//div[contains(text(), 'Voting for')]/following-sibling::span//a")
  },

  'it should hide the container if the wallet is not voting': function (browserName) {
    const devServer = browserName.globals.devServerURL + '/#/wallets/AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv'

    browserName
      .url(devServer)
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .waitForElementNotVisible("//div[contains(text(), 'Voting for')]")
  },

  'it should redirect to 404 if the wallet address is invalid': function (browserName) {
    const devServer = browserName.globals.devServerURL + '/#/wallets/ffffffffffffffffffffffffffffffffff'

    browserName
      .url(devServer)
      .waitForElementVisible("//h1[text() = 'Ooops!']")
    browserName
      .assert.urlContains('/404')
  },

  'it should show delegate information': function (browserName) {
    const devServer = browserName.globals.devServerURL + '/#/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ'

    browserName
      .url(devServer)
      .useCss()
      .waitForElementVisible('main.theme-light')
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet summary']")

    browserName.expect.element("//div[text() = 'Delegate']").to.be.present
    browserName.expect.element("//div[text() = 'Rank/Status']").to.be.present
    browserName.expect.element("//div[text() = 'Votes']").to.be.present
    browserName.expect.element("//div[text() = 'Forged']").to.be.present
    browserName.expect.element("//div[text() = 'Blocks']").to.be.present
  },

  'it should be possible to show the list of forged blocks': function (browserName) {
    browserName
      .waitForElementVisible("//a[contains(@href, '/blocks/1') and contains(text(), 'See all')]")
      .click("//a[contains(@href, '/blocks/1') and contains(text(), 'See all')]")
      .waitForElementVisible("//h1[text() = 'Blocks']")
      .waitForElementVisible("//div[contains(., 'Generated by')]/following-sibling::div//span")
      .expect.element("//div[contains(., 'Generated by')]/following-sibling::div//span[contains(., 'arkpool')]").to.be.visible
    browserName
      .assert.urlContains('/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ/blocks/1')
  },

  'it should be possible to show the list of voters': function (browserName) {
    const devServer = browserName.globals.devServerURL + '/#/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ'

    browserName
      .url(devServer)
      .useXpath()
      .waitForElementVisible("//a[contains(@href, '/voters/1') and contains(text(), 'See all')]")
      .click("//a[contains(@href, '/voters/1') and contains(text(), 'See all')]")
      .waitForElementVisible("//h1[contains(text(), 'Voters')]")
    browserName
      .assert.urlContains('/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ/voters/1')
    browserName.end()
  }
}
