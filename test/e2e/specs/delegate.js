// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Disable eslint for .to.not.be.present statements
/* eslint-disable no-unused-expressions */

module.exports = {
  // Default test, which also serves as setup for correct url
  'delegate wallet summary page should be available': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ'

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

  'it should show a list of transactions, including show more button': function (browser) {
    browser
      .useXpath()
      .waitForElementVisible("//tbody[contains(@class, 'table-component__table__body')]")
      .useCss()
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
      .waitForElementVisible('div.modal-container')
    browser
      .click('button.absolute.pin-t')
      .waitForElementNotPresent('div.modal-container')
  },

  'it should show delegate information': function (browser) {
    browser
      .useXpath()
      .expect.element("//div[text() = 'Delegate']").to.be.present
    browser.expect.element("//div[text() = 'Uptime']").to.be.present
    browser.expect.element("//div[text() = 'Rank/Status']").to.be.present
    browser.expect.element("//div[text() = 'Approval']").to.be.present
    browser.expect.element("//div[text() = 'Forged']").to.be.present
    browser.expect.element("//div[text() = 'Blocks']").to.be.present
  },

  'it should show who the wallet voted for': function (browser) {
    browser
      .useXpath().expect.element("//div[text() = 'Votes']").to.be.present
    browser
      .expect.element("//div[text() = 'Votes']/following-sibling::div//a").to.be.present
  },

  'it should be possible to show the list of forged blocks': function (browser) {
    browser
      .click("//a[contains(@href, '/blocks/1') and text() = 'See all']")
      .waitForElementVisible("//h1[contains(., 'Blocks')]")
      .waitForElementVisible('//h1//span')
      .expect.element("//h1//span[contains(., 'arkpool')]").to.be.visible
    browser
      .assert.urlContains('/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ/blocks/1')
  },

  'it should be possible to show the list of voters': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ'

    browser
      .url(devServer)
      .useXpath()
      .waitForElementVisible("//a[contains(@href, '/voters/1') and text() = 'See all']")
      .click("//a[contains(@href, '/voters/1') and text() = 'See all']")
      .waitForElementVisible("//h1[contains(text(), 'Voters')]")
    browser
      .assert.urlContains('/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ/voters/1')
    browser.end()
  }
}
