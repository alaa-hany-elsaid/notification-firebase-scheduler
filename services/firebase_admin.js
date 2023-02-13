const admin = require("firebase-admin");
const serviceAccount = require("../config/firebase-service-account.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "business-bag.firebaseio.com"
});
const firebaseAdmin = {};
firebaseAdmin.sendMulticastNotification = function (payload) {
    const message = {
        notification: {
            title: payload.title,
            body: payload.body
        },
        tokens: payload.tokens,
        data: payload.data || {}
    };
    return admin.messaging().sendMulticast(message);
};

firebaseAdmin.sendNotification = function (payload) {

    payload.data =  (typeof payload.data === 'string'  ? JSON.parse(payload.data) : {

    } ) ;

    const message = {
        notification: {
            title: payload.data.title ?? "reminder",
            body: payload.data.body ?? "it 's just reminder"
        },
        data: payload.data,
    }
    return admin.messaging().sendToDevice(payload.registrationToken, message );

}


module.exports = firebaseAdmin;