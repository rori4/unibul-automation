const webdriver = require("selenium-webdriver");
const { Builder, By, Key, until } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const options = new firefox.Options();
options.setPreference("dom.disable_beforeunload", false);

let driver = new webdriver.Builder()
  .forBrowser("firefox")
  .setFirefoxOptions(options)
  .build();


module.exports = { Builder, By, Key, until, driver };
