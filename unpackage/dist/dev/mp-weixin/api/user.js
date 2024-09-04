"use strict";
const utils_request = require("../utils/request.js");
const register = (data) => {
  return utils_request.request({
    url: "/register",
    // 具体的注册 API 路径
    method: "POST",
    data
    // 注册时发送的数据
  });
};
const login = (data) => {
  return utils_request.request({
    url: "/login",
    // 具体的登录 API 路径
    method: "POST",
    data
    // 登录时发送的数据
  });
};
const getUserInfo = () => {
  return utils_request.request({
    url: "/system/user/getUserInfo",
    method: "GET"
  });
};
const getOtherUser = (userId) => {
  return utils_request.request({
    url: `/system/user/front/${userId}`,
    method: "GET"
  });
};
const putUserInfo = (data) => {
  return utils_request.request({
    url: `/system/user`,
    method: "PUT",
    header: {
      "Content-Type": "application/json"
      // 指定请求体格式为 JSON
    },
    data
  });
};
const getUserComments = (userId) => {
  return utils_request.request({
    url: `/system/comment/list`,
    method: "GET",
    data: {
      userId
    }
  });
};
exports.getOtherUser = getOtherUser;
exports.getUserComments = getUserComments;
exports.getUserInfo = getUserInfo;
exports.login = login;
exports.putUserInfo = putUserInfo;
exports.register = register;
