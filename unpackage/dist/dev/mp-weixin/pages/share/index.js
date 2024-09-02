"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_article = require("../../api/article.js");
if (!Array) {
  const _component_TabBar = common_vendor.resolveComponent("TabBar");
  _component_TabBar();
}
if (!Math) {
  (CustomNavbar + ArticleSection)();
}
const CustomNavbar = () => "../../components/CustomNavbar.js";
const ArticleSection = () => "../../components/ArticleSection.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const shareList = common_vendor.ref([]);
    common_vendor.ref({});
    const viewDetails = (articleId) => {
      console.log(articleId);
      common_vendor.index.navigateTo({
        url: `/pages/detail/index?id=${articleId}`
      });
    };
    common_vendor.onMounted(async () => {
      const res = await api_article.getShareList();
      if (res.code === 200) {
        shareList.value = res.rows;
        common_vendor.index.showToast({
          title: "获取分享信息成功",
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: "获取分享信息失败",
          icon: "none"
        });
      }
    });
    const isDarkened = common_vendor.ref(false);
    const handleChooseWay = () => {
      isDarkened.value = !isDarkened.value;
    };
    common_vendor.onShow(() => {
      const curPages = getCurrentPages()[0];
      if (typeof curPages.getTabBar === "function" && curPages.getTabBar()) {
        curPages.getTabBar().setData({
          selected: 3
          // 表示当前菜单的索引，该值在不同的页面表示不同
        });
      }
    });
    common_vendor.onHide(() => {
      isDarkened.value = false;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "交流分享",
          bgSrc: common_vendor.unref(common_assets.bgImg)
        }),
        b: common_vendor.f(shareList.value, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => viewDetails(item.articleId)),
            b: "553f1739-1-" + i0,
            c: common_vendor.p({
              article: item
            })
          };
        }),
        c: isDarkened.value ? "brightness(0.5)" : "brightness(1)",
        d: common_vendor.o(handleChooseWay),
        e: common_vendor.p({
          selected: 3
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-553f1739"]]);
wx.createPage(MiniProgramPage);
