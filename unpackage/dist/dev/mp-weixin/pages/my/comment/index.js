"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_user = require("../../../api/user.js");
if (!Array) {
  const _easycom_wd_card2 = common_vendor.resolveComponent("wd-card");
  _easycom_wd_card2();
}
const _easycom_wd_card = () => "../../../node-modules/wot-design-uni/components/wd-card/wd-card.js";
if (!Math) {
  (NavBar + _easycom_wd_card)();
}
const NavBar = () => "../../../components/NavBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const comments = common_vendor.ref([]);
    common_vendor.onMounted(async () => {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      const res = await api_user.getUserComments(userInfo.userId);
      comments.value = res.rows;
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "获取用户评论信息成功",
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: "获取用户评论信息失败",
          icon: "error"
        });
      }
    });
    const viewDetails = (articleId) => {
      console.log(articleId);
      if (articleId !== null) {
        common_vendor.index.navigateTo({
          url: `/pages/detail/index?id=${articleId}`
        });
      } else {
        common_vendor.index.showToast({
          title: "该评论无法跳转",
          icon: "error"
        });
      }
    };
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.p({
          title: "我的评论",
          showBack: true,
          showShare: true
        }),
        c: common_vendor.f(comments.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: common_vendor.o(($event) => viewDetails(item.articleId)),
            c: "2a78c890-1-" + i0,
            d: common_vendor.p({
              title: item.createTime,
              ["custom-class"]: "comment-card",
              ["custom-footer-class"]: "comment-footer"
            })
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2a78c890"]]);
wx.createPage(MiniProgramPage);
