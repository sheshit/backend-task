var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const dbsExports = require('../dbs');
var mongoose = require("mongoose");
const s3 = require('../s3Instance');
const upload = require('../multerUpload');
const fs = require("fs");
const customer_detail = require('../models/customer_details');
const isEmail = require('../validators/isEmail');
const isRequired = require('../validators/isRequired');
const isDate = require('../validators/isDate');
const isPAN = require('../validators/isPAN');

/* PUT Customer Details */
router.post('/', verifyToken, upload.single("profile_image"), dataValidation, uploadFileToS3, function (req, res, next) {
    let {
        first_name,
        last_name,
        father_name,
        PAN,
        date_of_birth,
        gender,
        email,
        address
    } = req.body;
    var customer_details = new customer_detail({
        first_name,
        last_name,
        father_name,
        PAN,
        date_of_birth,
        gender,
        email,
        address,
        profile_image: req.awsFileName
    });
    const CustomerDBConnection = dbsExports.getCustomerDBConnection();
    var CustomerDB = CustomerDBConnection.db("customer");
    CustomerDB.collection("customer_details").insertOne(customer_details, (err, res) => {
        if (err) {
            console.log(err);
        }
    });
    res.send({ "message": "success" });
});

function dataValidation(req, res, next) {
    let {
        PAN,
        date_of_birth,
        email,
    } = req.body;
    if (isRequired(req.body,req.file) && isEmail(email) && isDate(date_of_birth) && isPAN(PAN)) {
        next();
    }
    else
        res.sendStatus(403);
}

function uploadFileToS3(req, res, next) {
    console.log("preparing to upload...");
    var awsFileName = mongoose.Types.ObjectId() + ".jpg";
    req.awsFileName = `https://backend-task.s3.ap-south-1.amazonaws.com/${awsFileName}`
    fs.readFile(req.file.path, function (err, filedata) {
        if (!err) {
            const putParams = {
                ACL: "public-read",
                Bucket: "backend-task",
                Key: awsFileName,
                Body: filedata
            };
            s3.putObject(putParams, function (err, data) {
                if (err) {
                    console.log("Could nor upload the file. Error :", err);
                } else {
                    console.log("Image successfully uploaded");
                    fs.unlink(req.file.path, (err) => {
                        if (!err) {
                            console.log("deleted");
                        }
                    }); // Deleting the file from uploads folder
                    next();
                }
            });
        } else {
            console.log({ err: err });
        }
    });
}

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