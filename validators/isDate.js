var validator = require('validator');
function isDate(date) {
    if (validator.isISO8601(date)) {
        return true;
    }
    return false;
};

module.exports = isDate;