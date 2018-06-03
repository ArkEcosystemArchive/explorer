// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  // Default homepage test, which also serves as setup for correct url
  'homepage should be available': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light', 5000)
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
      .pause(500)
    browser.expect.element('#line-chart').to.not.be.present
    browser
      .click('button.text-chart-inactive')
      .pause(500)
      .expect.element('#line-chart').to.be.visible
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

  // TODO: fix issue with 'element' being undefined?
  // 'header should be able to change currency': function(browser) {
  //   browser.useXpath().click("//button[contains(., 'ARK/USD')]")
  //   browser
  //     .assert.visible('.menu-button')
  //     .assert.visible('.close-button')
  //   browser.useXpath().click("//button[contains(., 'ETH')]")
  //   browser.useXpath().click("//button[contains(., 'ARK/ETH')]")
  //   browser.useXpath().click("//button[contains(., 'USD')]")
  //   browser
  //     .useCss()
  //     .expect.element('.menu-button').to.not.be.present
  //     .expect.element('.close-button').to.not.be.present
  // },

  // Footer tests
  'footer should contain links': function(browser) {
    browser
      .assert.visible('footer > div.text-center')
      // TODO: check for child elements containing links
      // .elements('css selector', '.footer > div.text-center a', function(result) {
      //   console.log(result.value)
      //   browser.assert.ok(result.value.length > 0)
      // })
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
    browser.end() // Closes current browser screen
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
      .end()
  },

  // TODO: search options
  // Search tests

}
