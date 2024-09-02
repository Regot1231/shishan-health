"use strict";
const common_vendor = require("../common/vendor.js");
const baseURL = "http://47.115.213.253:3233";
const httpInterceptor = {
  // 拦截前触发
  invoke(options) {
    if (!options.url.startsWith("http")) {
      options.url = baseURL + options.url;
    }
    options.timeout = 1e4;
    const token = common_vendor.index.getStorageSync("token");
    if (token) {
      options.header = {
        ...options.header,
        Authorization: token
      };
    }
  }
};
common_vendor.index.addInterceptor("request", httpInterceptor);
common_vendor.index.addInterceptor("uploadFile", httpInterceptor);
const request = (options) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      ...options,
      // 响应成功
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
          if (res.data.code === 401) {
            common_vendor.index.removeStorageSync("token");
            common_vendor.index.navigateTo({ url: "/pages/login/index" });
          }
        } else if (res.statusCode === 401) {
          common_vendor.index.removeStorageSync("token");
          common_vendor.index.navigateTo({ url: "/pages/login/index" });
          reject(res);
        } else {
          common_vendor.index.showToast({
            icon: "none",
            title: (res.data && res.data.msg || "请求错误").slice(0, 14)
            // 根据需要调整长度
          });
          reject(res);
        }
      },
      // 响应失败
      fail(err) {
        common_vendor.index.showToast({
          icon: "none",
          title: "网络错误，换个网络试试"
        });
        reject(err);
      }
    });
  });
};
exports.request = request;
