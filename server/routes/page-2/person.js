const express = require('express');
const service = require('../../service/page-2/person');
const router = express.Router();

router.post('/persons', (req, res, next) => {
  const {code} = req.body;
  service.persons(req, {
    code
  }).then((body) => {
    res.json(body);
  }).catch((err) => {
    next(err);
  });
});

module.exports = router;

