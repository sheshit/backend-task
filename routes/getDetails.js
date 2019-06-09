var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const dbsExports = require('../dbs');
const customer_detail = require('../models/customer_details');

/* GET Customers listing. */
router.get('/', verifyToken, function (req, res, next) {
  const CustomerDBConnection = dbsExports.getCustomerDBConnection();
  var CustomerDB = CustomerDBConnection.db("customer");
  CustomerDB.collection('customer_details').find({}).toArray((err, result) => {
    res.send({ result });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    jwt.verify(bearerHeader, 'secretKey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      }
      else {
        next();
      }
    });
  }

  else {
    res.sendStatus(403);
  }
}

module.exports = router;
