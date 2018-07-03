const express = require('express');
const service = require('../../../service/page-2/person');
const router = express.Router();

router.get('/', (req, res, next) => {
  const {pageNum} = req.query;
  service.paging(req, pageNum).then((body) => {
    if (body.success) {
      const {data} = body;
      data.pageNum = Number(pageNum);
      data.lastPage = Number(pageNum) === data.totalPages;
    }
    res.json(body);
  }).catch((err) => {
    next(err);
  });
});

router.delete('/', (req, res, next) => {
  const {id} = req.body;
  service.removePerson(req, {
    id
  }).then((body) => {
    res.json(body);
  }).catch((err) => {
    next(err);
  });
});

router.post('/', (req, res, next) => {
  const {id, firstName, lastName} = req.body;
  service.savePerson(req, {
    id, firstName, lastName
  }).then((body) => {
    res.json(body);
  }).catch((err) => {
    next(err);
  });
});

module.exports = router;

