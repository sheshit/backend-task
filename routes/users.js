var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', verifyToken, function (req, res, next) {
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    }
    else {
      res.send({ authData });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    req.token = bearerHeader;
    next();
  }

  else {
    res.sendStatus(403);
  }
}

module.exports = router;
