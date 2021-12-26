import Taro from "@tarojs/taro";
import { config } from "./config";

console.log("test0");

const codeMessage = {
  // 200: '服务器成功返回请求的数据',
  // 201: '新建或修改数据成功',
  // 202: '一个请求已经进入后台排队（异步任务）',
  // 204: '删除数据成功',
  "400": "发出的请求有错误, 服务器没有进行新建或修改数据的操作",
  "401": "用户没有权限（令牌 / 用户名 /密码错误）",
  "403": "用户得到授权, 但是访问是被禁止的",
  "404": "发出的请求针对的是不存在的记录, 服务器没有进行操作",
  "406": "请求的格式不可得",
  "410": "请求的资源被永久删除, 且不会再得到的",
  "422": "当创建一个对象时, 发生一个验证错误",
  "500": "服务器发生错误, 请检查服务器",
  "502": "网关错误",
  "503": "服务不可用, 服务器暂时过载或维护",
  "504": "网关超时"
};

const http = class HTTP {
  request({ url, data = {}, method = "GET", type = "application/json" }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method, type);
    });
  }

  _request(url, resolve, reject, data = {}, method = "GET", type) {
    console.log("test1");
    Taro.showLoading({
      title: "加载中",
      mask: true
    });

    const header = {
      "api-version": "1.0",
      "content-type": type,
      path: url === "/auth/oauth/token" ? "/login" : "",
      Authorization:
        // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTE1IiwidXNlcl9uYW1lIjoicmFuanVuIiwic2NvcGUiOlsiYWxsIl0sIm5hbWUiOiI1WWFKNUwrSyIsImV4cCI6MTY0MTAyOTk4OSwianRpIjoiRV8zcXg4RGVjYWxiYjNaOEZXbndTNW04aUNRIiwicGxhdGVfY29kZSI6Ik9WSEEiLCJjbGllbnRfaWQiOiJ3ZWItY2xpZW50In0.o0DzvxouwjguFgJyElgIJ2e8OO_QAVuUh4iTkmU3UE8"
        url === "/auth/oauth/token"
          ? "Basic d2ViLWNsaWVudDpUVFNTT0RtQUJwRVNCTUZSYXpPb0ZwdEhFa2FsV3loVw=="
          : "Bearer " + Taro.getStorageSync("token") ?? ""
    };

    Taro.request({
      url: config.baseUrl + url,
      method: method,
      header: header,
      data: data,
      success: res => {
        console.log("res", res);
        const code = res.data?.header?.returnCode;
        const status = res.statusCode.toString();
        if (String(status).startsWith("2")) {
          switch (code) {
            case 0:
              console.log("ok");
              resolve(res.data.content);
              break;
            case 9999:
              this._tokenOut();
              reject();
              break;

            default:
              console.log("IO成功但请求失败：", res);
              this._showErr(res.data.error.message);
              reject();
              break;
          }
        } else {
          this._showErr(codeMessage[res.statusCode.toString()]);
          reject();
        }
      },
      fail: err => {
        console.log("request fail", err);
        this._showErr(err.errMsg);
        reject(err);
      },
      complete: () => {
        Taro.hideLoading();
      }
    });
  }

  // 私有方法，用以输出错误信息
  _showErr(err) {
    if (!err) {
      err = "未知错误";
    }
    Taro.hideLoading(
      {
        complete: () => {
          Taro.showToast({
            title: err,
            icon: "none",
            duration: 2000
          });
        }
      },
      1000
    );
  }

  _tokenOut() {
    const _this = this;
    console.log("un login");
    Taro.showLoading({
      title: "授权中",
      mask: true
    });

    Taro.login({
      success: function({ code, errMsg }) {
        Taro.uploadFile({
          url: config.baseUrl + "/auth/oauth/token", //仅为示例，非真实的接口地址
          filePath:
            "ttfile://temp/14662389-0813-47f0-9d71-b46a191cdadc-WechatIMG26.jpeg",
          header: {
            "api-version": "1.0",
            "content-type":
              "multipart/form-data; boundary=----WebKitFormBoundaryAjLehAgQzkqM4XcQ",
            path: "/login",
            Authorization:
              "Basic d2ViLWNsaWVudDpUVFNTT0RtQUJwRVNCTUZSYXpPb0ZwdEhFa2FsV3loVw=="
          },
          name: "file",
          formData: {
            code,
            grant_type: "feishu",
            remember: "true",
            scope: "all"
          },
          success(res1) {
            const token = JSON.parse(res1.data)?.content?.access_token;
            console.log("token", token);
            Taro.setStorage({
              key: "token",
              data: token
            });

            _this._getUserInfo(token);
          },
          complete() {
            Taro.hideLoading();
          }
        });
      }
    });
  }

  _getUserInfo(token) {
    if (!token) {
      return;
    }
    const _this = this;
    Taro.request({
      url: config.baseUrl + "/member/user/userInfo",
      header: {
        "api-version": "1.0",
        "content-type": "application/json",
        Authorization: "Bearer " + token
      },
      success: function(res) {
        console.log("userInfo", res);
        Taro.setStorage({
          key: "userInfo",
          data: res?.data?.content
        });
        // Taro.reLaunch({
        //   url: "/pages/home/index"
        // });
        _this._showErr("授权成功");
      }
    });
  }
};

export { http as HTTP };
