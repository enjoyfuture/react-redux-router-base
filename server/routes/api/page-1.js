const express = require('express');
const service = require('../../service/page-1');
const router = express.Router();

router.post('/list', (req, res, next) => {
  const {code} = req.body;
  service.list(req, {
    code
  }).then((body) => {
    res.json(body);
  }).catch((err) => {
    next(err);
  });
});

module.exports = router;

