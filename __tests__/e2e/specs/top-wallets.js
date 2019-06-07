// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Disable eslint for .to.not.be.present statements
/* eslint-disable no-unused-expressions */

module.exports = {
  // Default test, which also serves as setup for correct url
  'top wallets page should be available': function (browserName) {
    const devServer = browserName.globals.devServerURL + '/#/top-wallets/1'

    browserName
      .url(devServer)
      .waitForElementVisible('main.theme-light')
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Top Wallets']")
  },

  'it should be possible to navigate to the next page and back': function (browserName) {
    browserName
      .assert.urlContains('/top-wallets/1')
      .useXpath().expect.element("//button[contains(., 'Previous')]").to.not.be.visible
    browserName
      .expect.element("//button[contains(., 'Next')]").to.be.visible
    browserName
      .click("//button[contains(., 'Next')]")
      .pause(500)
      .useCss().waitForElementVisible('div.table-component')
    browserName
      .assert.urlContains('/top-wallets/2')
      .useXpath().click("//button[contains(., 'Previous')]")
      .pause(500)
      .useCss().waitForElementVisible('div.table-component')
    browserName
      .assert.urlContains('/top-wallets/1')
  },

  'it should be possible to sort the wallets': function (browserName) {
    browserName
      .useCss()
      .waitForElementVisible('div.table-component')
      .useXpath().expect.element("//th[contains(., 'Address')]").to.be.present
    browserName
      .assert.cssClassPresent("//th[contains(., 'Address')]", 'table-component__th--sort')
      .assert.cssClassNotPresent("//th[contains(., 'Address')]", 'table-component__th--sort-asc')
      .assert.cssClassNotPresent("//th[contains(., 'Address')]", 'table-component__th--sort-desc')
    browserName
      .click("//th[contains(., 'Address')]")
      .pause(500)
    browserName.assert.cssClassPresent("//th[contains(., 'Address')]", 'table-component__th--sort-asc')
    browserName
      .click("//th[contains(., 'Address')]")
      .pause(500)
    browserName.assert.cssClassPresent("//th[contains(., 'Address')]", 'table-component__th--sort-desc')
  },

  'it should contain 25 wallets on a page': function (browserName) {
    browserName
      .useCss()
      .expect.element('div.hidden.sm\\:block').to.be.present
    browserName
      .elements('css selector', 'div.hidden.sm\\:block div.table-component tbody.table-component__table__body tr', function (result) {
        browserName.assert.equal(25, result.value.length)
      })
  },

  'it should be possible to click on a wallet address': function (browserName) {
    browserName
      .useCss()
      .waitForElementVisible('div.table-component')
      .useXpath().click("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[2]//a[1]")
      .pause(500)
    browserName
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .assert.urlContains('/wallets/')
    browserName.end()
  }
}
