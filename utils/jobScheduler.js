const cron = require("node-cron");

const jobScheduler = (options) => {
    cron.schedule("0 0 */1 * * *", () => {
        console.log("---------------------");
        options
        console.log("running a task every 1 hours");
    });
}

module.exports = jobScheduler;