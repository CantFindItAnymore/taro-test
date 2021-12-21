import { HTTP } from "../http.js";

class HomeModel extends HTTP {
  // 获取数量
  getCount() {
    return this.request({
      url: "/system-index/front"
    });
  }

  // 获取列表
  getList() {
    return this.request({
      url: "/system-index/front"
    });
  }
}

export { HomeModel };
