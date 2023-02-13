const express = require('express')
const router = express.Router()
const {body, validationResult} = require('express-validator');
const {scheduledNotification } = require("../../core/actions/scheduled_notification");
const {isDateCustom} = require("../../core/utils/custom_validators");
const firebaseAdmin = require("../../services/firebase_admin");
const schedule = require("../../services/schedule");





router.post('/notification',
    body('registrationToken').isString(),
    body('timeZoneName').isString(),
    body('timeZoneOffset').isString(),
    body('uuid').isString(),
    body('repeatedEvery').isIn(['NONE', 'DAY', 'WEEK', 'MONTH', 'YEAR']),
    body('date').custom(isDateCustom),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "The request body contains errors", errors: errors.array()});
        }
        // ------------------- //
        scheduledNotification(req.body).then((noty) => {
            res.json({
                code: 200,
                message: `Schedule Notification created successfully with id : ${noty.id}`
            });
        }).catch((e) => {
            res.json({
                code: 500,
                message: e.message
            });
        })
        // ------------------- //


    }
)
router.post('/notification/now',
    body('registrationToken').isString(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "The request body contains errors", errors: errors.array()});
        }
        firebaseAdmin.sendNotification({
            data: req.body.data ?? {},
            registrationToken: req.body.registrationToken
        }).then((msg) => {
            res.json({
                code: 200,
                message: msg

            });
        }).catch((e) => {
            res.json({
                code: 500,
                message: e.message
            });
        })
        // ------------------- //
    }
)

router.get('/notification',
    (req, res) => {

       res.json( schedule.getJobs())
        // ------------------- //
    }
)

module.exports = router