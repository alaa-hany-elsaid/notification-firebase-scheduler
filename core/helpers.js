const {DateTime} = require("luxon");
const {isDateCustom} = require("./utils/custom_validators");


/*

['NONE', 'DAY', 'WEEK', 'MONTH', 'YEAR']
 */
function dateToCorn(date, timeZoneName, repeatedEvery) {
    let dateTime = DateTime.fromFormat(date + ' ' + timeZoneName, 'yyyy/MM/dd hh:mm:ss Z', {
        setZone: true
    }).toLocal();

    return dateTimeToCorn(dateTime , repeatedEvery);
}


function  dateTimeToCorn(dateTime , repeatedEvery='NONE' ) {

    return  `*/5 * * * *`;

    let base = `${dateTime.second} ${dateTime.minute} ${dateTime.hour}`
    if (repeatedEvery == 'DAY') {
        return `${base} * * *`
    } else if (repeatedEvery == 'WEEK') {
        return `${base} * * ${dateTime.weekday}`
    } else if (repeatedEvery == 'MONTH') {
        return `${base} ${dateTime.day} * *`
    } else if (repeatedEvery == 'YEAR') {
        return `${base} ${dateTime.day} ${dateTime.month} *`
    }
    return `${base} ${dateTime.day} ${dateTime.month} ${dateTime.weekday}`
}

function generateCornAfter({duration , value}) {

    let dateTime = DateTime.now().plus( {
        duration : value
    } );

    return dateTimeToCorn(dateTime);



}


function  validateDateTime(date) {
    return isDateCustom(date);
}

module.exports =   { dateToCorn , generateCornAfter , validateDateTime } ;