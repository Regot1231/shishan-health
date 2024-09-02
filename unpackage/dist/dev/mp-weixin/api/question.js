"use strict";
const utils_request = require("../utils/request.js");
const getQuestionInfo = () => {
  return utils_request.request({
    url: `/system/questionnaire/getQuestionnaireMessage`,
    method: "GET"
  });
};
const postQuestionInfo = (textAnswer, data) => {
  return utils_request.request({
    url: `/system/questionnaire/submitQuestionnaire?text=${textAnswer}`,
    method: "POST",
    header: {
      "Content-Type": "application/json"
      // 指定请求体的类型为 JSON
    },
    data
  });
};
exports.getQuestionInfo = getQuestionInfo;
exports.postQuestionInfo = postQuestionInfo;
