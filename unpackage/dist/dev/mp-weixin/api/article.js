"use strict";
const utils_request = require("../utils/request.js");
const getHotInfo = () => {
  return utils_request.request({
    url: "/system/article/frontList",
    method: "GET"
  });
};
const getArticleDetail = (articleId) => {
  return utils_request.request({
    url: `/system/article/${articleId}`,
    method: "GET"
  });
};
const getCommentLikeLists = (articleId) => {
  return utils_request.request({
    url: `/system/comment/listByLike`,
    method: "GET",
    data: {
      articleId
      // 传递的 params 参数
    }
  });
};
const getCommentNewLists = (articleId) => {
  return utils_request.request({
    url: `/system/comment/listByTime`,
    method: "GET",
    data: {
      articleId
      // 传递的 params 参数
    }
  });
};
const postLike = (data) => {
  return utils_request.request({
    url: `/system/article/addLike`,
    method: "POST",
    header: {
      "content-type": "application/x-www-form-urlencoded"
      //自定义请求头信息
    },
    data
  });
};
const postView = (data) => {
  return utils_request.request({
    url: `/system/article/addView`,
    method: "POST",
    header: {
      "content-type": "application/x-www-form-urlencoded"
      //自定义请求头信息
    },
    data
  });
};
const postComment = (data) => {
  return utils_request.request({
    url: `/system/comment/addComment`,
    method: "POST",
    header: {
      "content-type": "application/json"
      //自定义请求头信息
    },
    data
  });
};
const getScienceList = () => {
  return utils_request.request({
    url: `/system/article/scienceList`,
    method: "GET",
    header: {
      "content-type": "application/x-www-form-urlencoded"
      //自定义请求头信息
    },
    data: {
      status: 0
    }
  });
};
const getShareList = () => {
  return utils_request.request({
    url: `/system/article/scienceList`,
    method: "GET",
    header: {
      "content-type": "application/x-www-form-urlencoded"
      //自定义请求头信息
    },
    data: {
      status: 1
    }
  });
};
exports.getArticleDetail = getArticleDetail;
exports.getCommentLikeLists = getCommentLikeLists;
exports.getCommentNewLists = getCommentNewLists;
exports.getHotInfo = getHotInfo;
exports.getScienceList = getScienceList;
exports.getShareList = getShareList;
exports.postComment = postComment;
exports.postLike = postLike;
exports.postView = postView;
