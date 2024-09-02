"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "MyContent",
  setup(__props) {
    const functionList = common_vendor.ref([
      {
        img: common_assets.commentSvg,
        label: "我的评论",
        url: "/pages/my/comment/index"
        // 替换为你的“我的评论”页面路径
      },
      {
        img: common_assets.forwardSvg,
        label: "我的转发",
        url: "/pages/my/settings/index"
        // 替换为你的“我的转发”页面路径
      },
      {
        img: common_assets.collectionSvg,
        label: "我的收藏",
        url: "/pages/my/settings/index"
        // 替换为你的“我的收藏”页面路径
      },
      {
        img: common_assets.settingSvg,
        label: "设置",
        url: "/pages/my/settings/index"
        // 替换为你的设置页面路径
      }
    ]);
    const goToPage = (url) => {
      if (url) {
        common_vendor.index.navigateTo({
          url
        });
      }
    };
    const goToRanking = () => {
      common_vendor.index.navigateTo({
        url: "/pages/ranking/index"
      });
    };
    const goToHistory = () => {
      common_vendor.index.navigateTo({
        url: "/pages/history/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$3,
        b: common_assets._imports_1$2,
        c: common_vendor.o(goToHistory),
        d: common_assets._imports_2,
        e: common_vendor.o(goToRanking),
        f: common_vendor.f(functionList.value, (item, k0, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.label),
            c: item.label,
            d: common_vendor.o(($event) => goToPage(item.url), item.label)
          };
        }),
        g: common_assets._imports_3
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2ba5beff"]]);
wx.createComponent(Component);
