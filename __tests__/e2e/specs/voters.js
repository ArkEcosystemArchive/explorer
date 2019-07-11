// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Disable eslint for .to.not.be.present statements
/* eslint-disable no-unused-expressions */

module.exports = {
  // Default test, which also serves as setup for correct url
  'voters page should be available': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/wallets/ARAq9nhjCxwpWnGKDgxveAJSijNG8Y6dFQ/voters/1'

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light')
      .useXpath()
      .waitForElementVisible("//h1[text()[contains(., 'Voters')]]")
  },

  'it should display the delegates name': function (browser) {
    browser
      .useXpath()
      .waitForElementVisible('//h1//span')
      .expect.element("//h1//span[contains(., 'arkpool')]").to.be.visible
  },

  'it should be possible to navigate to the next page and back': function (browser) {
    browser
      .useCss()
      .waitForElementVisible('table.vgt-table')
      .assert.urlContains('/voters/1')
      .useXpath().expect.element("//button[contains(., 'Previous')]").to.not.be.visible
    browser
      .expect.element("//button[contains(., 'Next')]").to.be.visible
    browser
      .click("//button[contains(., 'Next')]")
      .pause(500)
    browser
      .assert.urlContains('/voters/2')
      .click("//button[contains(., 'Previous')]")
      .pause(500)
    browser
      .assert.urlContains('/voters/1')
  },

  'it should be possible to sort the voters': function (browser) {
    browser
      .useCss()
      .waitForElementVisible('table.vgt-table')
      .useXpath().expect.element("//th[contains(., 'Address')]").to.be.present
    browser
      .assert.cssClassNotPresent("//th[contains(., 'Address')]", 'sorting-asc')
      .assert.cssClassNotPresent("//th[contains(., 'Address')]", 'sorting-desc')
    browser
      .click("//th[contains(., 'Address')]")
      .pause(500)
    browser.assert.cssClassPresent("//th[contains(., 'Address')]", 'sorting-asc')
    browser
      .click("//th[contains(., 'Address')]")
      .pause(500)
    browser.assert.cssClassPresent("//th[contains(., 'Address')]", 'sorting-desc')
  },

  'it should contain 25 wallets on a page': function (browser) {
    browser
      .useCss()
      .expect.element('div.hidden.sm\\:block').to.be.present
    browser
      .elements('css selector', 'div.hidden.sm\\:block table.vgt-table tbody tr', function (result) {
        browser.assert.equal(25, result.value.length)
      })
  },

  'it should be possible to click on a wallet address': function (browser) {
    browser
      .useXpath()
      .waitForElementVisible('//tbody//tr[1]//td[2]//a[1]')
      .click('//tbody//tr[1]//td[2]//a[1]')
      .pause(500)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .assert.urlContains('/wallets/')
  },

  'it should redirect to 404 if the wallet address is invalid': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/wallets/ffffffffffffffffffffffffffffffffff/voters/1'

    browser
      .url(devServer)
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Ooops!']")
    browser
      .assert.urlContains('/404')
    browser.end()
  }
}
