import Taro from "@tarojs/taro";
import { config } from "./config";

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
  request({ url, data = {}, method = "GET", type = "json" }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method, type);
    });
  }

  _request(url, resolve, reject, data = {}, method = "GET", type) {
    Taro.showLoading({
      title: "加载中",
      mask: true
    });

    const header = {
      "api-version": "1.0",
      "content-type": `application/${type}`,
      Authorization: Taro.getStorageSync("token")
        ? Taro.getStorageSync("token")
        : url === "/auth/auth/feishu/token"
        ? ""
        : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNyIsInVzZXJfbmFtZSI6IndhbmdsZWlqdW4iLCJzY29wZSI6WyJhbGwiXSwibmFtZSI6IjU0NkxiR1ZwYW5WdSIsImV4cCI6MTY0MDY1NzcxMSwianRpIjoidkJFTXI5Q1Y5cHNuZ3g4ZHQzREpwakVEZFlnIiwicGxhdGVfY29kZSI6Ik9WSEEiLCJjbGllbnRfaWQiOiJ3ZWItY2xpZW50In0.DHPuDssZgLD9FMG9bE3JHWKNxzYUW3IZtSO4umvdw0M"
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
    console.log("un login");
    Taro.showLoading({
      title: "加载中",
      mask: true
    });
    // 2. 新用户未登录
    Taro.showModal({
      title: "提示",
      content: "请点击头像登录",
      success(res) {
        if (res.confirm) {
          Taro.navigateTo({
            url: "/pages/my/index"
          });
        } else if (res.cancel) {
        }
      }
    });
  }

  _unAuth() {
    console.log("un auth");
    // 1. 新用户未认证
    Taro.showModal({
      title: "提示",
      content: "请认证后再进行该操作",
      success(res) {
        if (res.confirm) {
          Taro.redirectTo({
            url: "/pages/person/index"
          });
        } else if (res.cancel) {
        }
      }
    });
  }
};

export { http as HTTP };
