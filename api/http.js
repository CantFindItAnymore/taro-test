import Taro from "@tarojs/taro";
import { config } from "./config";
import snow from "./snow.jpg";

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
      Authorization:
        // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTAiLCJ1c2VyX25hbWUiOiJ6c2MiLCJzY29wZSI6WyJhbGwiXSwibmFtZSI6IjVieWdjMk09IiwiZXhwIjoxNjQxMTgwMTQyLCJqdGkiOiJWdmd4MGJDenRWa0tta0R0WnhMR3JRNlJKUUkiLCJwbGF0ZV9jb2RlIjoiT1ZIQSIsImNsaWVudF9pZCI6IndlYi1jbGllbnQifQ.ARANCd6L8zi2gqHy3yVAs3Hl18LOlUr4PQ3AVP8rh-0" // 128

        // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTE5IiwidXNlcl9uYW1lIjoieWFuZ3pob25nIiwic2NvcGUiOlsiYWxsIl0sIm5hbWUiOiI1cDJvNlpLZiIsImV4cCI6MTY0MTIwNjAxNSwianRpIjoiZ2pSM1l5cTk3d3dsazB3LXoyeWMzQ25XVEFvIiwicGxhdGVfY29kZSI6Ik9WSEEiLCJjbGllbnRfaWQiOiJ3ZWItY2xpZW50In0.2yocXep9R5JmKmQXG0xDzbXqSHvkjwKp6s8ys8Hj4io" // 测试

        url === "/auth/oauth/token"
          ? "Basic d2ViLWNsaWVudDpUVFNTT0RtQUJwRVNCTUZSYXpPb0ZwdEhFa2FsV3loVw=="
          : Taro.getStorageSync("token")
          ? "Bearer " + Taro.getStorageSync("token")
          : "Bearer 555"
    };

    console.log("header", header);

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
              console.log("test2");
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
          console.log("test3");
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

    console.log(19, snow);

    Taro.compressImage({
      src: snow, // 正式环境
      // src: "http://tva1.sinaimg.cn/mw600/942f7cbbly1gxtcoj2m6tj20q40hoq4o.jpg", // 开发环境
      quality: 20, // 压缩质量
      success({ tempFilePath }) {
        console.log(21, tempFilePath);
        Taro.login({
          success: function({ code, errMsg }) {
            Taro.uploadFile({
              url: config.baseUrl + "/auth/oauth/token", //仅为示例，非真实的接口地址
              filePath: tempFilePath,
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
              fail(err) {
                console.log(33, err);
              },
              complete() {
                Taro.hideLoading();
              }
            });
          },
          fail(err) {
            console.log(33, err);
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
        Taro.reLaunch({
          url: "/pages/home/index"
        });
        _this._showErr("授权成功");
      }
    });
  }
};

export { http as HTTP };
