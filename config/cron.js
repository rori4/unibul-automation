const cron = require("node-cron");
const BookPromotion = require("../models/Books/BookPromotion");

module.exports = () => {
  cron.schedule("*/5 * * * * *", async function() {
    let promotionsProcessing = await BookPromotion.find({ status: "processing" });
    console.log("Curret count: " + promotionsProcessing.length);
  });
};
