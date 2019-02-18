const CronJob = require("cron").CronJob;
const submissions = require("../core/submissions");
let everyFiveSeconds;

const submitKindleToWebsites = async () => {
  everyFiveSeconds.stop();
  // console.log("Started");
  // let result = await submissions.bookWebsites.checkAndSubmit();
  everyFiveSeconds.start();
  // console.log("Stoped");
};

module.exports = () => {
  everyFiveSeconds = new CronJob({
    cronTime: "*/5 * * * * *",
    onTick: submitKindleToWebsites,
    start: false,
    timeZone: "America/Los_Angeles"
  });
  everyFiveSeconds.start();
};
