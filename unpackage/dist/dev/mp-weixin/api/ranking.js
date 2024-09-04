"use strict";
const utils_request = require("../utils/request.js");
const getCardRankings = (data) => {
  return utils_request.request({
    url: "/system/user/getCardRankings",
    // 具体的注册 API 路径
    method: "GET",
    data
    // 注册时发送的数据
  });
};
exports.getCardRankings = getCardRankings;
