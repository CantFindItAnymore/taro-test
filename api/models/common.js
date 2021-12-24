import { HTTP } from "../http.js";

class CommonModel extends HTTP {
  // 登录
  login(data) {
    return this.request({
      url: "/auth/oauth/token",
      data,
      method: "POST"
      // type:
      //   "multipart/form-data; boundary=----WebKitFormBoundaryAjLehAgQzkqM4XcQ"
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
