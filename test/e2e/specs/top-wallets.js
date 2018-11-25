// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Disable eslint for .to.not.be.present statements
/* eslint-disable no-unused-expressions */

module.exports = {
  // Default test, which also serves as setup for correct url
  'top wallets page should be available': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/top-wallets/1'

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light')
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Top Wallets']")
  },

  'it should be possible to navigate to the next page and back': function (browser) {
    browser
      .assert.urlContains('/top-wallets/1')
      .useXpath().expect.element("//button[contains(., 'Previous')]").to.not.be.visible
    browser
      .expect.element("//button[contains(., 'Next')]").to.be.visible
    browser
      .click("//button[contains(., 'Next')]")
      .pause(500)
      .useCss().waitForElementVisible('div.table-component')
    browser
      .assert.urlContains('/top-wallets/2')
      .useXpath().click("//button[contains(., 'Previous')]")
      .pause(500)
      .useCss().waitForElementVisible('div.table-component')
    browser
      .assert.urlContains('/top-wallets/1')
  },

  'it should be possible to sort the wallets': function (browser) {
    browser
      .useCss()
      .waitForElementVisible('div.table-component')
      .useXpath().expect.element("//th[contains(., 'Address')]").to.be.present
    browser
      .assert.cssClassPresent("//th[contains(., 'Address')]", 'table-component__th--sort')
      .assert.cssClassNotPresent("//th[contains(., 'Address')]", 'table-component__th--sort-asc')
      .assert.cssClassNotPresent("//th[contains(., 'Address')]", 'table-component__th--sort-desc')
    browser
      .click("//th[contains(., 'Address')]")
      .pause(500)
    browser.assert.cssClassPresent("//th[contains(., 'Address')]", 'table-component__th--sort-asc')
    browser
      .click("//th[contains(., 'Address')]")
      .pause(500)
    browser.assert.cssClassPresent("//th[contains(., 'Address')]", 'table-component__th--sort-desc')
  },

  'it should contain 25 wallets on a page': function (browser) {
    browser
      .useCss()
      .expect.element('div.hidden.sm\\:block').to.be.present
    browser
      .elements('css selector', 'div.hidden.sm\\:block div.table-component tbody.table-component__table__body tr', function(result) {
        browser.assert.equal(25, result.value.length)
      })
  },

  'it should be possible to click on a wallet address': function (browser) {
    browser
      .useCss()
      .waitForElementVisible('div.table-component')
      .useXpath().click("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[2]//a[1]")
      .pause(500)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .assert.urlContains('/wallets/')
    browser.end()
  }
}
