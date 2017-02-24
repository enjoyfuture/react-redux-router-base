const express = require('express');
const service = require('../../../service/page-2/film');
const router = express.Router();

router.get('/:type', (req, res, next) => {
  const {type} = req.params;
  service.filmList(req, type).then((body) => {
    res.json(body);
  }).catch((err) => {
    next(err);
  });
});

module.exports = router;

