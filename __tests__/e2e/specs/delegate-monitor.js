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
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Delegate Monitor']")
  },

  'it should display delegate details': function (browser) {
    browser
      .useCss()
      .waitForElementVisible('.bg-theme-feature-background')
      .pause(2000)
      .useXpath()
    browser.expect.element("//div[contains(text(), 'Delegates')]").to.be.visible
    browser.expect.element("//div[contains(text(), 'Total forged (ARK)')]").to.be.visible
    browser.expect.element("//div[contains(text(), 'Last block')]").to.be.visible
    browser.expect.element("//div[contains(text(), 'Forged')]").to.be.visible
    browser.expect.element("//div[contains(text(), 'Delegate')]").to.be.visible
  },

  'it should fetch the latest block automatically': function (browser) {
    const element = "//div[contains(text(), 'Last block')]/following-sibling::div//a[1]/span"

    browser
      .useXpath().waitForElementVisible(element)
      .getText(element, function (result) {
        browser.expect.element(element).text.to.not.contain(result.value).after(20000)
      })
  },

  'it should fetch the delegates automatically': function (browser) {
    const element = "//div[contains(text(), 'In queue for forging')]/preceding-sibling::div"

    browser
      .useXpath().waitForElementVisible(element)
      .getText(element, function (result) {
        browser.expect.element(element).text.to.not.contain(result.value).after(20000)
      })
  },

  'it should be possible to click on the last block': function (browser) {
    browser
      .useXpath()
      .click("//div[contains(text(), 'Last block')]/following-sibling::div//a[1]")
      .pause(500)
      .waitForElementVisible("//h1[text() = 'Block']")
      .assert.urlContains('/block/')
  },

  'it should be possible to click on the delegate that forged the last block': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/delegate-monitor'

    browser
      .url(devServer)
      .useXpath()
      .waitForElementVisible("//div[contains(@class, 'bg-theme-feature-background')]/div[3]//div[contains(text(), 'Delegate')]/following-sibling::div//a[1]")
      .click("//div[contains(@class, 'bg-theme-feature-background')]/div[3]//div[contains(text(), 'Delegate')]/following-sibling::div//a[1]")
      .pause(500)
    browser
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .assert.urlContains('/wallets/')
  },

  'it should show forging stats for active delegates': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/delegate-monitor'
    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('.bg-theme-feature-background')
    browser
      .elements('css selector', 'div.meter', function (result) {
        browser.assert.equal(4, result.value.length)
      })
    browser
      .useXpath()
      .expect.element("//div[contains(text(), 'Forged block recently')]").to.be.visible
    browser.expect.element("//div[contains(text(), 'Missed block')]").to.be.visible
    browser.expect.element("//div[contains(text(), 'Not forging')]").to.be.visible
    browser.expect.element("//div[contains(text(), 'In queue for forging')]").to.be.visible
  },

  'it should be possible to sort the active delegates': function (browser) {
    browser
      .useXpath()
      .expect.element("//th[contains(., 'Name')]").to.be.present
    browser
      .assert.cssClassNotPresent("//th[contains(., 'Name')]", 'sorting-asc')
      .assert.cssClassNotPresent("//th[contains(., 'Name')]", 'sorting-desc')
    browser
      .click("//th[contains(., 'Name')]")
      .pause(500)
    browser.assert.cssClassPresent("//th[contains(., 'Name')]", 'sorting-asc')
    browser
      .click("//th[contains(., 'Name')]")
      .pause(500)
    browser.assert.cssClassPresent("//th[contains(., 'Name')]", 'sorting-desc')
  },

  'it should be possible to click on an active delegates name': function (browser) {
    browser
      .useCss()
      .waitForElementVisible('table.vgt-table')
      .useXpath()
      .click('//tbody//tr[1]//td[2]//a[1]')
      .pause(500)
    browser
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
    browser
      .assert.urlContains('/wallets/')
      .end()
  },

  'it should be possible to switch to standby delegates': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/delegate-monitor'

    browser
      .url(devServer)
      .useCss()
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
      .expect.element("//div[contains(text(), 'Forged block recently')]").to.not.be.visible
    browser.expect.element("//div[contains(text(), 'Missed block')]").to.not.be.visible
    browser.expect.element("//div[contains(text(), 'Not forging')]").to.not.be.visible
    browser.expect.element("//div[contains(text(), 'In queue for forging')]").to.not.be.visible
  },

  'it should be possible to sort the standby delegates': function (browser) {
    browser
      .useXpath().expect.element("//th[contains(., 'Name')]").to.be.present
    browser
      .assert.cssClassNotPresent("//th[contains(., 'Name')]", 'sorting-asc')
      .assert.cssClassNotPresent("//th[contains(., 'Name')]", 'sorting-desc')
    browser
      .click("//th[contains(., 'Name')]")
      .pause(500)
    browser.assert.cssClassPresent("//th[contains(., 'Name')]", 'sorting-asc')
    browser
      .click("//th[contains(., 'Name')]")
      .pause(500)
    browser.assert.cssClassPresent("//th[contains(., 'Name')]", 'sorting-desc')
  },

  'it should be possible to click on the standby delegates name': function (browser) {
    browser
      .useXpath()
      .waitForElementVisible('//tbody//tr[1]//td[2]//a[1]')
      .click('//tbody//tr[1]//td[2]//a[1]')
      .pause(500)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .assert.urlContains('/wallets/')
    browser.end()
  }
}
