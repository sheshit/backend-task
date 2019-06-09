
const AWS = require("aws-sdk");
const keys = require('./keys');

AWS.config.update({
    accessKeyId: keys.iam_access_id,
    secretAccessKey: keys.iam_secret,
    region: "ap-south-1"
});

//Creating a new instance of S3:
const s3 = new AWS.S3();

module.exports = s3;