const express = require("express");
const notification = require("./database/models").Notification;
const schedule = require("./services/schedule");
const {createSchedule} = require("./services/schedule");
const {dateToCorn, validateDateTime} = require("./core/helpers");
const firebaseAdmin = require("./services/firebase_admin");


notification.findAll(  ).then((noties) => {
    noties.filter((noty) => {
        return validateDateTime(noty.date) && noty.repeatedEvery != 'NONE'
    }).forEach((noty) => {
        createSchedule(noty.uuid, dateToCorn(noty.date, noty.timeZoneName, noty.repeatedEvery), () => {
            firebaseAdmin.sendNotification({
                data: noty.data ?? {},
                registrationToken: noty.registrationToken
            });
        });
    });
    notification.destroy({
        where: {
            id: noties.filter((noty) => {
                return !validateDateTime(noty.date) || noty.repeatedEvery == 'NONE'
            }).map((noty) => noty.id)
        }
    })

}).catch((err) => {
    console.log(err)
})

const app = express();
app.use(express.json());
app.use("/api", require("./routes/api"));
app.listen(5000, () => {
    console.log("Server is running on PORT 5000");
});


process.on('SIGINT', function () {
    schedule.gracefulShutdown()
        .then(() => process.exit(0))

});