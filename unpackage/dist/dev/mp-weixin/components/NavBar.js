"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  __name: "NavBar",
  props: {
    title: {
      type: String,
      default: ""
    },
    showBack: {
      type: Boolean,
      default: true
    },
    showShare: {
      type: Boolean,
      default: true
    }
  },
  emits: ["back", "share"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const handleBack = () => {
      emits("back");
    };
    const handleShare = () => {
      emits("share");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.showBack
      }, __props.showBack ? {
        b: common_assets._imports_0$1,
        c: common_vendor.o(handleBack)
      } : {}, {
        d: common_vendor.t(__props.title),
        e: __props.showShare
      }, __props.showShare ? {
        f: common_assets._imports_1$1,
        g: common_vendor.o(handleShare)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2202255b"]]);
wx.createComponent(Component);
