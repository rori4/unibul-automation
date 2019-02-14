const { Builder, By, Key, until, driver } = require("../../config/selenium");
const errors = [];
const results = [];
const websites = {
  awesomeGang: async book => {
    //https://awesomegang.com/submit-your-book/
    try {
      await driver.get("https://awesomegang.com/submit-your-book/");
      await driver.findElement(By.name("input_1")).sendKeys(book.title);
      await driver.findElement(By.name("input_2")).sendKeys(book.synopsis);
      await driver.findElement(By.name("input_8")).sendKeys(book.authorBio);
      await driver.findElement(By.name("input_10")).sendKeys(book.amazonUrl);
      await driver.findElement(By.name("input_4")).sendKeys(book.authorEmail);
      console.log("Testing done");
    } catch (error) {
      error.push(error)
      // await driver.quit();
    }
  },
  prettyHot: async book => {
    //https://pretty-hot.com/submit-your-book/
    console.log("https://pretty-hot.com/submit-your-book/");
    try {
      await driver.get("https://pretty-hot.com/submit-your-book/");
    } finally {
      // await driver.quit();
    }
  },
  feeDiscountedBooks: book => {
    //https://freediscountedbooks.com/submit/
  },
  digitalBookToday: book => {
    //https://digitalbooktoday.com/join-our-team/12-top-100-submit-your-free-book-to-be-included-on-this-list/
    console.log(
      "https://digitalbooktoday.com/join-our-team/12-top-100-submit-your-free-book-to-be-included-on-this-list/"
    );
  },
  discountBookMan: book => {
    //https://discountbookman.com/book-promotion/
    console.log("https://discountbookman.com/book-promotion/");
  },
  bookBongo: book => {
    //http://bookbongo.com/submit/
    console.log("//http://bookbongo.com/submit/");
  },
  thisIsWriting: book => {
    //https://thisiswriting.com/free-book-marketing/#free-submission
    console.log(
      "//https://thisiswriting.com/free-book-marketing/#free-submission"
    );
  },
  eReaderGirl: book => {
    //http://ereadergirl.com/submit-your-ebook/
    console.log("//http://ereadergirl.com/submit-your-ebook/");
  },
  theKindleBookReview: book => {
    //http://form.jotformpro.com/form/21078469493969
    console.log("//http://form.jotformpro.com/form/21078469493969");
  },
  eBooksHabit: book => {
    //http://ebookshabit.com/for-authors/
    console.log("//http://ebookshabit.com/for-authors/");
  },
  loveleyBookPromotons: book => {
    console.log(
      "//http://lovelybookpromotions.com/submit-your-kindle-freebie/"
    );
  },
  newFreeKindleBooks: book => {
    //http://newfreekindlebooks.com/authors/
    console.log("//http://newfreekindlebooks.com/authors/");
  },
  eBookLister: book => {
    //http://www.ebooklister.net/submit.php
    console.log("//http://www.ebooklister.net/submit.php");
  },
  bookBloggerList: book => {
    //https://docs.google.com/forms/d/e/1FAIpQLSe98YJs1exZAb2UcpBwmVjxwP39u3WdSiCduI5wpeb9puQUDA/viewform
    console.log(
      "//https://docs.google.com/forms/d/e/1FAIpQLSe98YJs1exZAb2UcpBwmVjxwP39u3WdSiCduI5wpeb9puQUDA/viewform"
    );
  },
  frugalFreebies: book => {
    //http://www.frugal-freebies.com/p/submit-freebie.html
    console.log("//http://www.frugal-freebies.com/p/submit-freebie.html");
  },
  armadilloEBooks: book => {
    //http://www.armadilloebooks.com/submit-free-ebooks/
    console.log("//http://www.armadilloebooks.com/submit-free-ebooks/");
  },
  bookAngel: book => {
    //http://bookangel.co.uk/submit-a-book/
    console.log("//http://bookangel.co.uk/submit-a-book/");
  },
  freeBooks: book => {
    //http://www.freebooks.com/submit/
    console.log("//http://www.freebooks.com/submit/");
  },
  kornerKonnection: book => {
    //https://www.kornerkonnection.com/index.html
    console.log("//https://www.kornerkonnection.com/index.html");
  },
  freeStuffUnlimited: book => {
    //http://free-stuff-unlimited.com/contact-us-2/
    console.log("//http://free-stuff-unlimited.com/contact-us-2/");
  },
  jungleDealsAndSteals: book => {
    //https://jungledealsandsteals.com/contact/
    console.log("//https://jungledealsandsteals.com/contact/");
  }
};

let publishToAll = function(book) {
  websites.awesomeGang(book);
  // websites.prettyHot();
  // for (var s in websites) {
  //   websites[s](book);
  // }
};

module.exports = publishToAll;
