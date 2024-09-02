"use strict";
const utils_request = require("../utils/request.js");
const postCard = (data) => {
  return utils_request.request({
    url: `/system/card/addCard`,
    method: "POST",
    header: {
      "content-type": "application/x-www-form-urlencoded"
      //自定义请求头信息
    },
    data
  });
};
const getCardList = (userId) => {
  return utils_request.request({
    url: "/system/card/list",
    method: "GET",
    data: {
      userId
    }
  });
};
exports.getCardList = getCardList;
exports.postCard = postCard;
