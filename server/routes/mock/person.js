const express = require('express');
const router = express.Router();
const Mock = require('mockjs');

/*eslint-disable prefer-template*/
const list = Mock.mock({
  'items|1-10': [
    {
      id: () => {
        return Mock.mock('@guid()');
      },
      'firstName|+1': [
        'Wang' + currentPage,
        'Zhang' + currentPage,
        'Liu' + currentPage
      ],
      'lastName|+1': [
        'Wu' + currentPage,
        'San' + currentPage,
        'Ba' + currentPage
      ]
    }
  ]
});
//电影列表
router.get('/list', (req, res) => {
  return res.json(list);
});


module.exports = router;

