const { Builder, By, Key, until, driver } = require("../../config/selenium");
const moment = require('moment');
const BookPromotion = require("../../models/Books/BookPromotion");
const BookSubmission = require("../../models/Books/BookSubmission");
const saveToServer = require('../../util/saveToServer');
const uuidv1 = require('uuid/v1');

const websites = {
  awesomeGang: async promo => {
    const ws = "https://awesomegang.com/submit-your-book/"
    try {
      await driver.get(ws);
      await driver.findElement(By.name("input_1")).sendKeys(promo.book.title);
      await driver.findElement(By.name("input_2")).sendKeys(promo.book.synopsis);
      await driver.findElement(By.name("input_8")).sendKeys(promo.book.authorBio);
      await driver.findElement(By.name("input_17")).sendKeys(promo.book.bookCover);
      await driver.findElement(By.name("input_10")).sendKeys(promo.book.amazonUrl);
      await driver.findElement(By.name("input_4")).sendKeys(promo.book.authorEmail);
      await driver.findElement(By.name("input_13")).sendKeys(promo.book.keywords);
      let date = moment(promo.dateFrom).format("MM/DD/YYYY");
      await driver.findElement(By.name("input_16")).sendKeys(date);
      let screenshotBeforeSubmit = await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1())
      await driver.findElement(By.id("gform_submit_button_10")).click();
      let el = await driver.wait(until.elementLocated(By.className('gform_confirmation_message')));
      let screenshotEnd =  await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      return {
        website: ws,
        result: "Success!",
        screenshots: [screenshotBeforeSubmit,screenshotEnd],
        error: "N/A"
      };
    } catch (error) {
      return await handleError(error, ws);
    }
  },
  prettyHot: async promo => {
    const ws = "https://pretty-hot.com/submit-your-book/";
    try {
      await driver.get(ws);
      await driver.findElement(By.name("input_1")).sendKeys(promo.book.title);
      await driver.findElement(By.name("input_2")).sendKeys(promo.book.synopsis);
      await driver.findElement(By.name("input_8")).sendKeys(promo.book.authorBio);
      await driver.findElement(By.name("input_10")).sendKeys(promo.book.amazonUrl);
      await driver.findElement(By.name("input_9")).sendKeys(promo.book.bookCover);
      await driver.findElement(By.name("input_4")).sendKeys(promo.book.authorEmail);
      await driver.findElement(By.name("input_17")).click();
      await driver.findElement(By.name("input_17")).sendKeys("non"+Key.ENTER);
      await driver.findElement(By.name("input_13")).sendKeys(promo.book.keywords);
      let date = moment(promo.dateFrom).format("MM/DD/YYYY");
      await driver.findElement(By.name("input_16")).sendKeys(date);
      let screenshotBeforeSubmit = await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      await driver.findElement(By.id("gform_submit_button_4")).click();
      let el = await driver.wait(until.elementLocated(By.className('gform_confirmation_message')));
      let screenshotEnd =  await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      return {
        website: ws,
        result: "Success!",
        screenshots: [screenshotBeforeSubmit,screenshotEnd],
        error: "N/A"
      };
    } catch (error) {
    return await handleError(error, ws);
    }
  },
  discountBookMan: async promo => {
    const ws = "https://discountbookman.com/book-promotion/"
    try {
      await driver.get(ws);
      await driver.findElement(By.name("input_1")).sendKeys(promo.book.title);
      await driver.findElement(By.name("input_2")).sendKeys(promo.book.synopsis);
      await driver.findElement(By.name("input_8")).sendKeys(promo.book.authorBio);
      await driver.findElement(By.name("input_10")).sendKeys(promo.book.amazonUrl);
      await driver.findElement(By.name("input_9")).sendKeys(promo.book.bookCover);
      await driver.findElement(By.name("input_4")).sendKeys(promo.book.authorEmail);
      await driver.findElement(By.name("input_17")).click();
      await driver.findElement(By.name("input_17")).sendKeys("non"+Key.ENTER);
      await driver.findElement(By.name("input_13")).sendKeys(promo.book.keywords);
      await driver.findElement(By.name("input_14.2")).click();
      let date = moment(promo.dateFrom).format("MM/DD/YYYY");
      await driver.findElement(By.name("input_16")).sendKeys(date);
      let screenshotBeforeSubmit = await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      await driver.findElement(By.id("gform_submit_button_4")).click();
      // let el = await driver.wait(until.elementLocated(By.className('gform_confirmation_message')));
      let screenshotEnd =  await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      return {
        website: ws,
        result: "Success!",
        screenshots: [screenshotBeforeSubmit,screenshotEnd],
        error: "N/A"
      };
    } catch (error) {
    return await handleError(error, ws);
    }
  },
  bookBongo: async promo => {
    const ws = "http://bookbongo.com/submit/";
    try {
      await driver.get(ws);
      await driver.findElement(By.name("radio-461")).click();
      await driver.findElement(By.name("your-name")).sendKeys(promo.book.authorName);
      await driver.findElement(By.name("your-email")).sendKeys(promo.book.authorEmail);
      await driver.findElement(By.name("subscribed")).click();
      await driver.findElement(By.name("your-author")).sendKeys(promo.book.authorName);
      await driver.findElement(By.name("your-title")).sendKeys(promo.book.title);
      await driver.findElement(By.name("your-genre")).sendKeys("Non-fiction"); //TODO: Add genre selection
      await driver.findElement(By.name("book-amazon")).sendKeys(promo.book.title);
      let dateFrom = moment(promo.dateFrom).format("MMDDYYYY");
      let dateTo = moment(promo.dateTo).format("MMDDYYYY");
      await driver.findElement(By.name("date-promotion-start")).click();
      await driver.actions().sendKeys(dateFrom).perform(); 
      await driver.findElement(By.name("date-promotion-end")).click();
      await driver.actions().sendKeys(dateTo).perform();
      await driver.findElement(By.name("your-blurb")).sendKeys(promo.book.synopsis);
      let screenshotBeforeSubmit = await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      await driver.findElement(By.xpath("//input[@value=\"Submit\"]")).click();
      let el = await driver.wait(until.elementLocated(By.xpath("//span[text()='PayPal Checkout']")));
      let screenshotEnd =  await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      return {
        website: ws,
        result: "Success!",
        screenshots: [screenshotBeforeSubmit,screenshotEnd],
        error: "N/A"
      };
    } catch (error) {
    return await handleError(error, ws);
    }
  },
  eReaderGirl: async promo => {
    const ws = "http://ereadergirl.com/submit-your-ebook/";
    try {
      await driver.get(ws);
      await driver.findElement(By.name("input_1")).sendKeys(promo.book.authorName)
      await driver.findElement(By.name("input_3")).sendKeys(promo.book.authorEmail)
      await driver.findElement(By.name("input_4")).click();
      await driver.findElement(By.name("input_4")).sendKeys("free"+Key.ENTER);
      await driver.findElement(By.name("input_5")).sendKeys(promo.book.amazonUrl);
      let screenshotBeforeSubmit = await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      await driver.findElement(By.id("gform_submit_button_1")).click();
      let el = await driver.wait(until.elementLocated(By.className("gform_confirmation_message")));
      let screenshotEnd =  await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      return {
        website: ws,
        result: "Success!",
        screenshots: [screenshotBeforeSubmit,screenshotEnd],
        error: "N/A"
      };
    } catch (error) {
    return await handleError(error, ws);
    }
  },
  theKindleBookReview: async promo => {
    const ws = "http://form.jotformpro.com/form/21078469493969"
    try {
      await driver.get(ws);
      let firstName = promo.book.authorName.split(' ')[0]
      let lastName = promo.book.authorName.split(' ')[1]
      await driver.findElement(By.id("first_4")).sendKeys(firstName);
      await driver.findElement(By.id("last_4")).sendKeys(lastName);
      await driver.findElement(By.name("q5_contactEmail")).sendKeys(promo.book.authorEmail);
      await driver.findElement(By.name("q7_bookTitle")).sendKeys(promo.book.title);
      await driver.findElement(By.name("q8_amazonLink")).sendKeys(promo.book.amazonUrl);
      let fromMonth = moment(promo.dateFrom).format("MM");
      let fromDay = moment(promo.dateFrom).format("DD");
      let fromYear = moment(promo.dateFrom).format("YYYY");
      let toMonth = moment(promo.dateTo).format("MM");
      let toDay = moment(promo.dateTo).format("DD");
      let toYear = moment(promo.dateTo).format("YYYY");
      await driver.findElement(By.id("month_9")).sendKeys(fromMonth);
      await driver.findElement(By.id("day_9")).sendKeys(fromDay);
      await driver.findElement(By.id("year_9")).sendKeys(fromYear);
      await driver.findElement(By.id("month_10")).sendKeys(toMonth);
      await driver.findElement(By.id("day_10")).sendKeys(toDay);
      await driver.findElement(By.id("year_10")).sendKeys(toYear);
      let blurb = promo.book.synopsis.substring(0,135)+"...";
      await driver.findElement(By.id("input_20")).sendKeys(blurb);
      let screenshotBeforeSubmit = await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      await driver.findElement(By.id("input_14_1004")).click();
      await driver.findElement(By.id("input_15")).click();      
      let el = await driver.wait(until.elementLocated(By.className("thankyou")));
      let screenshotEnd =  await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      return {
        website: ws,
        result: "Success!",
        screenshots: [screenshotBeforeSubmit,screenshotEnd],
        error: "N/A"
      };
    } catch (error) {
    return await handleError(error, ws);
    }
  },
  eBooksHabit: async promo => {
    const ws = "http://ebookshabit.com/for-authors/";
    try {
      const regex = /dp\/(.*)\//gm;
      await driver.get(ws);
      var asin = regex.exec(promo.book.amazonUrl)[1];
      await driver.findElement(By.name("youremail")).sendKeys(promo.book.authorEmail);
      await driver.findElement(By.name("asin")).sendKeys(asin);
      await driver.findElement(By.name("price")).sendKeys("0.00");
      let fromDate = moment(promo.formDate).format("MM/DD/YYYY");
      let toDate = moment(promo.toDate).format("MM/DD/YYYY");
      await driver.findElement(By.name("from")).sendKeys(fromDate);
      await driver.findElement(By.name("to")).sendKeys(toDate);
      await driver.findElement(By.name("getemail")).click();
      let screenshotBeforeSubmit = await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      await driver.findElement(By.id("submit")).click();
      let el = await driver.wait(until.elementLocated(By.xpath("//span[text()='Promote Your Books on eBooks Habit']")));
      let screenshotEnd =  await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      return {
        website: ws,
        result: "Success!",
        screenshots: [screenshotBeforeSubmit,screenshotEnd],
        error: "N/A"
      };
    } catch (error) {
      return await handleError(error, ws);      
    }
  },
  loveleyBookPromotons:async promo => {
    const ws =  "http://lovelybookpromotions.com/submit-your-kindle-freebie/";
    try {
      await driver.get(ws);
      await driver.findElement(By.name("input_1")).sendKeys(promo.book.title);
      await driver.findElement(By.name("input_7")).sendKeys(promo.book.authorEmail);
      let fromDate = moment(promo.formDate).format("MM/DD/YYYY");
      let toDate = moment(promo.toDate).format("MM/DD/YYYY");
      await driver.actions().sendKeys(Key.TAB).perform();
      await driver.actions().sendKeys(fromDate).perform();
      await driver.actions().sendKeys(Key.TAB).perform();
      await driver.actions().sendKeys(toDate).perform();
      const regex = /dp\/(.*)\//gm;
      var asin = regex.exec(promo.book.amazonUrl)[1];
      await driver.findElement(By.name("input_4")).sendKeys(asin);
      await driver.findElement(By.name("input_12")).sendKeys(promo.book.authorEmail);
      await driver.findElement(By.name("input_5")).sendKeys(promo.book.bookCover);
      await driver.findElement(By.name("input_9")).click();
      await driver.findElement(By.className("chosen-search-input")).click();
      await driver.actions().sendKeys("non"+Key.ENTER).perform();
      let screenshotBeforeSubmit = await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      await driver.findElement(By.id("gform_submit_button_1")).click();
      let el = await driver.wait(until.elementLocated(By.className("gform_confirmation_wrapper")));
      let screenshotEnd =  await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      return {
        website: ws,
        result: "Success!",
        screenshots: [screenshotBeforeSubmit,screenshotEnd],
        error: "N/A"
      };
    } catch (error) {
      return await handleError(error, ws);      
    }
  },
  newFreeKindleBooks:async promo => {
    //http://newfreekindlebooks.com/authors/
    const ws = "http://newfreekindlebooks.com/authors/";
    try {
      await driver.get(ws);
      await driver.findElement(By.name("vfb-5")).sendKeys(promo.book.title +" by "+ promo.book.authorName);
      await driver.findElement(By.name("vfb-13")).clear();
      await driver.findElement(By.name("vfb-13")).sendKeys(promo.book.amazonUrl);
      await driver.findElement(By.name("vfb-22")).sendKeys("non-fiction");
      let fromDate = moment(promo.dateFrom).format("MM/DD/YYYY");
      let toDate = moment(promo.dateTo).format("MM/DD/YYYY");
      await driver.findElement(By.name("vfb-9")).sendKeys(fromDate);
      await driver.findElement(By.name("vfb-10")).sendKeys(toDate);
      await driver.findElement(By.name("vfb-11")).sendKeys("0.00");
      await driver.findElement(By.name("vfb-16")).sendKeys(promo.book.authorEmail);
      await driver.findElement(By.name("vfb-3")).sendKeys("12");
      let screenshotBeforeSubmit = await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());     
      await driver.findElement(By.name("vfb-submit")).click();
      let el = await driver.wait(until.elementLocated(By.xpath("//p[text()='Thanks, your promotion was successfully submitted.']")));
      let screenshotEnd =  await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      return {
        website: ws,
        result: "Success!",
        screenshots: [screenshotBeforeSubmit,screenshotEnd],
        error: "N/A"
      };
    } catch (error) {
      return await handleError(error, ws);      
    }
  },
  eBookLister: async promo => {
    const ws = "http://www.ebooklister.net/submit.php";
    try {
      await driver.get(ws);
      await driver.findElement(By.name("title")).sendKeys(promo.book.title);
      await driver.findElement(By.name("author")).sendKeys(promo.book.authorName);
      await driver.findElement(By.name("submitter")).sendKeys(promo.book.authorEmail);
      await driver.findElement(By.name("authorurl")).sendKeys(promo.book.amazonUrl);
      const regex = /dp\/(.*)\//gm;
      var asin = regex.exec(promo.book.amazonUrl)[1];
      await driver.findElement(By.name("asin")).sendKeys(asin);
      await driver.findElement(By.name("category")).click();
      try {
        await driver.actions().sendKeys("non").perform();
        await driver.actions().sendKeys(Key.ENTER).perform();
      } catch (error) {
      }
      await driver.findElement(By.xpath("//input[@type='radio' and @value='0']")).click();
      let fromDate = moment(promo.dateFrom).format("MM/DD/YYYY");
      let date2 = moment(promo.dateFrom).add(1, 'days') < moment(promo.dateTo) ? moment(promo.dateFrom).add(1, 'days').format("MM/DD/YYYY") : "";
      let date3 = moment(promo.dateFrom).add(2, 'days') < moment(promo.dateTo) ? moment(promo.dateFrom).add(2, 'days').format("MM/DD/YYYY") : "";
      let date4 = moment(promo.dateFrom).add(3, 'days') < moment(promo.dateTo) ? moment(promo.dateFrom).add(3, 'days').format("MM/DD/YYYY") : "";
      await driver.findElement(By.name("fd1")).sendKeys(fromDate);
      await driver.findElement(By.name("fd2")).sendKeys(date2);
      await driver.findElement(By.name("fd3")).sendKeys(date3);
      await driver.findElement(By.name("fd4")).sendKeys(date4);
      await driver.findElement(By.name("body")).sendKeys(promo.book.synopsis);
      await driver.findElement(By.id("required-checkbox")).click();
      let screenshotBeforeSubmit = await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      await driver.findElement(By.name("submit")).click(); //
      await driver.wait(until.elementLocated(By.id("cancelReturnBtn")));
      await driver.findElement(By.id('cancelReturnBtn')).click();
      await driver.wait(until.elementLocated(By.id("content")));
      let screenshotEnd =  await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      return {
        website: ws,
        result: "Success!",
        screenshots: [screenshotBeforeSubmit,screenshotEnd],
        error: "N/A"
      };
    } catch (error) {
      return await handleError(error, ws);      
    }
  },
  bookBloggerList:async promo => {
    const ws = "https://docs.google.com/forms/d/e/1FAIpQLSe98YJs1exZAb2UcpBwmVjxwP39u3WdSiCduI5wpeb9puQUDA/viewform";
    try {
      await driver.get(ws);
      await driver.findElement(By.name('emailAddress')).sendKeys(promo.book.authorEmail);
      await driver.findElement(By.xpath("//input[contains(@aria-label,'Book Title ')]")).sendKeys(promo.book.title);      
      let fromDate = moment(promo.dateFrom).format("MM/DD/YYYY");
      await driver.findElement(By.xpath("//input[contains(@aria-label,'listing date?')]")).sendKeys(fromDate);
      await driver.findElement(By.xpath("//input[contains(@aria-label,'Full Name')]")).sendKeys(promo.book.authorName);
      await driver.findElement(By.xpath("//input[contains(@aria-label,'Email')]")).sendKeys(promo.book.authorEmail);
      await driver.findElement(By.xpath("//input[contains(@aria-label,'Amazon Link')]")).sendKeys(promo.book.amazonUrl);
      await driver.findElement(By.xpath("//input[contains(@aria-label,'Genre')]")).sendKeys("Non-Fiction");
      await driver.findElement(By.xpath("//input[contains(@aria-label,'Rating (G, PG, PG-13 etc.)')]")).sendKeys("G");
      await driver.actions().sendKeys(Key.TAB).perform();
      await driver.actions().sendKeys(Key.TAB).perform();
      await driver.actions().sendKeys(Key.SPACE).perform();
      let screenshotBeforeSubmit = await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      await driver.actions().sendKeys(Key.TAB).perform();
      await driver.actions().sendKeys(Key.TAB).perform();
      await driver.actions().sendKeys(Key.SPACE).perform();
      await driver.wait(until.elementLocated(By.className("freebirdFormviewerViewResponseConfirmationMessage")));
      let screenshotEnd =  await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      return {
        website: ws,
        result: "Success!",
        screenshots: [screenshotBeforeSubmit,screenshotEnd],
        error: "N/A"
      };
    } catch (error) {
      return await handleError(error, ws);      
    }
  },
  frugalFreebies:async promo => {
    // const ws = "http://www.frugal-freebies.com/p/submit-freebie.html";
    const ws = "https://docs.google.com/spreadsheet/embeddedform?formkey=dFBoLW5ka1J2Q1R4Rzd2NXg5RkszLVE6MQ";
    try {
      await driver.get(ws);
      // await driver.switchTo().frame();
      await driver.findElement(By.xpath("//textarea[contains(@aria-label,'Book title')]")).sendKeys(promo.book.title.substring(0,47)+"...");
      const regex = /dp\/(.*)\//gm;
      var asin = regex.exec(promo.book.amazonUrl)[1];
      await driver.findElement(By.xpath("//input[contains(@aria-label,'ASIN')]")).sendKeys(asin);
      await driver.actions().sendKeys(Key.TAB).perform();
      await driver.actions().sendKeys(Key.SPACE).perform();
      let day = moment(promo.dateFrom).format("DD");
      await driver.actions().sendKeys(Key.TAB).perform();
      await driver.actions().sendKeys(day).perform();
      let month = moment(promo.dateFrom).format("MM");
      await driver.actions().sendKeys(Key.TAB).perform();
      await driver.actions().sendKeys(month).perform();
      let year = moment(promo.dateFrom).format("YYYY");
      await driver.actions().sendKeys(Key.TAB).perform();
      await driver.actions().sendKeys(year).perform();
      await driver.findElement(By.xpath("//input[contains(@aria-label,'link')]")).sendKeys(promo.book.amazonUrl);
      await driver.actions().sendKeys(Key.TAB).perform();
      let screenshotBeforeSubmit = await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      await driver.actions().sendKeys(Key.SPACE).perform();
      await driver.wait(until.elementLocated(By.className("freebirdFormviewerViewResponseConfirmationMessage")));
      let screenshotEnd =  await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
      return {
        website: ws,
        result: "Success!",
        screenshots: [screenshotBeforeSubmit,screenshotEnd],
        error: "N/A"
      };
    } catch (error) {
      return await handleError(error, ws);      
    }
  },
  armadilloEBooks:async promo => {
    //http://www.armadilloebooks.com/submit-free-ebooks/
   const ws = "http://www.armadilloebooks.com/submit-free-ebooks/";
   try {
    await driver.get(ws);
    await driver.switchTo().frame(await driver.findElement(By.id('wufooFormz1b413ic0l441yc')));
    await driver.findElement(By.name('Field1')).sendKeys(promo.book.authorName);
    await driver.findElement(By.name('Field3')).sendKeys(promo.book.authorEmail);
    await driver.findElement(By.name('Field5')).sendKeys(promo.book.title);
    await driver.findElement(By.name('Field6')).sendKeys(promo.book.asin);
    await driver.findElement(By.name('Field12-1')).sendKeys(promo.dateFrom.month);
    await driver.findElement(By.name('Field12-2')).sendKeys(promo.dateFrom.day);
    await driver.findElement(By.name('Field12')).sendKeys(promo.dateFrom.year);
    await driver.findElement(By.name('Field14-1')).sendKeys(promo.dateTo.month);
    await driver.findElement(By.name('Field14-2')).sendKeys(promo.dateTo.day);
    await driver.findElement(By.name('Field14')).sendKeys(promo.dateTo.year);
    await driver.findElement(By.name('Field8')).sendKeys(promo.book.synopsis);
    await driver.findElement(By.name('Field10')).sendKeys(promo.book.authorBio);
    return await handleResult(ws,driver,promo, async ()=>{
      await driver.actions().sendKeys(Key.TAB).perform();
      await driver.actions().sendKeys(Key.TAB).perform();
      await driver.actions().sendKeys(Key.ENTER).perform();
      await driver.switchTo().defaultContent();
      await driver.wait(until.elementLocated(By.className('status-publish')));
    })
  } catch (error) {
    return await handleError(error, ws);      
  }
  },
  bookAngel:async promo => {
    //http://bookangel.co.uk/submit-a-book/
    const ws = "http://bookangel.co.uk/submit-a-book/";
    try {
     await driver.get(ws);
     await driver.findElement(By.name('subname')).sendKeys(promo.book.authorName);
     await driver.findElement(By.name('subemail')).sendKeys(promo.book.authorEmail);
     await driver.findElement(By.name('asin')).sendKeys(promo.book.asin);
     await driver.findElement(By.name('duration')).click();
     await driver.findElement(By.xpath(`//select[@name='duration']/option[@value='${promo.daysCount}']`)).click();
     await driver.findElement(By.name('nonfiction')).click();
     await driver.findElement(By.xpath(`//select[@name='nonfiction']/option[@value='696']`)).click(); //TODO: THis is hardcoded
     return await handleResult(ws,driver,promo, async ()=>{
        await driver.findElement(By.name('submit')).click();
        await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'successfully submitted')]")));
     })
    } catch (error) {
      return await handleError(error, ws);      
    }
  },
  freeBooks: async promo => {
    //http://www.freebooks.com/submit/
    const ws = "http://www.freebooks.com/submit/";
    try {
      await driver.get(ws);
      await driver.findElement(By.name('asin')).sendKeys(promo.book.asin);
      await driver.executeScript(removeReadOnlyInputs);
      await driver.findElement(By.name('fromDate')).sendKeys(promo.dateFrom.ddmmyyyy);
      await driver.findElement(By.name('toDate')).sendKeys(promo.dateTo.ddmmyyyy);
      return await handleResult(ws,driver,promo, async ()=>{
         await driver.findElement(By.id('submitbook')).click();
         await driver.wait(until.elementLocated(By.id("confirmbook")));
         await driver.sleep(2000);
         await driver.findElement(By.id('confirmbook')).click();
         await driver.wait(until.elementLocated(By.id("success")));
      })
     } catch (error) {
       return await handleError(error, ws);      
     }
  },
  kornerKonnection:async promo => {
    return;
    //https://www.kornerkonnection.com/index.html
    const ws = "https://www.kornerkonnection.com/index.html";
    let fb = "https://www.facebook.com/EBookKornerKafe";
    //TODO: This has to be submitted today or in 1 day ahead!
    try {
      await driver.get(fb);
      let pinnedPostDate = await driver.findElement(By.xpath("//a[contains(@href,'posts/')]/abbr/span")).getText();
      let linkElements = await driver.findElements(By.xpath("//div[contains(@class,'userContentWrapper')]//a[contains(@href,'l.facebook.com/')]"));
      let pinnedPostTitle = await linkElements[1].getText();
      await driver.get(ws);
      await driver.findElement(By.name('focus_post')).sendKeys(pinnedPostTitle);
      await driver.findElement(By.name('focus_post_date')).sendKeys(pinnedPostDate);
      await driver.findElement(By.name('author_name')).sendKeys(promo.book.authorName);
      await driver.findElement(By.name('book_title')).sendKeys(promo.book.title);
      await driver.findElement(By.name('synopsis')).sendKeys(promo.book.synopsis);
      await driver.findElement(By.name('asin_us')).sendKeys(promo.book.asin);
      await driver.findElement(By.name('asin_uk')).sendKeys(promo.book.asin);
      await driver.findElement(By.xpath("//input[@type='radio' and @value='Free']")).click();
      await driver.findElement(By.name('email_address')).sendKeys(promo.book.authorEmail);
      return await handleResult(ws,driver,promo, async ()=>{
        await driver.findElement(By.xpath("//input[@type='submit']")).click();
        await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'successfully submitted')]")));
      })
    } catch (error) {
      return await handleError(error, ws);  
    }
   },
  jungleDealsAndSteals:async promo => {
    //https://jungledealsandsteals.com/contact/
    const ws = "https://jungledealsandsteals.com/contact/";
    try {
      await driver.get(ws);
      await driver.findElement(By.name('your-name')).sendKeys(promo.book.authorName);
      await driver.findElement(By.name('your-email')).sendKeys(promo.book.authorEmail);
      let subject = "Free book promotion";
      let msg = `Hello, my book \"${promo.book.title}\" is free from ${promo.dateFrom.mmddyyyy} to ${promo.dateFrom.mmddyyyy}. Please consider adding it to your deals :)`
      await driver.findElement(By.name('your-subject')).sendKeys(subject);
      await driver.findElement(By.name('your-message')).sendKeys(msg);
      return await handleResult(ws,driver,promo, async ()=>{
        await driver.findElement(By.xpath("//input[@type='submit' and @value='Send']")).click();
        await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'has been sent')]")));
      });
    } catch (error) {
      return await handleError(error, ws);
    }
  }
};



