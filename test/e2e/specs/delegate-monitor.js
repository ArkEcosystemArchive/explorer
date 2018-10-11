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
      .waitForElementVisible('main.theme-light')
      .waitForElementVisible('h1')
      .assert.containsText('h1', 'Delegate Monitor')
  },

  'it should display delegate details': function (browser) {
    browser
      .waitForElementVisible('.bg-theme-feature-background')
      .pause(2000)
      .useXpath()
    browser.expect.element("//div[text() = 'Delegates']").to.be.visible
    browser.expect.element("//div[text() = 'Total Forged (ARK)']").to.be.visible
    browser.expect.element("//div[text() = 'Last block']").to.be.visible
    browser.expect.element("//div[text() = 'Forged']").to.be.visible
    browser.expect.element("//div[text() = 'Delegate']").to.be.visible
  },

  'it should fetch the latest block automatically': function (browser) {
    browser
      .useXpath().waitForElementVisible("//div[text() = 'Last block']")
      .getText("//div[text() = 'Last block']/following-sibling::div//a[1]/span", function(result) {
        const blockId = result.value

        browser
          .expect.element("//div[text() = 'Last block']/following-sibling::div//a[1]/span[text() = '" + blockId + "']").to.be.present
        browser
          .waitForElementNotPresent("//div[text() = 'Last block']/following-sibling::div//a[1]/span[text() = '" + blockId + "']", 20000)
        browser
          .getText("//div[text() = 'Last block']/following-sibling::div//a[1]/span", function(result) {
            browser.assert.notEqual(result.value, blockId)
          })
      })
  },

  'it should fetch the delegates automatically': function (browser) {
    browser
      .useXpath().waitForElementVisible("//div[text() = 'In queue for forging']")
      .getText("//div[text() = 'In queue for forging']/preceding-sibling::div", function(result) {
        const queueCount = result.value

        browser
          .expect.element("//div[text() = 'In queue for forging']/preceding-sibling::div[text() = '" + queueCount + "']").to.be.present
        browser
          .waitForElementNotPresent("//div[text() = 'In queue for forging']/preceding-sibling::div[text() = '" + queueCount + "']", 20000)
        browser
          .getText("//div[text() = 'In queue for forging']/preceding-sibling::div", function(result) {
            browser.assert.notEqual(result.value, queueCount)
          })
      })
  },

  'it should be possible to click on the last block': function (browser) {
    browser
      .useXpath()
      .click("//div[text() = 'Last block']/following-sibling::div//a[1]")
      .pause(500)
      .waitForElementVisible("//h1[text() = 'Block']")
      .assert.urlContains('/block/')
  },

  'it should be possible to click on the delegate that forged the last block': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/delegate-monitor'

    browser
      .url(devServer)
      .useXpath()
      .waitForElementVisible("//div[contains(@class, 'bg-theme-feature-background')]/div[3]//div[text() = 'Delegate']/following-sibling::div//a[1]")
      .click("//div[contains(@class, 'bg-theme-feature-background')]/div[3]//div[text() = 'Delegate']/following-sibling::div//a[1]")
      .pause(500)
    browser
      .waitForElementVisible("//h1[text() = 'Wallet Summary']")
      .assert.urlContains('/wallets/')
  },

  'it should show forging stats for active delegates': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/delegate-monitor'
    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('.bg-theme-feature-background')
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
      .waitForElementVisible('div.table-component')
      .useXpath().click("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[2]//a[1]")
      .pause(500)
    browser
      .useCss()
      .waitForElementVisible('h1')
      .assert.containsText('h1', 'Wallet Summary')
      .assert.urlContains('/wallets/')
  },

  'it should be possible to switch to standby delegates': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/delegate-monitor'
    browser
      .url(devServer)
      .waitForElementVisible('.bg-theme-feature-background')
    browser
      .useXpath()
      .click("//div[contains(@class, 'inactive-tab') and contains(text(), 'Standby')]")
      .waitForElementVisible("//div[contains(@class, 'active-tab') and contains(text(), 'Standby')]")
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
      .useXpath()
      .waitForElementVisible("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[2]//a[1]")
      .click("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[2]//a[1]")
      .pause(500)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet Summary']")
      .assert.urlContains('/wallets/')
    browser.end()
  }
}
