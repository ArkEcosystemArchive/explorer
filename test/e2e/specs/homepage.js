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
      .waitForElementVisible('main.theme-light', 5000)
      .waitForElementVisible('h1', 5000)
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
      .click('button.text-chart-active')
      .useXpath().waitForElementNotVisible("//canvas[@id = 'line-chart']", 5000)
    browser
      .useCss().click('button.text-chart-inactive')
      .useXpath().waitForElementVisible("//canvas[@id = 'line-chart']", 5000)
  },

  'header should be able to toggle theme': function(browser) {
    browser.assert.cssClassPresent('main', 'theme-light')
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
      .waitForElementVisible("//button[contains(., 'ARK/ETH')]", 5000)
    browser
      .click("//button[contains(., 'ARK/ETH')]")
      .useCss().waitForElementVisible('.close-button', 5000)
    browser
      .useXpath()
      .click("//button[contains(., 'USD')]")
      .waitForElementVisible("//button[contains(., 'ARK/USD')]", 5000)
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
        console.log(result.value)
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
      .waitForElementVisible('main.theme-light', 5000)
      .click('button.border-transparent')

    browser
      .useXpath().click("//button[contains(., 'Top Wallets')]")
      .pause(1000)
      .assert.urlContains('/top-wallets')
  },

  'from menu, it should be possible to navigate to delegate monitor': function(browser) {
    browser
      .useCss().click('button.border-transparent')
      .useXpath().click("//button[contains(., 'Delegate Monitor')]")
      .pause(1000)
      .assert.urlContains('/delegate-monitor')
  },

  'from menu, it should be possible to navigate back to homepage': function(browser) {
    browser
      .useCss().click('button.border-transparent')
      .useXpath().click("//button[contains(., 'Home')]")
      .pause(1000)
      .assert.urlContains('/#')
  },

  // Search tests
  'it should be possible to search for a known wallet': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('input#search', 5000)
    browser
      .click('input#search')
      .waitForElementVisible('input.search-input', 5000)
      .setValue('input.search-input', ['ARK Bounty', browser.Keys.ENTER])
      .pause(1000)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet Summary']", 5000)
      .assert.urlContains('/wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs')
  },

  'it should be possible to search for a delegate': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('input#search', 5000)
    browser
      .click('input#search')
      .waitForElementVisible('input.search-input', 5000)
      .setValue('input.search-input', ['genesis_1', browser.Keys.ENTER])
      .pause(1000)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet Summary']", 5000)
      .assert.urlContains('/wallets/AeLpRK8rFVtBeyBVqBtdQpWDfLzaiNujKr')
  },

  'it should be possible to search for an address': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('input#search', 5000)
    browser
      .click('input#search')
      .waitForElementVisible('input.search-input', 5000)
      .setValue('input.search-input', ['AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv', browser.Keys.ENTER])
      .pause(1000)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet Summary']", 5000)
      .assert.urlContains('/wallets/AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv')
  },

  'it should be possible to search for a block ID': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('input#search', 5000)
    browser
      .click('input#search')
      .waitForElementVisible('input.search-input', 5000)
      .setValue('input.search-input', ['13507259488170268466', browser.Keys.ENTER])
      .pause(1000)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Block']", 5000)
      .assert.urlContains('/block/13507259488170268466')
  },

  'it should be possible to search for a transaction ID': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('input#search', 5000)
    browser
      .click('input#search')
      .waitForElementVisible('input.search-input', 5000)
      .setValue('input.search-input', ['4a169d00de2029110829fad77eebf6fd25751418b47561f05b994750acbd3b13', browser.Keys.ENTER])
      .pause(1000)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Transaction']", 5000)
      .assert.urlContains('/transaction/4a169d00de2029110829fad77eebf6fd25751418b47561f05b994750acbd3b13')
  },

  'search should show a notice if nothing could be found': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('input#search', 5000)
    browser
      .click('input#search')
      .waitForElementVisible('input.search-input', 5000)
      .setValue('input.search-input', ['asdfnothingfoundforthisvalueasdf', browser.Keys.ENTER])
      .pause(1000)
    browser
      .useXpath()
      .waitForElementVisible("//div[contains(@class, 'tooltip-inner') and text() = 'Nothing matched your search']", 5000)
      .end()
  }
}
