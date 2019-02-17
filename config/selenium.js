const webdriver = require("selenium-webdriver");
const { Builder, By, Key, until } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const options = new firefox.Options();


let driver = new webdriver.Builder()
  .forBrowser("firefox")
  .setFirefoxOptions(options)
  .build();


module.exports = { Builder, By, Key, until, driver };
