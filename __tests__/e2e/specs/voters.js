// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Disable eslint for .to.not.be.present statements
/* eslint-disable no-unused-expressions */

module.exports = {
  // Default test, which also serves as setup for correct url
  'voters page should be available': function (browserName) {
    const devServer = browserName.globals.devServerURL + '/#/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ/voters/1'

    browserName
      .url(devServer)
      .waitForElementVisible('main.theme-light')
      .useXpath()
      .waitForElementVisible("//h1[text()[contains(., 'Voters')]]")
  },

  'it should display the delegates name': function (browserName) {
    browserName
      .useXpath()
      .waitForElementVisible('//h1//span')
      .expect.element("//h1//span[contains(., 'arkpool')]").to.be.visible
  },

  'it should be possible to navigate to the next page and back': function (browserName) {
    browserName
      .useCss()
      .waitForElementVisible('div.table-component')
      .assert.urlContains('/voters/1')
      .useXpath().expect.element("//button[contains(., 'Previous')]").to.not.be.visible
    browserName
      .expect.element("//button[contains(., 'Next')]").to.be.visible
    browserName
      .click("//button[contains(., 'Next')]")
      .pause(500)
    browserName
      .assert.urlContains('/voters/2')
      .click("//button[contains(., 'Previous')]")
      .pause(500)
    browserName
      .assert.urlContains('/voters/1')
  },

  'it should be possible to sort the voters': function (browserName) {
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
      .useXpath()
      .waitForElementVisible("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[2]//a[1]")
      .click("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[2]//a[1]")
      .pause(500)
    browserName
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .assert.urlContains('/wallets/')
  },

  'it should redirect to 404 if the wallet address is invalid': function (browserName) {
    const devServer = browserName.globals.devServerURL + '/#/wallets/ffffffffffffffffffffffffffffffffff/voters/1'

    browserName
      .url(devServer)
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Ooops!']")
    browserName
      .assert.urlContains('/404')
    browserName.end()
  }
}
