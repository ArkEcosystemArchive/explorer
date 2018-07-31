// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Disable eslint for .to.not.be.present statements
/* eslint-disable no-unused-expressions */

module.exports = {
  // Default test, which also serves as setup for correct url
  'transaction page should be available': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/transactions/1'

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light')
      .waitForElementVisible('h1')
      .assert.containsText('h1', 'Transactions')
  },

  'it should show 25 transactions in the table': function (browser) {
    browser
      .expect.element('div.hidden.sm\\:block').to.be.present
    browser
      .elements('css selector', 'div.hidden.sm\\:block div.table-component tbody.table-component__table__body tr', function(result) {
        browser.assert.equal(25, result.value.length)
      })
  },

  'it should be possible to sort the table': function (browser) {
    browser
      .useXpath().expect.element("//th[contains(.,'ID')]").to.be.present
    browser
      .assert.cssClassPresent("//th[contains(.,'ID')]", 'table-component__th--sort')
      .assert.cssClassNotPresent("//th[contains(.,'ID')]", 'table-component__th--sort-asc')
      .assert.cssClassNotPresent("//th[contains(.,'ID')]", 'table-component__th--sort-desc')
    browser
      .click("//th[contains(.,'ID')]")
      .pause(500)
    browser.assert.cssClassPresent("//th[contains(.,'ID')]", 'table-component__th--sort-asc')
    browser
      .click("//th[contains(.,'ID')]")
      .pause(500)
    browser.assert.cssClassPresent("//th[contains(.,'ID')]", 'table-component__th--sort-desc')
  },

  'it should be possible to navigate to the next page and back': function (browser) {
    browser
      .assert.urlContains('/transactions/1')
      .useXpath().expect.element("//button[contains(., 'Previous')]").to.not.be.visible
    browser
      .expect.element("//button[contains(., 'Next')]").to.be.visible
    browser
      .click("//button[contains(., 'Next')]")
      .pause(500)
      .useCss().waitForElementVisible('div.table-component')
    browser
      .assert.urlContains('/transactions/2')
      .useXpath().click("//button[contains(., 'Previous')]")
      .pause(500)
      .useCss().waitForElementVisible('div.table-component')
    browser
      .assert.urlContains('/transactions/1')
  },

  'it should be possible to click on the transactions id': function (browser) {
    browser
      .useXpath()
      .waitForElementVisible("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[1]//a[1]")
      .click("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[1]//a[1]")
      .pause(500)
    browser
      .useCss()
      .waitForElementVisible('h1')
      .assert.containsText('h1', 'Transaction')
      .assert.urlContains('/transaction/')
  },

  'it should be possible to click on the sender': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/transactions/1'

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light')
      .useXpath()
      .waitForElementVisible("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[3]//a[1]")
    browser
      .click("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[3]//a[1]")
      .pause(500)
    browser
      .useCss()
      .waitForElementVisible('h1')
      .assert.containsText('h1', 'Wallet Summary')
      .assert.urlContains('/wallets/')
  },

  // TODO: unsure why this one doesn't work, needs to be looked into further
  // 'it should be possible to click on the recipient': function (browser) {
  //   const devServer = browser.globals.devServerURL + '/#/transactions/1'

  //   browser
  //     .url(devServer)
  //     .waitForElementVisible('main.theme-light')
  //     .useXpath()
  //     .waitForElementVisible("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[4]//a[1]")
  //     .pause(500)
  //   browser
  //     .click("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[4]//a[1]")
  //     .pause(500)
  //   browser
  //     .waitForElementVisible("//h1[text() = Wallet Summary]")
  //     .assert.urlContains('/wallets/')
  //     .end()
  // }
}
