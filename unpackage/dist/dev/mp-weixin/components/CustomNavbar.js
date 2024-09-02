"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  __name: "CustomNavbar",
  props: {
    position: {
      type: String,
      default: "center"
    },
    title: {
      type: String,
      default: "狮山健康"
    },
    showBack: {
      type: Boolean,
      default: false
    },
    showLogo: {
      type: Boolean,
      default: false
    },
    bgSrc: {
      type: String,
      default: common_assets.bgImage
    },
    isFixed: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const { safeAreaInsets } = common_vendor.index.getSystemInfoSync();
    console.log(safeAreaInsets);
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.showBack
      }, __props.showBack ? {
        b: common_assets._imports_0$1
      } : {}, {
        c: common_vendor.o(handleBack),
        d: __props.showLogo
      }, __props.showLogo ? {
        e: common_assets._imports_1
      } : {}, {
        f: common_vendor.t(__props.title),
        g: common_vendor.n("navbar " + __props.position),
        h: __props.bgSrc,
        i: common_vendor.n("navbar-wrapper " + (__props.isFixed ? "fixed" : "")),
        j: common_vendor.unref(safeAreaInsets).top + 8 + "px"
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f4b0db8a"]]);
wx.createComponent(Component);
