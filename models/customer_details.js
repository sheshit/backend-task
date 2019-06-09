const mongoose = require('mongoose');

const { Schema } = mongoose;

function EmailValidator(id){
   return id.includes("@") && id.includes(".com");
}

const Customer_Details_Schema = new Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    father_name: {
      type: String,
      required: true
    },
    PAN: {
      type: String,
      required: true
    },
    date_of_birth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      validate: [EmailValidator, 'check email']
    },
    address: {
      type: String,
      required: true
    },
    profile_image: {
      type: String,
      required: true
    }
  }
);

const customer_detail = mongoose.model('CustomerDetails', Customer_Details_Schema);

module.exports = customer_detail;
