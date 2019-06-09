const express = require("express");
const jwt = require('jsonwebtoken');
const TokenRouter = express.Router();

TokenRouter.get('/', (req, res) => {
    const user = {
        "user_id": "1",
        "username": "sheshit karthikeya",
        "email": "sheshitkarthikeya237@gmail.com"
    }
    jwt.sign({ user }, "secretKey", (err, token) => {
        res.send({
            token
        });
    });
});

module.exports = TokenRouter;