"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_user = require("../../../api/user.js");
if (!Math) {
  NavBar();
}
const NavBar = () => "../../../components/NavBar.js";
const _sfc_main = {
  __name: "changePassword",
  setup(__props) {
    const oldPassword = common_vendor.ref("");
    const newPassword = common_vendor.ref("");
    const confirmPassword = common_vendor.ref("");
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    const handleChangePassword = async () => {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      const data = {
        userId: userInfo.userId,
        password: newPassword.value
      };
      if (newPassword.value !== confirmPassword.value) {
        common_vendor.index.showToast({
          title: "新密码与确认密码不一致",
          icon: "none"
        });
        return;
      }
      const res = await api_user.putUserInfo(data);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "密码已修改",
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: "修改密码失败",
          icon: "error"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.p({
          title: "修改密码",
          showBack: true,
          showShare: false
        }),
        c: oldPassword.value,
        d: common_vendor.o(($event) => oldPassword.value = $event.detail.value),
        e: newPassword.value,
        f: common_vendor.o(($event) => newPassword.value = $event.detail.value),
        g: confirmPassword.value,
        h: common_vendor.o(($event) => confirmPassword.value = $event.detail.value),
        i: common_vendor.o(handleChangePassword)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-072cb6f1"]]);
wx.createPage(MiniProgramPage);
