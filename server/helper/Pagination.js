/**
 * 功能描述：分页实体类
 * @namespace
 * @param options {Object}
 * options 可选属性有：
 > * pageSize 每页显示的记录数
 > * currentPage 当前页
 > * lastPage 是否为最后一页
 > * pageCount 总页码
 > * totalCount 记录总数

 * @constructor
 */

class Pagination {
  constructor(options = {}) {
    this.success = true;
    this.data = {
      pageSize: options.pageSize || 20, //默认每页显示20条记录
      currentPage: Number(options.currentPage || 1)
    };
  }

  /**
   * 设置分页属性值
   * @param options
   */
  setOptions(options) {
    Object.assign(this.data, options);
    this.updatePage();
  }

  /**
   * 更新分页信息，主要更新页码总数和是否为最后一页
   */
  updatePage() {
    const {totalCount, pageSize, currentPage} = this.data;

    //总页码
    const pageCount = Math.ceil(totalCount / pageSize);
    const lastPage = totalCount === 0 || pageCount === currentPage;
    this.data.pageCount = pageCount;
    this.data.lastPage = lastPage;
  }

  /**
   * 设置分页记录数据
   * @param items
   */
  setItems(items) {
    this.data.items = items;
  }

  /**
   * 设置错误信息和错误 code
   * @param {message, errorCode}
   */
  setError({message, errorCode}) {
    this.success = false;
    if (message) {
      this.message = message;
    }
    if (errorCode) {
      this.errorCode = errorCode;
    }
  }
}

module.exports = Pagination;
