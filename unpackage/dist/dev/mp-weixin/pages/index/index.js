"use strict";
const common_vendor = require("../../common/vendor.js");
const api_card = require("../../api/card.js");
const api_user = require("../../api/user.js");
if (!Array) {
  const _component_TabBar = common_vendor.resolveComponent("TabBar");
  _component_TabBar();
}
if (!Math) {
  (CustomNavbar + HomeContent)();
}
const CustomNavbar = () => "../../components/CustomNavbar.js";
const HomeContent = () => "./components/HomeContent.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    function getWeRunData() {
      common_vendor.wx$1.getWeRunData({
        success(res) {
          console.log(res);
          const encryptedData = res.encryptedData;
          const iv = res.iv;
          const session_key = common_vendor.index.getStorageSync("session_key");
          common_vendor.wx$1.request({
            url: "http://47.115.213.253:3233/system/user/getWeRunData",
            // 替换为你自己的服务器地址
            method: "POST",
            header: {
              "content-type": "application/json"
              //自定义请求头信息
            },
            data: {
              encryptedData,
              iv,
              session_key
            },
            success(response) {
              console.log("解密后的数据:", response.data);
              stepInfoList.value = response.data.stepInfoList;
              stepInfoList.value.sort((a, b) => b.timestamp - a.timestamp);
              wxRunData.value = stepInfoList.value[0];
              console.log("最新的步数记录:", wxRunData.value);
            },
            fail(error) {
              console.error("解密失败:", error);
            }
          });
        },
        fail(error) {
          console.error("获取微信运动数据失败:", error);
        }
      });
    }
    common_vendor.onMounted(async () => {
      isDarkened.value = false, // 获取用户微信运动步数
      common_vendor.wx$1.getSetting({
        success(res2) {
          if (!res2.authSetting["scope.werun"]) {
            common_vendor.wx$1.authorize({
              scope: "scope.werun",
              success() {
                getWeRunData();
              },
              fail() {
                console.log("用户拒绝了微信运动数据的授权");
              }
            });
          } else {
            getWeRunData();
          }
        }
      });
      const res = await api_user.getUserInfo();
      if (res.code === 200) {
        const data = res.user;
        common_vendor.index.setStorageSync("userInfo", data);
      } else {
        common_vendor.index.showToast({
          title: "获取用户信息失败",
          icon: "error"
        });
      }
      const respond = await api_card.getCardList(res.user.userId);
      if (respond.code === 200) {
        common_vendor.index.setStorageSync("cardList", respond.rows);
      } else {
        common_vendor.index.showToast({
          title: "获取用户打卡记录失败",
          icon: "error"
        });
      }
    });
    const isDarkened = common_vendor.ref(false);
    const wxRunData = common_vendor.ref(0);
    const stepInfoList = common_vendor.ref([]);
    const onScrolltolower = () => {
      console.log("触底了");
      common_vendor.index.$emit("scrolltolower");
    };
    const handleChooseWay = () => {
      isDarkened.value = !isDarkened.value;
    };
    common_vendor.onShow(() => {
      const curPages = getCurrentPages()[0];
      if (typeof curPages.getTabBar === "function" && curPages.getTabBar()) {
        curPages.getTabBar().setData({
          selected: 0
          // 表示当前菜单的索引，该值在不同的页面表示不同
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          position: "left",
          showLogo: true,
          isFixed: false
        }),
        b: common_vendor.p({
          wxRunData: wxRunData.value
        }),
        c: common_vendor.o(onScrolltolower),
        d: isDarkened.value ? "brightness(0.5)" : "brightness(1)",
        e: common_vendor.o(handleChooseWay),
        f: common_vendor.p({
          selected: 0
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
