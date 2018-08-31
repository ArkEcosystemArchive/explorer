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
      .waitForElementVisible('h1')
      .assert.containsText('h1', 'Transaction')
  },

  'it should be possible to copy the transaction ID': function(browser) {
    browser
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
      .waitForElementVisible("//h1[text() = 'Wallet Summary']")
      .assert.urlContains('wallets/AFrPtEmzu6wdVpa2CnRDEKGQQMWgq8nE9V')
  },

  'it should be possible to click on the recipient': function(browser) {
    const devServer = browser.globals.devServerURL + '/#/transaction/818c157383c814a353efbfbbdd3dccabb13cb35e156bb70d31e77248166657a7'

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('main.theme-light')
      .waitForElementVisible('.list-row-border-b')
    browser
      .useXpath()
      .click("//div/div[contains(@class, 'list-row')][2]//a[1]")
      .pause(500)
    browser
      .waitForElementVisible("//h1[text() = 'Wallet Summary']")
      .assert.urlContains('wallets/ATJDMLxBXPxn9bss911HTFCp9PhBHih9uL')
  },

  'it should be possible to click on the transaction block id': function(browser) {
    const devServer = browser.globals.devServerURL + '/#/transaction/818c157383c814a353efbfbbdd3dccabb13cb35e156bb70d31e77248166657a7'

    browser
      .url(devServer)
      .useCss()
      .waitForElementVisible('main.theme-light')
      .waitForElementVisible('.list-row-border-b')
    browser
      .useXpath()
      .click("//div/div[contains(@class, 'list-row')][8]//a[1]")
      .pause(500)
    browser
      .waitForElementVisible("//h1[text() = 'Block']")
      .assert.urlContains('block/12374209887221238137')
  },

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
