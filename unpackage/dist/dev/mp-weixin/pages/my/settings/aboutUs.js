"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  NavBar();
}
const NavBar = () => "../../../components/NavBar.js";
const _sfc_main = {
  __name: "aboutUs",
  setup(__props) {
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.p({
          title: "关于我们",
          showBack: true,
          showShare: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6f0fc38d"]]);
wx.createPage(MiniProgramPage);
