const webdriver = require("selenium-webdriver");
const { Builder, By, Key, until } = require("selenium-webdriver");
const firefox = require('selenium-webdriver/firefox');

let driver =  new webdriver.Builder()
.forBrowser('firefox')
.build();

module.exports = { Builder, By, Key, until, driver };
