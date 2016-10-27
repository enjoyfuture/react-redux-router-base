const express = require('express');
const router = express.Router();
const Mock = require('mockjs');

//电影列表
router.get('/list', (req, res) => {
  /*eslint-disable prefer-template*/
  const currentPage = req.body.currentPage;
  const list = Mock.mock({
    success: true,
    data: {
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
    }
  });

  return res.json(list);
});


module.exports = router;

