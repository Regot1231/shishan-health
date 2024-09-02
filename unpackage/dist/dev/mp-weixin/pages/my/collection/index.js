"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Math) {
  NavBar();
}
const NavBar = () => "../../../components/NavBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const navigateTo = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    const logout = () => {
      common_vendor.index.showModal({
        title: "确认退出",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.clearStorage({
              success() {
                common_vendor.index.showToast({
                  title: "已退出登录",
                  icon: "success"
                });
                common_vendor.index.redirectTo({
                  url: "/pages/login/index"
                  // 跳转到登录页面
                });
              },
              fail() {
                common_vendor.index.showToast({
                  title: "退出登录失败",
                  icon: "none"
                });
              }
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.p({
          title: "设置",
          showBack: true,
          showShare: false
        }),
        c: common_vendor.o(($event) => navigateTo("/pages/my/settings/changePassword")),
        d: common_vendor.o(logout),
        e: common_vendor.o(($event) => navigateTo("/pages/my/settings/aboutUs"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-305b6943"]]);
wx.createPage(MiniProgramPage);
