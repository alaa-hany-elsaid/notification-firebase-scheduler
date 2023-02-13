const _ = require("lodash");
const scheduleLib = require("node-schedule");
const schedule = {};
schedule.createSchedule =  function (scheduleId, scheduleTimeout  , callback) {
       return  scheduleLib.scheduleJob(scheduleId.toString(), scheduleTimeout, callback);
};
schedule.getJobs = function () {
    console.log(Object.values(scheduleLib.scheduledJobs).map((job) => {
        {
          return  {uuid : job.name , running : job.running}
        }
    }))
        return [];
};


module.exports = schedule;