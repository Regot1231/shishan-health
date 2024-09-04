"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_user = require("../../../api/user.js");
if (!Math) {
  NavBar();
}
const NavBar = () => "../../../components/NavBar.js";
const defaultAvatarUrl = "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const avatarUrl = common_vendor.ref(defaultAvatarUrl);
    const theme = common_vendor.ref(common_vendor.wx$1.getSystemInfoSync().theme);
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    const onChooseAvatar = (e) => {
      avatarUrl.value = e.detail.avatarUrl;
    };
    const submitAvatar = async () => {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      const data = {
        avatar: avatarUrl.value,
        userId: userInfo.userId
      };
      const res = await api_user.putUserInfo(data);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "修改头像成功",
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: "修改头像失败",
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
          title: "我的头像",
          showBack: true,
          showShare: false
        }),
        c: avatarUrl.value,
        d: common_vendor.o(onChooseAvatar),
        e: theme.value,
        f: common_vendor.o(submitAvatar)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9ff30763"]]);
wx.createPage(MiniProgramPage);
