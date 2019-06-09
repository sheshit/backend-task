//Connection Pooling
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const assert = require('assert');
const keys = require('../keys');

const CustomerDB_URL = keys.CustomerDB_URL;
let CustomerDB_Connection = [];
const establishCustomerDBConnection = async (callback) => {
  await MongoClient.connect(CustomerDB_URL, { native_parser: true }, (err, db) => {
    console.log('establishCustomerDBConnection');
    assert.equal(null, err);
    CustomerDB_Connection = db;
    if (typeof callback === 'function' && callback) callback();
  });
};

function getCustomerDBConnection() {
  return CustomerDB_Connection;
}

module.exports = {
  establishCustomerDBConnection,
  getCustomerDBConnection
};