addAdditionalInfo = (promo) => {
  extractASIN(promo);
  formatDates(promo);
  return promo;
}

handleResult = async (ws, driver, promo, submitConfirmation) => {
  let screenshotBeforeSubmit = await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
  await submitConfirmation();
  let screenshotEnd =  await saveToServer.fromBase64(await driver.takeScreenshot(),`submissions\\${promo.book._id}\\${promo._id}`,uuidv1());
    return {
      website: ws,
      result: "Success!",
      screenshots: [screenshotBeforeSubmit,screenshotEnd],
      error: "N/A"
    };
}

function removeReadOnlyInputs() {
  let inputs = document.getElementsByTagName('input');
  for(var i = 0; i < inputs.length; i++){ 
    inputs[i].removeAttribute('readonly','readonly');
  }
}

function extractASIN(promo) {
  const regex = /dp\/(.*)\//gm;
  var asin = regex.exec(promo.book.amazonUrl)[1];
  promo.book.asin = asin;
}

function formatDates(promo) {
  promo.daysCount = moment(promo.dateTo).diff(moment(promo.dateFrom),'days')+1;
  //dateFrom
  promo.dateFrom.mmddyyyy = moment(promo.dateFrom).format("MM/DD/YYYY");
  promo.dateFrom.yyyymmdd = moment(promo.dateFrom).format("YYYY/MM/DD");
  promo.dateFrom.ddmmyyyy = moment(promo.dateFrom).format("DD/MM/YYYY");
  promo.dateFrom.day= moment(promo.dateFrom).format("DD");
  promo.dateFrom.month= moment(promo.dateFrom).format("MM");
  promo.dateFrom.year= moment(promo.dateFrom).format("YYYY");
  //dateTo
  promo.dateTo.mmddyyyy = moment(promo.dateTo).format("MM/DD/YYYY"); 
  promo.dateTo.yyyymmdd = moment(promo.dateTo).format("YYYY/MM/DD");  
  promo.dateTo.ddmmyyyy = moment(promo.dateTo).format("DD/MM/YYYY");
  promo.dateTo.day= moment(promo.dateTo).format("DD");
  promo.dateTo.month= moment(promo.dateTo).format("MM");
  promo.dateTo.year= moment(promo.dateTo).format("YYYY");
}

async function handleError(error, ws) {
  console.log(error);
  let screenshot = await driver.takeScreenshot();
  return {
    website: ws,
    result: "Failed!",
    screenshots: [screenshot],
    error
  };
}


let checkAndSubmit = async function() {
  return new Promise(async (resolve, reject) => {
    try {
      let promotions = await BookPromotion.find({ status: "processing" }).populate('book');
      // let promotionsWorking = await BookPromotion.find({ status: "processing" });
      if (promotions.length > 0) {
        for (let promo of promotions) {
          promo = addAdditionalInfo(promo);
          for (const s in websites) {
            if(s!=="jungleDealsAndSteals") continue; // working on this right now
            let result = await websites[s](promo);
            if(result){
              result.bookPromotion = promo._id;
              let submission = await BookSubmission.create(result);
              promo.submissions.push(submission);
              console.log(result);
            }
          }
          promo.status = "done";
          await promo.save();
        }
      }
      resolve('success')
    } catch (error) {
      console.log(error);
      reject(error);
    }
  })
};

module.exports = {
  checkAndSubmit
};