import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {openToast} from '../../../../common/action/toast';

export class UploadFile extends Component {
  static contextTypes = {
    dispatch: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      fileType: ''
    };
    this.uploadFile = null; // 选择的上传文件
  }

  // 校验 form
  handleValidForm = () => {

  };

  // 文件变化后
  handleChangeFile = () => {

  };

  // 上传
  handleUploadFile = () => {
    if (!this.uploadFile) {
      this.context.dispatch(openToast('请先上传测试数据'));
      return;
    }

    this.refs.uploadForm.submit();
  };

  render() {
    const {fileName, fileType} = this.state;

    return (
      <div className="container">
        <form ref="uploadForm" action="" encType="multipart/form-data" method="post" target="uploadForm"
              onSubmit={this.handleValidForm}>

          <div className="m-b-2">
            <span>文件上传：</span>
            <div className="upload">
              <span>选择文件</span>
              <span className="upload-filename">{fileName}</span>
              <span className="upload-filetype">{fileType}</span>
              <input type="file" name="uploadFile" className="upload-file"
                     onChange={this.handleChangeFile}/>
            </div>
          </div>

          <div>
            <button className="btn btn-raised btn-primary" type="button" onClick={this.handleUploadFile}>上传</button>
          </div>
        </form>
      </div>
    );
  }
}

export default UploadFile;
