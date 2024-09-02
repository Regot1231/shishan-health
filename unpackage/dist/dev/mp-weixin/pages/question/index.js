"use strict";
const common_vendor = require("../../common/vendor.js");
const api_question = require("../../api/question.js");
if (!Array) {
  const _easycom_wd_textarea2 = common_vendor.resolveComponent("wd-textarea");
  _easycom_wd_textarea2();
}
const _easycom_wd_textarea = () => "../../node-modules/wot-design-uni/components/wd-textarea/wd-textarea.js";
if (!Math) {
  (NavBar + _easycom_wd_textarea)();
}
const NavBar = () => "../../components/NavBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    const questions = common_vendor.ref([]);
    const answers = common_vendor.ref({});
    const textAnswer = common_vendor.ref("");
    common_vendor.onMounted(async () => {
      try {
        const res = await api_question.getQuestionInfo();
        console.log("API response:", res);
        questions.value = res.data[0].questionList;
      } catch (error) {
        console.error("Error fetching question info:", error);
      }
    });
    const onSingleChange = (questionId, event) => {
      const selectedOption = event.detail.value;
      console.debug("单选题选项:", selectedOption);
      answers.value[questionId] = {
        answerIds: [selectedOption.answerId],
        content: selectedOption.content
      };
      console.debug("更新后的单选题答案:", answers.value);
    };
    const onMultipleChange = (questionId, event) => {
      const selectedOptions = event.detail.value;
      console.debug("多选题选项:", selectedOptions);
      answers.value[questionId] = {
        answerIds: selectedOptions.map((option) => option.answerId),
        content: selectedOptions.map((option) => option.content).join(",")
      };
      console.debug("更新后的多选题答案:", answers.value);
    };
    const handleSubmit = async () => {
      console.log("questions.value:", questions.value);
      if (!Array.isArray(questions.value)) {
        console.error("questions.value is not an array");
        return;
      }
      const submitData = questions.value.map((question) => {
        textAnswer.value = answers.value[question.questionId];
        console.log("answer:", textAnswer.value);
        console.log("answer.answerIds:", textAnswer.value ? textAnswer.value.answerIds : "No answer");
        return {
          createBy: null,
          createTime: (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace("T", " "),
          updateBy: null,
          updateTime: null,
          remark: null,
          questionId: question.questionId,
          questionnaireId: question.questionnaireId,
          content: question.content,
          isDeleted: 0,
          order: question.order,
          answerList: textAnswer.value && Array.isArray(textAnswer.value.answerIds) ? textAnswer.value.answerIds.map((answerId) => {
            const answerContent = question.answerList.find((a) => a.answerId === answerId);
            console.log("answerContent:", answerContent);
            return {
              createBy: null,
              createTime: (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace("T", " "),
              updateBy: null,
              updateTime: null,
              remark: null,
              answerId,
              content: answerContent ? answerContent.content : "",
              questionId: question.questionId,
              isDeleted: 0
            };
          }) : [],
          status: textAnswer.value ? 0 : 2
        };
      });
      const finalSubmitData = {
        createBy: null,
        createTime: (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace("T", " "),
        updateBy: null,
        updateTime: null,
        remark: null,
        questionnaireId: 1,
        content: "睡眠调查",
        isDeleted: 0,
        questionList: submitData
      };
      console.log("提交的数据:", finalSubmitData);
      const res = await api_question.postQuestionInfo(textAnswer.value, finalSubmitData);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "提交成功",
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: "提交失败",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.p({
          title: "问卷调查",
          showBack: true,
          showShare: false
        }),
        c: common_vendor.f(questions.value, (question, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(question.content),
            b: question.status === 0
          }, question.status === 0 ? {
            c: common_vendor.f(question.answerList, (option, idx, i1) => {
              return {
                a: common_vendor.t(option.content),
                b: option,
                c: idx
              };
            }),
            d: common_vendor.o(($event) => onSingleChange(question.questionId, $event), index)
          } : {}, {
            e: question.status === 1
          }, question.status === 1 ? {
            f: common_vendor.f(question.answerList, (option, idx, i1) => {
              return {
                a: common_vendor.t(option.content),
                b: option,
                c: idx
              };
            }),
            g: common_vendor.o(($event) => onMultipleChange(question.questionId, $event), index)
          } : {}, {
            h: question.status === 2
          }, question.status === 2 ? {
            i: "a70bcdb3-1-" + i0,
            j: common_vendor.o(($event) => answers.value[question.questionId] = $event, index),
            k: common_vendor.p({
              ["clear-trigger"]: "focus",
              maxlength: 200,
              clearable: true,
              ["show-word-limit"]: true,
              modelValue: answers.value[question.questionId]
            })
          } : {}, {
            l: index
          });
        }),
        d: common_vendor.o(handleSubmit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a70bcdb3"]]);
wx.createPage(MiniProgramPage);
