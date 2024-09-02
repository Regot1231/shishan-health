"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
if (!Array) {
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  _easycom_wd_icon2();
}
const _easycom_wd_icon = () => "../../node-modules/wot-design-uni/components/wd-icon/wd-icon.js";
if (!Math) {
  _easycom_wd_icon();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const username = common_vendor.ref("");
    const password = common_vendor.ref("");
    common_vendor.useRouter();
    const handleRegister = async () => {
      if (username.value && password.value) {
        try {
          const res = await api_user.register({ username: username.value, password: password.value });
          if (res.code === 200) {
            common_vendor.index.showToast({
              title: "注册成功",
              icon: "success"
            });
            common_vendor.index.navigateTo({ url: "/pages/login/index" });
          } else {
            common_vendor.index.showToast({
              title: "注册失败",
              icon: "error"
            });
          }
        } catch (error) {
          common_vendor.index.showToast({
            title: "网络错误，注册失败",
            icon: "error"
          });
        }
      } else {
        common_vendor.index.showToast({
          title: "请输入用户名和密码",
          icon: "none"
        });
      }
    };
    const goToLogin = () => {
      common_vendor.index.navigateTo({ url: "/pages/login/index" });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: "user",
          size: "17px",
          color: "#55B89A"
        }),
        b: username.value,
        c: common_vendor.o(($event) => username.value = $event.detail.value),
        d: common_vendor.p({
          name: "lock-on",
          size: "17px",
          color: "#55B89A"
        }),
        e: password.value,
        f: common_vendor.o(($event) => password.value = $event.detail.value),
        g: common_vendor.o(handleRegister),
        h: common_vendor.o(goToLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-46a64346"]]);
wx.createPage(MiniProgramPage);
