"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_user = require("../../../api/user.js");
if (!Math) {
  NavBar();
}
const NavBar = () => "../../../components/NavBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const theme = common_vendor.ref(common_vendor.wx$1.getSystemInfoSync().theme);
    const nickname = common_vendor.ref("");
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    const onSubmit = async (e) => {
      e.preventDefault();
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      const data = {
        nickName: nickname.value,
        userId: userInfo.userId
      };
      const res = await api_user.putUserInfo(data);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "修改昵称成功",
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: "修改昵称失败",
          icon: "error"
        });
      }
    };
    common_vendor.onMounted(() => {
      common_vendor.wx$1.onThemeChange((result) => {
        theme.value = result.theme;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.p({
          title: "我的昵称",
          showBack: true,
          showShare: false
        }),
        c: nickname.value,
        d: common_vendor.o(($event) => nickname.value = $event.detail.value),
        e: common_vendor.o(onSubmit),
        f: theme.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-25b4db4f"]]);
wx.createPage(MiniProgramPage);
