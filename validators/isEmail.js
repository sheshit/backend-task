var validator = require('validator');
function isEmail(id){
   if (validator.isEmail(id)) {;
      return true;
   }
      return false;
};

module.exports = isEmail;