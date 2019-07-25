// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Disable eslint for .to.not.be.present statements
/* eslint-disable no-unused-expressions */

const events = require('events')
events.EventEmitter.defaultMaxListeners = 50

module.exports = {
  // Default homepage test, which also serves as setup for correct url
  'homepage should be available': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light')
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Latest transactions and blocks']")
  },

  'homepage should contain expected components': function (browser) {
    browser
      .useCss()
      .elements('css selector', '.bg-stat-background > div', function (result) {
        browser.elementIdText(result.value[0].ELEMENT, function (elemResult) {
          browser.assert.ok(elemResult.value.startsWith('Height'))
        })
        browser.elementIdText(result.value[1].ELEMENT, function (elemResult) {
          browser.assert.ok(elemResult.value.startsWith('Network'))
        })
        browser.elementIdText(result.value[2].ELEMENT, function (elemResult) {
          browser.assert.ok(elemResult.value.startsWith('Supply'))
        })
        browser.elementIdText(result.value[3].ELEMENT, function (elemResult) {
          browser.assert.ok(elemResult.value.startsWith('Market Cap'))
        })
      })
      .assert.visible('#line-chart')
      .assert.containsText('div .active-tab', 'Latest transactions')
      .assert.containsText('div .inactive-tab', 'Latest blocks')
  },

  // Header tests

  'header should be able to toggle chart': function (browser) {
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

  'header should be able to toggle theme': function (browser) {
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

  'header should be able to change currency': function (browser) {
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

  'footer should contain links': function (browser) {
    browser
      .assert.visible('footer > div.text-center')
      .elements('css selector', 'footer > div.text-center a', function (result) {
        browser.assert.ok(result.value.length > 0)
      })
  },

  // Chart tests

  'price chart should contain buttons for the period': function (browser) {
    const periods = ['Day', 'Week', 'Month', 'Quarter', 'Year']

    periods.forEach(period => {
      browser
        .useXpath()
        .assert.visible(`//button[contains(@class, 'chart-tab') and contains(., '${period}')]`)
    })
  },

  'should be possible to change period': function (browser) {
    browser
      .useXpath()
      .assert.cssClassPresent("//button[contains(@class, 'chart-tab') and contains(., 'Day')]", 'chart-tab-active')
    browser
      .click("//button[contains(@class, 'chart-tab') and contains(., 'Week')]")
    browser
      .assert.cssClassNotPresent("//button[contains(@class, 'chart-tab') and contains(., 'Day')]", 'chart-tab-active')
      .assert.cssClassPresent("//button[contains(@class, 'chart-tab') and contains(., 'Week')]", 'chart-tab-active')
  },

  'should still display the selected period after changing pages': function (browser) {
    const devServer = browser.globals.devServerURL + '/transactions'

    browser
      .url(devServer)
      .waitForElementVisible("//a[contains(@class, 'logo-container')]")
      .click("//a[contains(@class, 'logo-container')]")
      .waitForElementVisible("//button[contains(@class, 'chart-tab')]")
    browser
      .assert.cssClassPresent("//button[contains(@class, 'chart-tab') and contains(., 'Week')]", 'chart-tab-active')
  },

  // Language switcher tests

  'language menu should open and close': function (browser) {
    browser
      .useCss()
      .click('#language-icon')
      .pause(500)

    browser.assert.visible('.language-menu')

    browser
      .click('.close-button')
      .pause(500)

    browser.assert.elementNotPresent('.language-menu')
  },

  'language menu should contain flag images': function (browser) {
    browser
      .click('#language-icon')
      .pause(500)

    // flag is image of type svg so it must've been found
    browser.assert.visible('.language-menu img.flag-image')
    browser.assert.attributeContains('.language-menu img.flag-image', 'src', 'image/svg')

    browser
      .click('.close-button')
      .pause(500)
  },

  'from language menu, it should be possible to change language': function (browser) {
    // select first language
    browser
      .waitForElementVisible('#language-icon')
      .click('#language-icon')
      .pause(500)
      .click('.language-menu button:nth-child(1) img.flag-image')
      .pause(1000)
    browser.getText('h1', function (result) {
      // select second language
      browser
        .click('#language-icon')
        .pause(500)
        .click('.language-menu button:nth-child(2) img.flag-image')
        .pause(1000)
      browser.getText('h1', function (result2) {
        // translation should've changed
        browser.assert.notEqual(result.value, result2.value)

        // end session to restore default language (for other tests)
        browser.end()
      })
    })
  },

  // Menu tests

  'menu should be able to be opened and closed': function (browser) {
    const devServer = browser.globals.devServerURL
    browser
      .url(devServer)
      .waitForElementVisible('h1')
      .click('button.border-transparent')
      .pause(500)
    browser.assert.visible('.menu-button')
    browser.elements('css selector', '.menu-button', function (result) {
      browser.elementIdText(result.value[0].ELEMENT, function (elemResult) {
        browser.assert.equal(elemResult.value, 'Home')
      })
      browser.elementIdText(result.value[1].ELEMENT, function (elemResult) {
        browser.assert.equal(elemResult.value, 'Top Wallets')
      })
      browser.elementIdText(result.value[2].ELEMENT, function (elemResult) {
        browser.assert.equal(elemResult.value, 'Delegate Monitor')
      })
    })

    // TODO: close menu again
  },

  'from menu, it should be possible to navigate to top wallets': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .useCss()
      .url(devServer)
      .waitForElementVisible('main.theme-light')
      .useXpath()
      .waitForElementVisible("//button[contains(@class, 'border-transparent')]//span[contains(., 'Menu')]")
      .click("//button[contains(@class, 'border-transparent')]//span[contains(., 'Menu')]")
    browser
      .waitForElementVisible("//button[contains(., 'Top Wallets')]")
      .click("//button[contains(., 'Top Wallets')]")
      .pause(500)
    browser
      .waitForElementVisible("//h1[text() = 'Top Wallets']")
      .assert.urlContains('/top-wallets')
  },

  'from menu, it should be possible to navigate to delegate monitor': function (browser) {
    browser
      .waitForElementVisible("//button[contains(@class, 'border-transparent')]//span[contains(., 'Menu')]")
      .click("//button[contains(@class, 'border-transparent')]//span[contains(., 'Menu')]")
    browser
      .waitForElementVisible("//button[contains(., 'Delegate Monitor')]")
      .click("//button[contains(., 'Delegate Monitor')]")
      .pause(500)
    browser
      .waitForElementVisible("//h1[text() = 'Delegate Monitor']")
      .assert.urlContains('/delegate-monitor')
  },

  'from menu, it should be possible to navigate back to homepage': function (browser) {
    browser
      .waitForElementVisible("//button[contains(@class, 'border-transparent')]//span[contains(., 'Menu')]")
      .click("//button[contains(@class, 'border-transparent')]//span[contains(., 'Menu')]")
    browser
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
      .click("//div[contains(@class, 'inactive-tab') and contains(text(), 'Latest blocks')]")
      .waitForElementVisible("//div[contains(@class, 'active-tab') and contains(text(), 'Latest blocks')]")
    browser.expect.element("//div[contains(@class, 'active-tab') and contains(text(), 'Latest blocks')]").to.be.present
    browser.expect.element("//div[contains(@class, 'inactive-tab') and contains(text(), 'Latest transactions')]").to.be.present
  },

  'latest block table should refresh automatically': function (browser) {
    const devServer = browser.globals.devServerURL
    const element = '//tbody//tr[1]//td[2]'

    browser
      .url(devServer)
      .useXpath()
      .click("//div[contains(@class, 'inactive-tab') and contains(text(), 'Latest blocks')]")
      .waitForElementVisible("//thead//tr[1]//th[4][contains(., 'Transactions')]")
    browser
      .getText(element, function (result) {
        browser.expect.element(element).text.to.not.contain(result.value).after(20000)
      })
  },

  // Search tests

  'it should be possible to search for a known wallet': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useXpath()
      .waitForElementVisible('//tbody')
      .useCss()
      .waitForElementVisible('input#search')
    browser
      .click('input#search')
      .pause(500)
      .waitForElementVisible('input.search-input')
      .setValue('input.search-input', ['ARK Bounty', browser.Keys.ENTER])
      .pause(1000)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .assert.urlContains('/wallets/AYCTHSZionfGoQsRnv5gECEuFWcZXS38gs')
  },

  'it should be possible to search for a delegate': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useXpath()
      .waitForElementVisible('//tbody')
      .useCss()
      .waitForElementVisible('input#search')
    browser
      .click('input#search')
      .pause(500)
      .waitForElementVisible('input.search-input')
      .setValue('input.search-input', ['genesis_1', browser.Keys.ENTER])
      .pause(1000)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .assert.urlContains('/wallets/AeLpRK8rFVtBeyBVqBtdQpWDfLzaiNujKr')
  },

  'it should be possible to search for a delegate with uppercase letters': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useXpath()
      .waitForElementVisible('//tbody')
      .useCss()
      .waitForElementVisible('input#search')
    browser
      .click('input#search')
      .pause(500)
      .waitForElementVisible('input.search-input')
      .setValue('input.search-input', ['gEnESis_1', browser.Keys.ENTER])
      .pause(1000)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .assert.urlContains('/wallets/AeLpRK8rFVtBeyBVqBtdQpWDfLzaiNujKr')
  },

  'it should be possible to search for an address': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useXpath()
      .waitForElementVisible('//tbody')
      .useCss()
      .waitForElementVisible('input#search')
    browser
      .click('input#search')
      .pause(500)
      .waitForElementVisible('input.search-input')
      .setValue('input.search-input', ['AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv', browser.Keys.ENTER])
      .pause(1000)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .assert.urlContains('/wallets/AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv')
  },

  'it should be possible to search for a block id': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useXpath()
      .waitForElementVisible('//tbody')
      .useCss()
      .waitForElementVisible('input#search')
    browser
      .click('input#search')
      .pause(500)
      .waitForElementVisible('input.search-input')
      .setValue('input.search-input', ['13507259488170268466', browser.Keys.ENTER])
      .pause(1000)
    browser
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Block']")
      .assert.urlContains('/block/13507259488170268466')
  },

  'it should be possible to search for a transaction id': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .useXpath()
      .waitForElementVisible('//tbody')
      .useCss()
      .waitForElementVisible('input#search')
    browser
      .click('input#search')
      .pause(500)
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
      .useXpath()
      .waitForElementVisible('//tbody')
      .useCss()
      .waitForElementVisible('input#search')
    browser
      .click('input#search')
      .pause(500)
      .waitForElementVisible('input.search-input')
      .setValue('input.search-input', ['asdfnothingfoundforthisvalueasdf', browser.Keys.ENTER])
      .pause(1000)
    browser
      .useXpath()
      .waitForElementVisible("//div[contains(@class, 'tooltip-inner') and text() = 'Nothing matched your search']")
  },

  'it should contain a dropdown allowing to filter transactions types': function (browser) {
    browser
      .useXpath()
      .waitForElementVisible("//span[contains(@class, 'mr-1') and text() = 'All']")
      .click("//span[contains(@class, 'mr-1') and text() = 'All']")
    browser
      .waitForElementVisible("(//div[contains(@class, 'dropdown-button') and text() = 'Vote'])[last()]")
      .click("(//div[contains(@class, 'dropdown-button') and text() = 'Vote'])[last()]")
      .waitForElementVisible("//span[contains(@class, 'mr-1') and text() = 'Vote']")
    browser.end()
  }
}
