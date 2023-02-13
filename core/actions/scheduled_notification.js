const {dateToCorn} = require("../helpers");
const firebaseAdmin = require("../../services/firebase_admin");
const notification = require("../../database/models").Notification;
const db = require("../../database/models");
const createSchedule = require('../../services/schedule').createSchedule
const getJobs = require('../../services/schedule').getJobs

async function scheduledNotification({
                                         date,
                                         data,
                                         registrationToken,
                                         timeZoneName,
                                         timeZoneOffset,
                                         repeatedEvery,
                                         uuid
                                     }) {

    const [noty, created] = await notification.findOrCreate({
        where: {
            uuid
        },
        defaults: {
            date,
            data,
            registrationToken,
            timeZoneName,
            timeZoneOffset,
            repeatedEvery,
            uuid,
        },
    });
    if(!created){
       await noty.update({
            date,
            data,
            registrationToken,
            timeZoneName,
            timeZoneOffset,
            repeatedEvery,
        })
    }
    const j = getJobs()[uuid];
    if (j){
        j.cancel()
    }
    createSchedule(uuid, dateToCorn(date, timeZoneName, repeatedEvery), () => {
        firebaseAdmin.sendNotification({
            data: data ?? {},
            registrationToken
        });
    });
    return noty;
}

module.exports = {scheduledNotification}
