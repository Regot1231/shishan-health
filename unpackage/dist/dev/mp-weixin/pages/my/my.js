"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_TabBar = common_vendor.resolveComponent("TabBar");
  _component_TabBar();
}
if (!Math) {
  (CustomNavbar + Mycontent)();
}
const CustomNavbar = () => "../../components/CustomNavbar.js";
const Mycontent = () => "./components/MyContent.js";
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const isDarkened = common_vendor.ref(false);
    const handleChooseWay = () => {
      isDarkened.value = !isDarkened.value;
    };
    common_vendor.onShow(() => {
      const curPages = getCurrentPages()[0];
      if (typeof curPages.getTabBar === "function" && curPages.getTabBar()) {
        curPages.getTabBar().setData({
          selected: 4
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
          showLogo: true,
          position: "left"
        }),
        b: isDarkened.value ? "brightness(0.5)" : "brightness(1)",
        c: common_vendor.o(handleChooseWay),
        d: common_vendor.p({
          selected: 4
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"]]);
wx.createPage(MiniProgramPage);
