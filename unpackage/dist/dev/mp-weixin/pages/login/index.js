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
    const handleLogin = async () => {
      if (username.value && password.value) {
        try {
          const res = await api_user.login({
            username: username.value,
            password: password.value
          });
          if (res.code === 200) {
            common_vendor.index.showToast({
              title: "登录成功",
              icon: "success"
            });
            common_vendor.index.setStorageSync("token", res.token);
            common_vendor.index.switchTab({
              url: "/pages/index/index"
            });
          } else {
            common_vendor.index.showToast({
              title: "登录失败",
              icon: "error"
            });
          }
        } catch (error) {
          common_vendor.index.showToast({
            title: "网络错误，登录失败",
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
    const goToRegister = () => {
      common_vendor.index.navigateTo({
        url: "/pages/register/index"
      });
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
        g: common_vendor.o(handleLogin),
        h: common_vendor.o(goToRegister)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d08ef7d4"]]);
wx.createPage(MiniProgramPage);
