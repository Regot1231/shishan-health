"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../utils/request.js");
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
    const handleWeixinLogin = () => {
      if (common_vendor.index.getStorageSync("token")) {
        common_vendor.index.login({
          provider: "weixin",
          success: (loginRes) => {
            console.log("获取code成功", loginRes);
            const code = loginRes.code;
            sendCodeToServer(code);
          },
          fail: (error) => {
            console.error("登录失败:", error);
          }
        });
      } else {
        common_vendor.index.showToast({
          title: "再试一次",
          icon: "none"
        });
      }
    };
    const getWeRunData = async () => {
      await handleWeixinLogin();
      common_vendor.wx$1.getWeRunData({
        success(res) {
          console.log(res);
          const encryptedData = res.encryptedData;
          const iv = res.iv;
          const session_key = common_vendor.index.getStorageSync("session_key");
          const token = common_vendor.index.getStorageSync("token");
          common_vendor.wx$1.request({
            url: "http://47.115.213.253:3233/system/user/getWeRunData",
            // 替换为你自己的服务器地址
            method: "POST",
            header: {
              "content-type": "application/json",
              //自定义请求头信息
              "Authorization": token
              // 添加自定义的 Authorization 头
            },
            data: {
              encryptedData,
              iv,
              sessionKey: session_key
            },
            success(response) {
              console.log("解密后的数据:", response.data);
              stepInfoList.value = response.data.stepInfoList;
              wxRunData.value = stepInfoList.value[0].step;
              console.log("最新的步数记录:", wxRunData.value);
              common_vendor.index.stopPullDownRefresh();
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
    };
    const sendCodeToServer = (code) => {
      const token = common_vendor.index.getStorageSync("token");
      common_vendor.index.request({
        url: "http://47.115.213.253:3233/system/user/sessionId",
        // 替换为你的后端登录接口
        method: "GET",
        header: {
          "Authorization": token
          // 添加自定义的 Authorization 头
        },
        data: {
          code
        },
        success: (res) => {
          console.log(res.data);
          if (res.data.session_key) {
            common_vendor.index.setStorageSync("session_key", res.data.session_key);
            common_vendor.index.showToast({
              title: "登录成功",
              icon: "success"
            });
          } else {
            common_vendor.index.showToast({
              title: "登录失败",
              icon: "none"
            });
          }
        },
        fail: (err) => {
          console.error("请求失败:", err);
          common_vendor.index.showToast({
            title: "请求失败",
            icon: "none"
          });
        }
      });
    };
    const sendGetWeRunData = () => {
      common_vendor.wx$1.getSetting({
        success(res) {
          if (!res.authSetting["scope.werun"]) {
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
    };
    const sendGetUserInfo = async () => {
      const res = await api_user.getUserInfo();
      if (res.code === 200) {
        const data = res.user;
        common_vendor.index.setStorageSync("userInfo", data);
        common_vendor.index.showToast({
          title: "获取用户个人信息成功",
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: "获取用户信息失败",
          icon: "error"
        });
      }
    };
    onLoad(() => {
      sendGetWeRunData();
    });
    common_vendor.onShow(async () => {
      sendGetWeRunData();
      isDarkened.value = false, await sendGetUserInfo();
      common_vendor.index.getStorageSync("userInfo");
      const curPages = getCurrentPages()[0];
      if (typeof curPages.getTabBar === "function" && curPages.getTabBar()) {
        curPages.getTabBar().setData({
          selected: 0
          // 表示当前菜单的索引，该值在不同的页面表示不同
        });
      }
    });
    common_vendor.index.startPullDownRefresh({
      success() {
      }
    });
    common_vendor.onHide(() => {
      isDarkened.value = false;
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
