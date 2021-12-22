import { HTTP } from "../http.js";

class SettingModel extends HTTP {
  // 获取用户信息
  getUserInfo(data) {
    return this.request({
      url: "/member/user/userInfo"
    });
  }

  // 修改密码
  editPass(data) {
    return this.request({
      url: "/member/user/password/reset",
      method: "PUT",
      data
    });
  }
}

export { SettingModel };
