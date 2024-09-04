"use strict";
const common_vendor = require("../common/vendor.js");
const api_card = require("../api/card.js");
if (!Array) {
  const _easycom_uni_transition2 = common_vendor.resolveComponent("uni-transition");
  _easycom_uni_transition2();
}
const _easycom_uni_transition = () => "../uni_modules/uni-transition/components/uni-transition/uni-transition.js";
if (!Math) {
  _easycom_uni_transition();
}
const activeSport = "/static/image/bottomBar/sport.png";
const inactiveSport = "/static/image/bottomBar/sport2.png";
const activeFood = "/static/image/bottomBar/food2.png";
const inactiveFood = "/static/image/bottomBar/food.png";
const _sfc_main = {
  __name: "CustomTabBar",
  props: {
    selected: Number
  },
  emits: ["chooseWay"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const hoverSport = common_vendor.ref(false);
    const hoverFood = common_vendor.ref(false);
    const props = __props;
    const goToSport = () => {
      common_vendor.index.navigateTo({
        url: "/pages/sport/index"
      });
    };
    const imagePath = common_vendor.ref("");
    const goToFood = () => {
      common_vendor.index.chooseMedia({
        count: 1,
        // 限制为选择一个媒体文件
        mediaType: ["image"],
        // 支持图片和视频，你可以根据需求修改
        sourceType: ["album", "camera"],
        // 支持从相册和相机中选择
        success: function(chooseMediaRes) {
          const tempFilePath = chooseMediaRes.tempFiles[0].tempFilePath;
          common_vendor.index.uploadFile({
            url: "http://47.115.213.253:3233/common/upload",
            // 替换为你的服务器URL
            filePath: tempFilePath,
            name: "file",
            // 对应于表单数据中的 'file'
            formData: {
              file: `${tempFilePath}`
              // 可选参数，上传时携带的参数
            },
            success: async function(uploadFileRes) {
              const data = JSON.parse(uploadFileRes.data);
              console.log("响应数据", data);
              if (data.code === 200) {
                common_vendor.index.showToast({
                  title: "上传成功",
                  icon: "success"
                });
                imagePath.value = data.url;
                common_vendor.index.setStorageSync("imagePath", data.url);
                common_vendor.index.navigateTo({
                  url: `/pages/grade/index`
                });
                console.log("返回的图片地址", data.url);
                const res = await api_card.postCard({
                  path: imagePath.value
                });
                if (res.code === 200) {
                  common_vendor.index.showToast({
                    title: "提交成功",
                    icon: "success"
                  });
                } else {
                  common_vendor.index.showToast({
                    title: "上传失败",
                    icon: "none"
                  });
                }
              } else {
                common_vendor.index.showToast({
                  title: "上传失败",
                  icon: "none"
                });
              }
            },
            fail: function(err) {
              console.error("上传出错:", err);
              common_vendor.index.showToast({
                title: "上传失败",
                icon: "none"
              });
            }
          });
        },
        fail: function(err) {
          console.error("选择媒体文件出错:", err);
        }
      });
    };
    const isShow = common_vendor.ref(false);
    common_vendor.ref("#fff");
    const list = common_vendor.ref([
      {
        text: "首页",
        pagePath: "/pages/index/index",
        iconPath: "/static/image/bottomBar/index.png",
        selectedIconPath: "/static/image/bottomBar/index-active.png"
      },
      {
        text: "科普",
        pagePath: "/pages/science/index",
        iconPath: "/static/image/bottomBar/index.png",
        selectedIconPath: "/static/image/bottomBar/index-active.png"
      },
      {
        pagePath: "/pages/ranking/ranking",
        iconPath: "/static/image/bottomBar/check-in.png",
        selectedIconPath: "/static/image/bottomBar/check-in.png",
        search: true
      },
      {
        text: "分享",
        pagePath: "/pages/share/index",
        iconPath: "/static/image/bottomBar/index.png",
        selectedIconPath: "/static/image/bottomBar/index-active.png"
      },
      {
        text: "我的",
        pagePath: "/pages/my/my",
        iconPath: "/static/image/bottomBar/my.png",
        selectedIconPath: "/static/image/bottomBar/my-active.png"
      }
    ]);
    const switchTab = (url) => {
      common_vendor.index.switchTab({
        url
      });
      console.log(props.selected);
    };
    const chooseWay = () => {
      isShow.value = !isShow.value;
      emit("chooseWay");
    };
    common_vendor.onHide(() => {
      isShow.value = false;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.search
          }, item.search ? common_vendor.e({
            b: item.search
          }, item.search ? {
            c: __props.selected === index ? item.selectedIconPath : item.iconPath
          } : {}, {
            d: common_vendor.t(item.text),
            e: (__props.selected === index ? true : false) ? 1 : "",
            f: common_vendor.o(chooseWay, index),
            g: item.search ? 1 : "",
            h: !item.search ? 1 : "",
            i: (__props.selected === index ? true : false) ? 1 : "",
            j: (__props.selected != index ? true : false) ? 1 : ""
          }) : common_vendor.e({
            k: item.search
          }, item.search ? {
            l: __props.selected === index ? item.selectedIconPath : item.iconPath
          } : {}, {
            m: common_vendor.t(item.text),
            n: (__props.selected === index ? true : false) ? 1 : "",
            o: common_vendor.o(($event) => switchTab(item.pagePath), index),
            p: (item.search ? true : false) ? 1 : "",
            q: !item.search ? 1 : "",
            r: (__props.selected === index ? true : false) ? 1 : "",
            s: (__props.selected != index ? true : false) ? 1 : ""
          }), {
            t: index
          });
        }),
        b: hoverSport.value ? activeSport : inactiveSport,
        c: common_vendor.o(($event) => hoverSport.value = true),
        d: common_vendor.o(($event) => hoverSport.value = false),
        e: common_vendor.o(goToSport),
        f: hoverFood.value ? activeFood : inactiveFood,
        g: common_vendor.o(($event) => hoverFood.value = true),
        h: common_vendor.o(($event) => hoverFood.value = false),
        i: common_vendor.o(goToFood),
        j: common_vendor.p({
          ["mode-class"]: "fade",
          show: isShow.value
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6def6a3b"]]);
wx.createComponent(Component);
