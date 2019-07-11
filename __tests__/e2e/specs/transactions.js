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
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Transactions']")
  },

  'it should show 25 transactions in the table': function (browser) {
    browser
      .useCss()
      .expect.element('div.hidden.sm\\:block').to.be.present
    browser
      .elements('css selector', 'div.hidden.sm\\:block table.vgt-table tbody tr', function (result) {
        browser.assert.equal(25, result.value.length)
      })
  },

  'it should be possible to sort the table': function (browser) {
    browser
      .useXpath().expect.element("//th[contains(., 'ID')]").to.be.present
    browser
      .assert.cssClassNotPresent("//th[contains(., 'ID')]", 'sorting-asc')
      .assert.cssClassNotPresent("//th[contains(., 'ID')]", 'sorting-desc')
    browser
      .click("//th[contains(., 'ID')]")
      .pause(500)
    browser.assert.cssClassPresent("//th[contains(., 'ID')]", 'sorting-asc')
    browser
      .click("//th[contains(., 'ID')]")
      .pause(500)
    browser.assert.cssClassPresent("//th[contains(., 'ID')]", 'sorting-desc')
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
      .useCss().waitForElementVisible('table.vgt-table')
    browser
      .assert.urlContains('/transactions/2')
      .useXpath().click("//button[contains(., 'Previous')]")
      .pause(500)
      .useCss().waitForElementVisible('table.vgt-table')
    browser
      .assert.urlContains('/transactions/1')
  },

  'it should be possible to click on the transaction id': function (browser) {
    browser
      .useCss()
      .waitForElementVisible('main.theme-light')
      .useXpath()
      .waitForElementVisible('//tbody//tr[1]//td[1]//a[1]')
    browser
      .click('//tbody//tr[1]//td[1]//a[1]')
      .pause(500)
    browser
      .waitForElementVisible("//h1[text() = 'Transaction']")
      .assert.urlContains('/transaction/')
  },

  'it should refresh the confirmation count automatically': function (browser) {
    const element = "//div[contains(@class, 'list-row-border-b')][3]//div[2]"

    browser
      .useCss()
      .waitForElementVisible('div.list-row-border-b')
      .useXpath()
      .getText(element, function (result) {
        browser.expect.element(element).text.to.not.contain(result.value).after(20000)
      })
  },

  'it should be possible to click on the sender': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/transactions/1'

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('main.theme-light')
      .useXpath()
      .waitForElementVisible('//tbody//tr[1]//td[3]//a[1]')
    browser
      .click('//tbody//tr[1]//td[3]//a[1]')
      .pause(500)
    browser
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .assert.urlContains('/wallets/')
  },

  'it should be possible to click on the recipient if it contains a link': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/transactions/1'

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('main.theme-light')
    browser
      .useXpath()
      .waitForElementVisible('//tbody//tr[1]')
      .element('xpath', '//tbody//tr[1]//td[4]//a[1]', (result) => {
        if (result.status === -1) {
          console.log('No link present')
        } else {
          console.log('Link is present')
          browser
            .waitForElementVisible('//tbody//tr[1]//td[4]//a[1]')
            .pause(500)
            .click('//tbody//tr[1]//td[4]//a[1]')
            .pause(500)
          browser
            .waitForElementVisible("//h1[text() = 'Wallet summary']")
            .assert.urlContains('/wallets/')
        }
      })
    browser.end()
  },

  'it should contain a dropdown allowing to filter transactions types': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/transactions/1'

    browser
      .url(devServer)
      .assert.urlContains('/transactions/1')
    browser
      .useXpath()
      .waitForElementVisible("//span[contains(@class, 'mr-1') and text() = 'All']")
      .click("//span[contains(@class, 'mr-1') and text() = 'All']")
    browser
      .waitForElementVisible("(//div[contains(@class, 'dropdown-button') and text() = 'Vote'])[2]")
      .click("(//div[contains(@class, 'dropdown-button') and text() = 'Vote'])[2]")
      .waitForElementVisible("//span[contains(@class, 'mr-1') and text() = 'Vote']")
    browser.end()
  }
}
