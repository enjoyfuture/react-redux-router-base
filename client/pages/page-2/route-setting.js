// 路由设置
const win = window;
const doc = document;
const body = doc.body;

class RouteSetting {
  // 需要设置 body class 的路由
  static bodyCls = {
    home: 'home-bg',
  };

  static titles = {
    home: '项目列表',
  };

  // 设置 Title
  setTitle(key) {
    //设置标题
  }

  // 设置埋点
  setBuriedPoint(key) {
  }

  toggleBodyCls(key, toggle) {
    const value = RouteSetting.bodyCls[key];
    if (value) {
      body.classList[toggle](value);
    }
  }

  // 设置 body 样式
  setBodyStyle(key) {
  }

  // 进入一个新的路由触发的事件
  enterHandler = (key) => {
    return () => {
      // 设置 title
      this.setTitle(key);
      // 设置埋点
      this.setBuriedPoint(key);
      // 设置修改 body class
      this.toggleBodyCls(key, 'add');
      // 设置 body 样式
      this.setBodyStyle(key);
    };
  };

  // 离开一个路由触发的事件
  leaveHandler = (key) => {
    return () => {
      // 设置修改 body class
      this.toggleBodyCls(key, 'remove');
    };
  };
}

const routeSetting = new RouteSetting();

export const enterHandler = routeSetting.enterHandler;
export const leaveHandler = routeSetting.leaveHandler;

export default {
  enterHandler: routeSetting.enterHandler,
  leaveHandler: routeSetting.leaveHandler,
};
