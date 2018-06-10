// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Disable eslint for .to.not.be.present statements
/* eslint-disable no-unused-expressions */

module.exports = {
  // Default test, which also serves as setup for correct url
  'delegate monitor page should be available': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/delegate-monitor'

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light', 5000)
      .waitForElementVisible('h1', 5000)
      .assert.containsText('h1', 'Delegate Monitor')
  },

  'it should display delegate details': function (browser) {
    browser
      .waitForElementVisible('.bg-theme-feature-background', 5000)
      .pause(2000)
      .useXpath()
    browser.expect.element("//div[text() = 'Delegates']").to.be.visible
    browser.expect.element("//div[text() = 'Total Forged (ARK)']").to.be.visible
    browser.expect.element("//div[text() = 'Last block']").to.be.visible
    browser.expect.element("//div[text() = 'Forged']").to.be.visible
    browser.expect.element("//div[text() = 'Delegate']").to.be.visible
  },

  'it should be possible to click on the last block': function (browser) {
    browser
      .click("//div[text() = 'Last block']/following-sibling::div//a[1]")
      .pause(500)
      .waitForElementVisible("//h1[text() = 'Block']", 5000)
      .assert.urlContains('/block/')
  },

  'it should be possible to click on the delegate that forged the last block': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/delegate-monitor'

    browser
      .url(devServer)
      .useXpath()
      .waitForElementVisible("//div[text() = 'Delegate']", 5000)
      .pause(1000)
    browser
      .click("//div[contains(@class, 'bg-theme-feature-background')]/div[3]//div[text() = 'Delegate']/following-sibling::div//a[1]")
      .pause(500)
      .waitForElementVisible("//h1[text() = 'Wallet Summary']", 5000)
      .assert.urlContains('/wallets/')
  },

  'it should show forging stats for active delegates': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/delegate-monitor'
    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('.bg-theme-feature-background', 5000)
    browser
      .elements('css selector', 'div.meter', function(result) {
        browser.assert.equal(4, result.value.length)
      })
    browser
      .useXpath()
      .expect.element("//div[text() = 'Forged block recently']").to.be.visible
    browser.expect.element("//div[text() = 'Missed block']").to.be.visible
    browser.expect.element("//div[text() = 'Not forging']").to.be.visible
    browser.expect.element("//div[text() = 'In queue for forging']").to.be.visible
  },

  'it should be possible to sort the active delegates': function (browser) {
    browser
      .useXpath().expect.element("//th[contains(.,'Name')]").to.be.present
    browser
      .assert.cssClassPresent("//th[contains(.,'Name')]", 'table-component__th--sort')
      .assert.cssClassNotPresent("//th[contains(.,'Name')]", 'table-component__th--sort-asc')
      .assert.cssClassNotPresent("//th[contains(.,'Name')]", 'table-component__th--sort-desc')
    browser
      .click("//th[contains(.,'Name')]")
      .pause(500)
    browser.assert.cssClassPresent("//th[contains(.,'Name')]", 'table-component__th--sort-asc')
    browser
      .click("//th[contains(.,'Name')]")
      .pause(500)
    browser.assert.cssClassPresent("//th[contains(.,'Name')]", 'table-component__th--sort-desc')
  },

  'it should be possible to click on an active delegates name': function (browser) {
    browser
      .useCss()
      .waitForElementVisible('div.table-component', 5000)
      .useXpath().click("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[2]//a[1]")
      .pause(500)
    browser
      .useCss()
      .waitForElementVisible('main.theme-light', 5000)
      .assert.urlContains('/wallets/')
    browser
      .waitForElementVisible('h1', 5000)
      .assert.containsText('h1', 'Wallet Summary')
  },

  'it should be possible to switch to standby delegates': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/delegate-monitor'
    browser
      .url(devServer)
      .waitForElementVisible('.bg-theme-feature-background', 5000)
    browser
      .useXpath()
      .click("//div[contains(@class, 'inactive-tab') and contains(text(), 'Standby')]")
      .waitForElementVisible("//div[contains(@class, 'active-tab') and contains(text(), 'Standby')]", 5000)
    browser.expect.element("//div[contains(@class, 'active-tab') and contains(text(), 'Standby')]").to.be.present
    browser.expect.element("//div[contains(@class, 'inactive-tab') and contains(text(), 'Active')]").to.be.present
  },

  'it should not show forging stats for standby delegates': function (browser) {
    browser
      .useXpath()
      .expect.element("//div[text() = 'Forged block recently']").to.not.be.visible
    browser.expect.element("//div[text() = 'Missed block']").to.not.be.visible
    browser.expect.element("//div[text() = 'Not forging']").to.not.be.visible
    browser.expect.element("//div[text() = 'In queue for forging']").to.not.be.visible
  },

  'it should be possible to sort the standby delegates': function (browser) {
    browser
      .useXpath().expect.element("//th[contains(.,'Name')]").to.be.present
    browser
      .assert.cssClassPresent("//th[contains(.,'Name')]", 'table-component__th--sort')
      .assert.cssClassNotPresent("//th[contains(.,'Name')]", 'table-component__th--sort-asc')
      .assert.cssClassNotPresent("//th[contains(.,'Name')]", 'table-component__th--sort-desc')
    browser
      .click("//th[contains(.,'Name')]")
      .pause(500)
    browser.assert.cssClassPresent("//th[contains(.,'Name')]", 'table-component__th--sort-asc')
    browser
      .click("//th[contains(.,'Name')]")
      .pause(500)
    browser.assert.cssClassPresent("//th[contains(.,'Name')]", 'table-component__th--sort-desc')
  },

  'it should be possible to click on the standby delegates name': function (browser) {
    browser
      .useCss()
      .waitForElementVisible('div.table-component', 5000)
      .useXpath().click("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[2]//a[1]")
      .pause(500)
    browser
      .useCss()
      .waitForElementVisible('main.theme-light', 5000)
      .assert.urlContains('/wallets/')
    browser
      .waitForElementVisible('h1', 5000)
      .assert.containsText('h1', 'Wallet Summary')
    browser.end()
  }
}
