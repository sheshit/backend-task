var validator = require('validator');
function isEmail(PAN){
   var number = PAN.substring(5,9);
   if (PAN.length == 10 && validator.isInt(number)) {
      return true;
   }
      return false;
};

module.exports = isEmail;