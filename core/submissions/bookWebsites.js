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
  freeDiscountedBooks: book => {
    const ws = "https://freediscountedbooks.com/submit/";
    console.log(ws);
  },
  // digitalBookToday: book => {
  //   //https://digitalbooktoday.com/join-our-team/12-top-100-submit-your-free-book-to-be-included-on-this-list/
  //   console.log(
  //     "https://digitalbooktoday.com/join-our-team/12-top-100-submit-your-free-book-to-be-included-on-this-list/"
  //   );
  // },
  // discountBookMan: book => {
  //   //https://discountbookman.com/book-promotion/
  //   console.log("https://discountbookman.com/book-promotion/");
  // },
  // bookBongo: book => {
  //   //http://bookbongo.com/submit/
  //   console.log("//http://bookbongo.com/submit/");
  // },
  // thisIsWriting: book => {
  //   //https://thisiswriting.com/free-book-marketing/#free-submission
  //   console.log(
  //     "//https://thisiswriting.com/free-book-marketing/#free-submission"
  //   );
  // },
  // eReaderGirl: book => {
  //   //http://ereadergirl.com/submit-your-ebook/
  //   console.log("//http://ereadergirl.com/submit-your-ebook/");
  // },
  // theKindleBookReview: book => {
  //   //http://form.jotformpro.com/form/21078469493969
  //   console.log("//http://form.jotformpro.com/form/21078469493969");
  // },
  // eBooksHabit: book => {
  //   //http://ebookshabit.com/for-authors/
  //   console.log("//http://ebookshabit.com/for-authors/");
  // },
  // loveleyBookPromotons: book => {
  //   console.log(
  //     "//http://lovelybookpromotions.com/submit-your-kindle-freebie/"
  //   );
  // },
  // newFreeKindleBooks: book => {
  //   //http://newfreekindlebooks.com/authors/
  //   console.log("//http://newfreekindlebooks.com/authors/");
  // },
  // eBookLister: book => {
  //   //http://www.ebooklister.net/submit.php
  //   console.log("//http://www.ebooklister.net/submit.php");
  // },
  // bookBloggerList: book => {
  //   //https://docs.google.com/forms/d/e/1FAIpQLSe98YJs1exZAb2UcpBwmVjxwP39u3WdSiCduI5wpeb9puQUDA/viewform
  //   console.log(
  //     "//https://docs.google.com/forms/d/e/1FAIpQLSe98YJs1exZAb2UcpBwmVjxwP39u3WdSiCduI5wpeb9puQUDA/viewform"
  //   );
  // },
  // frugalFreebies: book => {
  //   //http://www.frugal-freebies.com/p/submit-freebie.html
  //   console.log("//http://www.frugal-freebies.com/p/submit-freebie.html");
  // },
  // armadilloEBooks: book => {
  //   //http://www.armadilloebooks.com/submit-free-ebooks/
  //   console.log("//http://www.armadilloebooks.com/submit-free-ebooks/");
  // },
  // bookAngel: book => {
  //   //http://bookangel.co.uk/submit-a-book/
  //   console.log("//http://bookangel.co.uk/submit-a-book/");
  // },
  // freeBooks: book => {
  //   //http://www.freebooks.com/submit/
  //   console.log("//http://www.freebooks.com/submit/");
  // },
  // kornerKonnection: book => {
  //   //https://www.kornerkonnection.com/index.html
  //   console.log("//https://www.kornerkonnection.com/index.html");
  // },
  // freeStuffUnlimited: book => {
  //   //http://free-stuff-unlimited.com/contact-us-2/
  //   console.log("//http://free-stuff-unlimited.com/contact-us-2/");
  // },
  // jungleDealsAndSteals: book => {
  //   //https://jungledealsandsteals.com/contact/
  //   console.log("//https://jungledealsandsteals.com/contact/");
  // }
};

let checkAndSubmit = async function() {
  return new Promise(async (resolve, reject) => {
    try {
      let promotions = await BookPromotion.find({ status: "processing" }).populate('book');
      // let promotionsWorking = await BookPromotion.find({ status: "processing" });
      if (promotions.length > 0) {
        for (const promo of promotions) {
          for (const s in websites) {
            if(s!=="freeDiscountedBooks") continue; // working on this right now
            let result = await websites[s](promo);
            if(result){
              result.bookPromotion = promo._id;
              // let submission = await BookSubmission.create(result);
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
      resolve('error')
    }
  })
};

module.exports = {
  checkAndSubmit
};
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

