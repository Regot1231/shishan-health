"use strict";
const common_vendor = require("../../common/vendor.js");
const api_article = require("../../api/article.js");
if (!Array) {
  const _component_TabBar = common_vendor.resolveComponent("TabBar");
  _component_TabBar();
}
if (!Math) {
  (NavBar + ArticleSection)();
}
const ArticleSection = () => "../../components/ArticleSection.js";
const NavBar = () => "../../components/NavBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const articleList = common_vendor.ref([]);
    common_vendor.ref({});
    const viewDetails = (articleId) => {
      console.log("点击的 articleId:", articleId);
      common_vendor.index.navigateTo({
        url: `/pages/detail/index?id=${articleId}`
      });
    };
    const sendGetScienceList = async () => {
      const res = await api_article.getScienceList();
      if (res.code === 200) {
        articleList.value = res.rows;
        common_vendor.index.showToast({
          title: "获取科普信息成功",
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: "获取科普信息失败",
          icon: "none"
        });
      }
    };
    const isDarkened = common_vendor.ref(false);
    const handleChooseWay = () => {
      isDarkened.value = !isDarkened.value;
    };
    common_vendor.onShow(() => {
      sendGetScienceList();
      const curPages = getCurrentPages()[0];
      if (typeof curPages.getTabBar === "function" && curPages.getTabBar()) {
        curPages.getTabBar().setData({
          selected: 1
          // 表示当前菜单的索引，该值在不同的页面表示不同
        });
      }
    });
    common_vendor.onHide(() => {
      isDarkened.value = false;
    });
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.p({
          title: "科普",
          showBack: true,
          showShare: true
        }),
        c: common_vendor.f(articleList.value, (item, index, i0) => {
          return {
            a: common_vendor.o(($event) => viewDetails(item.articleId)),
            b: "57167105-1-" + i0,
            c: common_vendor.p({
              article: item
            })
          };
        }),
        d: isDarkened.value ? "brightness(0.5)" : "brightness(1)",
        e: common_vendor.o(handleChooseWay),
        f: common_vendor.p({
          selected: 1
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-57167105"]]);
wx.createPage(MiniProgramPage);
