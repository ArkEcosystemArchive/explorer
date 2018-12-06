// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

// Disable eslint for .to.not.be.present statements
/* eslint-disable no-unused-expressions */

module.exports = {
  // Default test, which also serves as setup for correct url
  'transaction detail page should be available': function (browser) {
    const devServer = browser.globals.devServerURL + '/#/transaction/818c157383c814a353efbfbbdd3dccabb13cb35e156bb70d31e77248166657a7'

    browser
      .url(devServer)
      .waitForElementVisible('main.theme-light')
      .useXpath()
      .waitForElementVisible("//h1[text() = 'Transaction']")
  },

  'it should be possible to copy the transaction id': function(browser) {
    browser
      .useCss()
      .waitForElementVisible('img.block')
      .assert.cssClassNotPresent('img.block', 'animated')
    browser
      .click('button.has-tooltip')
      .waitForElementVisible('img.block.animated')
  },

  'it should be possible to click on the sender': function(browser) {
    browser
      .useXpath()
      .click("//div/div[contains(@class, 'list-row')][1]//a[1]")
      .pause(500)
    browser
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .assert.urlContains('wallets/AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V')
  },

  'it should be possible to click on the recipient': function(browser) {
    const devServer = browser.globals.devServerURL + '/#/transaction/818c157383c814a353efbfbbdd3dccabb13cb35e156bb70d31e77248166657a7'

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('main.theme-light')
    browser
      .useXpath()
      .waitForElementVisible("//div/div[contains(@class, 'list-row')][2]//a[1]")
      .click("//div/div[contains(@class, 'list-row')][2]//a[1]")
      .pause(500)
    browser
      .waitForElementVisible("//h1[text() = 'Wallet summary']")
      .assert.urlContains('wallets/ATJDMLxBXPxn9bss911HTFCp9PhBHih9uL')
  },

  'it should be possible to click on the transaction block id': function(browser) {
    const devServer = browser.globals.devServerURL + '/#/transaction/818c157383c814a353efbfbbdd3dccabb13cb35e156bb70d31e77248166657a7'

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('main.theme-light')
    browser
      .useXpath()
      .waitForElementVisible("//div/div[contains(@class, 'list-row')][8]//a[1]")
      .click("//div/div[contains(@class, 'list-row')][8]//a[1]")
      .pause(500)
    browser
      .waitForElementVisible("//h1[text() = 'Block']")
      .assert.urlContains('block/12374209887221238137')
  },

  'it should emojify the vendor field': function(browser) {
    const devServer = browser.globals.devServerURL + '/#/transaction/80aa5f3c1520481c26ab606b9e15fae1c3424dbabbce3719fc8f381e8bb19d29'

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('main.theme-light')
      .waitForElementVisible('.list-row-border-b')
    browser
      .useXpath()
      .expect.element("//div[contains(@class, 'list-row-border-b')][7]//div[2]").text.to.equal('ARK ❤️ you')
    browser.end()
  }

  // TODO: unsure why this one doesn't work reliably, needs to be looked into further
  // 'it should be possible to show the amount tooltip': function(browser) {
  //   const devServer = browser.globals.devServerURL + '/#/transaction/818c157383c814a353efbfbbdd3dccabb13cb35e156bb70d31e77248166657a7'

  //   browser
  //     .url(devServer)
  //     .useCss()
  //     .waitForElementVisible('main.theme-light')
  //     .waitForElementVisible('.list-row-border-b')
  //   browser
  //     .useXpath()
  //     .waitForElementVisible("//div[text() = '0.9 Ѧ']")
  //     .moveToElement("//div[text() = '0.9 Ѧ']", 0, 0, () => {
  //       browser
  //         .waitForElementPresent("//div[contains(@class, 'vue-tooltip-theme')]", 10000)
  //       browser
  //         .assert.containsText("//div[contains(@class, 'vue-tooltip-theme')]", '2.29 $')
  //         .end()
  //     })
  // }
}
