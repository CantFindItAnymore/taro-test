import { HTTP } from "../http.js";

class CommonModel extends HTTP {
  // 登录
  login(data) {
    return this.request({
      url: "/auth/oauth/token",
      data,
      method: "POST"
    });
  }

  // 获取用户信息
  getUserInfo() {
    return this.request({
      url: "/member/user/userInfo"
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
