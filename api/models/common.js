import { HTTP } from "../http.js";

class CommonModel extends HTTP {
  // 登录
  login(data) {
    return this.request({
      url: "/auth/auth/feishu/token",
      data
    });
  }

  // 获取字典
  getDic(data) {
    return this.request({
      url: "/system/dictionary/cate/list?keyword=" + data
    });
  }
}

export { CommonModel };
