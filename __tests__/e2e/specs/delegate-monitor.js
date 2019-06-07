// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Disable eslint for .to.not.be.present statements
/* eslint-disable no-unused-expressions */

module.exports = {
  // Default test, which also serves as setup for correct url
  'delegate monitor page should be available': function (browserName) {
    const devServer = browserName.globals.devServerURL + '/#/delegate-monitor'

    browserName
      .url(devServer)
      .waitForElementVisible('main.theme-light')
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Delegate Monitor']")
  },

  'it should display delegate details': function (browserName) {
    browserName
      .useCss()
      .waitForElementVisible('.bg-theme-feature-background')
      .pause(2000)
      .useXpath()
    browserName.expect.element("//div[contains(text(), 'Delegates')]").to.be.visible
    browserName.expect.element("//div[contains(text(), 'Total forged (ARK)')]").to.be.visible
    browserName.expect.element("//div[contains(text(), 'Last block')]").to.be.visible
    browserName.expect.element("//div[contains(text(), 'Forged')]").to.be.visible
    browserName.expect.element("//div[contains(text(), 'Delegate')]").to.be.visible
  },

  'it should fetch the latest block automatically': function (browserName) {
    const element = "//div[contains(text(), 'Last block')]/following-sibling::div//a[1]/span"

    browserName
      .useXpath().waitForElementVisible(element)
      .getText(element, function (result) {
        browserName.expect.element(element).text.to.not.contain(result.value).after(20000)
      })
  },

  'it should fetch the delegates automatically': function (browserName) {
    const element = "//div[contains(text(), 'In queue for forging')]/preceding-sibling::div"

    browserName
      .useXpath().waitForElementVisible(element)
      .getText(element, function (result) {
        browserName.expect.element(element).text.to.not.contain(result.value).after(20000)
      })
  },

  'it should be possible to click on the last block': function (browserName) {
    browserName
      .useXpath()
      .click("//div[contains(text(), 'Last block')]/following-sibling::div//a[1]")
      .pause(500)
      .waitForElementVisible("//h1[text() = 'Block']")
      .assert.urlContains('/block/')
  },

  'it should be possible to click on the delegate that forged the last block': function (browserName) {
    const devServer = browserName.globals.devServerURL + '/#/delegate-monitor'

    browserName
      .url(devServer)
      .useXpath()
      .waitForElementVisible("//div[contains(@class, 'bg-theme-feature-background')]/div[3]//div[contains(text(), 'Delegate')]/following-sibling::div//a[1]")
      .click("//div[contains(@class, 'bg-theme-feature-background')]/div[3]//div[contains(text(), 'Delegate')]/following-sibling::div//a[1]")
      .pause(500)
    browserName
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .assert.urlContains('/wallets/')
  },

  'it should show forging stats for active delegates': function (browserName) {
    const devServer = browserName.globals.devServerURL + '/#/delegate-monitor'
    browserName
      .url(devServer)
      .useCss()
      .waitForElementVisible('.bg-theme-feature-background')
    browserName
      .elements('css selector', 'div.meter', function (result) {
        browserName.assert.equal(4, result.value.length)
      })
    browserName
      .useXpath()
      .expect.element("//div[contains(text(), 'Forged block recently')]").to.be.visible
    browserName.expect.element("//div[contains(text(), 'Missed block')]").to.be.visible
    browserName.expect.element("//div[contains(text(), 'Not forging')]").to.be.visible
    browserName.expect.element("//div[contains(text(), 'In queue for forging')]").to.be.visible
  },

  'it should be possible to sort the active delegates': function (browserName) {
    browserName
      .useXpath()
      .expect.element("//th[contains(., 'Name')]").to.be.present
    browserName
      .assert.cssClassPresent("//th[contains(., 'Name')]", 'table-component__th--sort')
      .assert.cssClassNotPresent("//th[contains(., 'Name')]", 'table-component__th--sort-asc')
      .assert.cssClassNotPresent("//th[contains(., 'Name')]", 'table-component__th--sort-desc')
    browserName
      .click("//th[contains(., 'Name')]")
      .pause(500)
    browserName.assert.cssClassPresent("//th[contains(., 'Name')]", 'table-component__th--sort-asc')
    browserName
      .click("//th[contains(., 'Name')]")
      .pause(500)
    browserName.assert.cssClassPresent("//th[contains(., 'Name')]", 'table-component__th--sort-desc')
  },

  'it should be possible to click on an active delegates name': function (browserName) {
    browserName
      .useCss()
      .waitForElementVisible('div.table-component')
      .useXpath()
      .click("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[2]//a[1]")
      .pause(500)
    browserName
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
    browserName
      .assert.urlContains('/wallets/')
      .end()
  },

  'it should be possible to switch to standby delegates': function (browserName) {
    const devServer = browserName.globals.devServerURL + '/#/delegate-monitor'

    browserName
      .url(devServer)
      .useCss()
      .waitForElementVisible('.bg-theme-feature-background')
    browserName
      .useXpath()
      .click("//div[contains(@class, 'inactive-tab') and contains(text(), 'Standby')]")
      .waitForElementVisible("//div[contains(@class, 'active-tab') and contains(text(), 'Standby')]")
    browserName.expect.element("//div[contains(@class, 'active-tab') and contains(text(), 'Standby')]").to.be.present
    browserName.expect.element("//div[contains(@class, 'inactive-tab') and contains(text(), 'Active')]").to.be.present
  },

  'it should not show forging stats for standby delegates': function (browserName) {
    browserName
      .useXpath()
      .expect.element("//div[contains(text(), 'Forged block recently')]").to.not.be.visible
    browserName.expect.element("//div[contains(text(), 'Missed block')]").to.not.be.visible
    browserName.expect.element("//div[contains(text(), 'Not forging')]").to.not.be.visible
    browserName.expect.element("//div[contains(text(), 'In queue for forging')]").to.not.be.visible
  },

  'it should be possible to sort the standby delegates': function (browserName) {
    browserName
      .useXpath().expect.element("//th[contains(., 'Name')]").to.be.present
    browserName
      .assert.cssClassPresent("//th[contains(., 'Name')]", 'table-component__th--sort')
      .assert.cssClassNotPresent("//th[contains(., 'Name')]", 'table-component__th--sort-asc')
      .assert.cssClassNotPresent("//th[contains(., 'Name')]", 'table-component__th--sort-desc')
    browserName
      .click("//th[contains(., 'Name')]")
      .pause(500)
    browserName.assert.cssClassPresent("//th[contains(., 'Name')]", 'table-component__th--sort-asc')
    browserName
      .click("//th[contains(., 'Name')]")
      .pause(500)
    browserName.assert.cssClassPresent("//th[contains(., 'Name')]", 'table-component__th--sort-desc')
  },

  'it should be possible to click on the standby delegates name': function (browserName) {
    browserName
      .useXpath()
      .waitForElementVisible("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[2]//a[1]")
      .click("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[2]//a[1]")
      .pause(500)
    browserName
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .assert.urlContains('/wallets/')
    browserName.end()
  }
}
