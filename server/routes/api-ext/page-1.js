const express = require('express');
const service = require('../../service/page-1');
const { wrapData } = require('../../helper/utils');
const router = express.Router();

// 后台访问多个接口时，是同步的情况，即后一个接口需要用到前一个接口返回的数据
router.post('/sync-list', (req, res, next) => {
  const { code } = req.body;
  service
    .syncList(req, {
      code,
    })
    .then(body => {
      res.json(body);
    })
    .catch(err => {
      next(err);
    });
});

// 后台访问多个接口时，是异步的情况，即各个接口数据都是单独的
router.post('/async-list', (req, res, next) => {
  const { code } = req.body;
  service
    .asyncList(req, {
      code,
    })
    .then(body => {
      res.json(wrapData(body));
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
