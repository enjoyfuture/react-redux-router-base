const fs = require('fs');
const express = require('express');
const service = require('../../service/common');
const router = express.Router();

const uploadFile = require('../../helper/utils').getUploadFile();

// 文件下载
router.get('/file-download/:filename', (req, res, next) => {

  service.fileDownload(req, req.body).then((data) => {
    // res.setHeader('Content-Type', 'application/pdf');
    res.writeHead(200, 'Ok');
    res.write(data, 'binary');
    res.end();
  }).catch((err) => {
    next(err);
  });
});

/**
 * 文件上传
 */
router.post('/file-upload', uploadFile.any(), (req, res, next) => {
  const formData = {
    ...req.body,
  };

  const filePaths = [];

  if (req.files && req.files.length > 0) {
    req.files.forEach((item) => {
      formData[item.fieldname] = fs.createReadStream(item.path);
      filePaths.push(item.path);
    });

    service.fileUpload(req, formData, filePaths).then((data) => {
      res.send(data);

      // 对于低版本的 ie 浏览器，需要格式为 text 格式
      // res.set('Content-Type', 'text/html');
      // res.send(JSON.stringify(data));
    }).catch((err) => {
      next(err);
    });
  } else {
    next(new Error('文件为空，请选择文件！'));
  }
});

module.exports = router;
