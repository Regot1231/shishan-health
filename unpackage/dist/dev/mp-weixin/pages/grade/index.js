"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  (CustomNavbar + ScoreShareComponent)();
}
const CustomNavbar = () => "../../components/CustomNavbar.js";
const ScoreShareComponent = () => "../../components/ScoreShareComponent.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const description = common_vendor.ref("您的打卡记录已提交，请等待管理员评分~");
    const scoreDisplay = common_vendor.ref("？？");
    common_vendor.ref(97);
    const mySrc = common_vendor.ref("/static/image/bottomBar/my.png");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          position: "center",
          title: "打卡分享",
          showBack: "true",
          isFixed: false
        }),
        b: common_assets._imports_0,
        c: common_vendor.p({
          description: description.value,
          scoreDisplay: scoreDisplay.value,
          mySrc: mySrc.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-72ac6b71"]]);
wx.createPage(MiniProgramPage);
