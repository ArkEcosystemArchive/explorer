// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Disable eslint for .to.not.be.present statements
/* eslint-disable no-unused-expressions */

module.exports = {
  // Default homepage test, which also serves as setup for correct url
  'homepage should be available': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light')
      .waitForElementVisible('h1')
      .assert.containsText('h1', 'Latest transactions and blocks')
  },

  'homepage should contain expected components': function(browser) {
    browser
      .elements('css selector', '.bg-stat-background > div', function(result) {
        browser.elementIdText(result.value[0].ELEMENT, function(elemResult) {
          browser.assert.ok(elemResult.value.startsWith('Height'))
        })
        browser.elementIdText(result.value[1].ELEMENT, function(elemResult) {
          browser.assert.ok(elemResult.value.startsWith('Network'))
        })
        browser.elementIdText(result.value[2].ELEMENT, function(elemResult) {
          browser.assert.ok(elemResult.value.startsWith('Supply'))
        })
        browser.elementIdText(result.value[3].ELEMENT, function(elemResult) {
          browser.assert.ok(elemResult.value.startsWith('Market Cap'))
        })
      })
      .assert.visible('#line-chart')
      .assert.containsText('div .active-tab', 'Latest Transactions')
      .assert.containsText('div .inactive-tab', 'Latest Blocks')
  },

  // Header tests
  'header should be able to toggle chart': function(browser) {
    browser
      .assert.visible('#line-chart')
      .waitForElementVisible('button.text-chart-active')
      .click('button.text-chart-active')
      .waitForElementNotPresent('#line-chart')
    browser
      .waitForElementVisible('button.text-chart-inactive')
      .click('button.text-chart-inactive')
      .waitForElementVisible('#line-chart')
  },

  'header should be able to toggle theme': function(browser) {
    browser
      .useCss()
      .assert.cssClassPresent('main', 'theme-light')
    browser
      .click('button.text-yellow')
      .pause(500)
    browser.assert.cssClassPresent('main', 'theme-dark')
    browser
      .click('button.text-yellow')
      .pause(500)
    browser.assert.cssClassPresent('main', 'theme-light')
  },

  'header should be able to change currency': function(browser) {
    browser.useXpath().click("//button[contains(., 'ARK/USD')]")
    browser
      .useCss()
      .assert.visible('.menu-button')
      .assert.visible('.close-button')
    browser
      .useXpath()
      .click("//button[contains(., 'ETH')]")
      .waitForElementVisible("//button[contains(., 'ARK/ETH')]")
    browser
      .click("//button[contains(., 'ARK/ETH')]")
      .useCss().waitForElementVisible('.close-button')
    browser
      .useXpath()
      .click("//button[contains(., 'USD')]")
      .waitForElementVisible("//button[contains(., 'ARK/USD')]")
    browser
      .useCss()
      .expect.element('.menu-button').to.not.be.present
    browser
      .expect.element('.close-button').to.not.be.present
  },

  // Footer tests
  'footer should contain links': function(browser) {
    browser
      .assert.visible('footer > div.text-center')
      .elements('css selector', 'footer > div.text-center a', function(result) {
        browser.assert.ok(result.value.length > 0)
      })
  },

  // Menu tests
  'menu should be able to be opened and closed': function(browser) {
    browser
      .click('button.border-transparent')
      .pause(500)
    browser.assert.visible('.menu-button')
    browser.elements('css selector', '.menu-button', function(result) {
      browser.elementIdText(result.value[0].ELEMENT, function(elemResult) {
        browser.assert.ok(elemResult.value === 'Home')
      })
      browser.elementIdText(result.value[1].ELEMENT, function(elemResult) {
        browser.assert.ok(elemResult.value === 'Top Wallets')
      })
      browser.elementIdText(result.value[2].ELEMENT, function(elemResult) {
        browser.assert.ok(elemResult.value === 'Delegate Monitor')
      })
    })

    // TODO: close menu again
  },

  'from menu, it should be possible to navigate to top wallets': function(browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light')
      .waitForElementVisible('button.border-transparent')
      .click('button.border-transparent')
    browser
      .useXpath()
      .waitForElementVisible("//button[contains(., 'Top Wallets')]")
      .click("//button[contains(., 'Top Wallets')]")
      .pause(500)
    browser
      .waitForElementVisible("//h1[text() = 'Top Wallets']")
      .assert.urlContains('/top-wallets')
  },

  'from menu, it should be possible to navigate to delegate monitor': function(browser) {
    browser
      .useCss().click('button.border-transparent')
      .useXpath()
      .waitForElementVisible("//button[contains(., 'Delegate Monitor')]")
      .click("//button[contains(., 'Delegate Monitor')]")
      .pause(500)
    browser
      .waitForElementVisible("//h1[text() = 'Delegate Monitor']")
      .assert.urlContains('/delegate-monitor')
  },

  'from menu, it should be possible to navigate back to homepage': function(browser) {
    browser
      .useCss().click('button.border-transparent')
      .useXpath()
      .waitForElementVisible("//button[contains(., 'Home')]")
      .click("//button[contains(., 'Home')]")
      .pause(500)
    browser
      .waitForElementVisible("//h1[text() = 'Latest transactions and blocks']")
      .assert.urlContains('/#')
  },

  'it should be possible to switch to latest blocks': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useXpath()
      .click("//div[contains(@class, 'inactive-tab') and contains(text(), 'Latest Blocks')]")
      .waitForElementVisible("//div[contains(@class, 'active-tab') and contains(text(), 'Latest Blocks')]")
    browser.expect.element("//div[contains(@class, 'active-tab') and contains(text(), 'Latest Blocks')]").to.be.present
    browser.expect.element("//div[contains(@class, 'inactive-tab') and contains(text(), 'Latest Transactions')]").to.be.present
  },

  'latest block table should refresh automatically': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useXpath()
      .click("//div[contains(@class, 'inactive-tab') and contains(text(), 'Latest Blocks')]")
      .waitForElementVisible("//thead[contains(@class, 'table-component__table__head')]//tr[1]//th[4][contains(., 'Transactions')]")
    browser
      .getText("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[2]", function(result) {
        const blockId = result.value

        browser
          .expect.element("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[2][contains(., '" + blockId + "')]").to.be.present
        browser
          .waitForElementNotPresent("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[2][contains(., '" + blockId + "')]", 20000)
        browser
          .getText("//tbody[contains(@class, 'table-component__table__body')]//tr[1]//td[2]", function(result) {
            browser.assert.notEqual(result.value, blockId)
          })
      })
  },

  // Search tests
  'it should be possible to search for a known wallet': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('input#search')
    browser
      .click('input#search')
      .waitForElementVisible('input.search-input')
      .setValue('input.search-input', ['ARK Bounty', browser.Keys.ENTER])
      .pause(1000)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet Summary']")
      .assert.urlContains('/wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs')
  },

  'it should be possible to search for a delegate': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('input#search')
    browser
      .click('input#search')
      .waitForElementVisible('input.search-input')
      .setValue('input.search-input', ['genesis_1', browser.Keys.ENTER])
      .pause(1000)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet Summary']")
      .assert.urlContains('/wallets/AeLpRK8rFVtBeyBVqBtdQpWDfLzaiNujKr')
  },

  'it should be possible to search for an address': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('input#search')
    browser
      .click('input#search')
      .waitForElementVisible('input.search-input')
      .setValue('input.search-input', ['AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv', browser.Keys.ENTER])
      .pause(1000)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet Summary']")
      .assert.urlContains('/wallets/AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv')
  },

  'it should be possible to search for a block ID': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('input#search')
    browser
      .click('input#search')
      .waitForElementVisible('input.search-input')
      .setValue('input.search-input', ['13507259488170268466', browser.Keys.ENTER])
      .pause(1000)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Block']")
      .assert.urlContains('/block/13507259488170268466')
  },

  'it should be possible to search for a transaction ID': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('input#search')
    browser
      .click('input#search')
      .waitForElementVisible('input.search-input')
      .setValue('input.search-input', ['4a169d00de2029110829fad77eebf6fd25751418b47561f05b994750acbd3b13', browser.Keys.ENTER])
      .pause(1000)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Transaction']")
      .assert.urlContains('/transaction/4a169d00de2029110829fad77eebf6fd25751418b47561f05b994750acbd3b13')
  },

  'search should show a notice if nothing could be found': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('input#search')
    browser
      .click('input#search')
      .waitForElementVisible('input.search-input')
      .setValue('input.search-input', ['asdfnothingfoundforthisvalueasdf', browser.Keys.ENTER])
      .pause(1000)
    browser
      .useXpath()
      .waitForElementVisible("//div[contains(@class, 'tooltip-inner') and text() = 'Nothing matched your search']")
      .end()
  }
}
