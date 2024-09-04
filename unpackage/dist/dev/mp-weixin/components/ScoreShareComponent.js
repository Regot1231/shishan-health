"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_l_circle2 = common_vendor.resolveComponent("l-circle");
  const _easycom_cc_popup2 = common_vendor.resolveComponent("cc-popup");
  (_easycom_l_circle2 + _easycom_cc_popup2)();
}
const _easycom_l_circle = () => "../uni_modules/lime-circle/components/l-circle/l-circle.js";
const _easycom_cc_popup = () => "../uni_modules/cc-popup/components/cc-popup/cc-popup.js";
if (!Math) {
  (_easycom_l_circle + _easycom_cc_popup)();
}
const _sfc_main = {
  __name: "ScoreShareComponent",
  props: {
    description: {
      type: String,
      default: "您的打卡记录已提交，请等待管理员评分~"
    },
    scoreDisplay: {
      type: String,
      default: "？？"
    },
    mySrc: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const modelVale = common_vendor.ref(0);
    const props = __props;
    const target = common_vendor.ref(Number(props.scoreDisplay));
    const isshow = common_vendor.ref(false);
    const popupClick = () => {
      isshow.value = !isshow.value;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.description),
        b: common_vendor.t(__props.scoreDisplay),
        c: common_vendor.o(($event) => modelVale.value = $event),
        d: common_vendor.p({
          percent: target.value,
          ["stroke-width"]: 27,
          strokeColor: "#55B89A",
          trailWidth: 27,
          trailColor: "#D8F9EF",
          size: "180px",
          current: modelVale.value
        }),
        e: __props.mySrc,
        f: common_vendor.o(($event) => isshow.value = false),
        g: common_vendor.o(($event) => isshow.value = false),
        h: common_vendor.p({
          isShow: isshow.value,
          width: "calc(100vw - 70px)",
          height: "346px",
          radius: "16rpx"
        }),
        i: common_vendor.o(popupClick)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f64ed29c"]]);
wx.createComponent(Component);
