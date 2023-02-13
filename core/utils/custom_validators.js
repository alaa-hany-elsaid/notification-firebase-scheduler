const {DateTime} = require("luxon");

function isDateCustom(date){
    return DateTime.fromFormat(date, 'yyyy/MM/dd hh:mm:ss').isValid;
}


module.exports =   { isDateCustom } ;