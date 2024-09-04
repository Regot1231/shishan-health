"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_card = require("../../api/card.js");
if (!Math) {
  (CustomNavbar + ScoreShareComponent)();
}
const CustomNavbar = () => "../../components/CustomNavbar.js";
const ScoreShareComponent = () => "../../components/ScoreShareComponent.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const cardList = common_vendor.ref([]);
    const sendGetCardList = async (id) => {
      const respond = await api_card.getCardList(id);
      if (respond.code === 200) {
        cardList.value = respond.rows;
        common_vendor.index.showToast({
          title: "获取用户打卡记录成功",
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: "获取用户打卡记录失败",
          icon: "error"
        });
      }
    };
    common_vendor.onShow(() => {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      sendGetCardList(userInfo.userId);
    });
    console.log(cardList);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          position: "center",
          title: "历史评分",
          showBack: "true",
          isFixed: false
        }),
        b: common_assets._imports_0,
        c: common_vendor.f(cardList.value, (item, index, i0) => {
          return {
            a: "b37acf1c-1-" + i0,
            b: common_vendor.p({
              description: item.createTime,
              scoreDisplay: item.score,
              mySrc: item.path
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b37acf1c"]]);
wx.createPage(MiniProgramPage);
