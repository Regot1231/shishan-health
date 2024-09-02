"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  _easycom_wd_icon2();
}
const _easycom_wd_icon = () => "../wd-icon/wd-icon.js";
if (!Math) {
  _easycom_wd_icon();
}
const __default__ = {
  name: "wd-sort-button",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: common_vendor.sortButtonProps,
  emits: ["change", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    function handleClick() {
      let { modelValue: value, allowReset, descFirst } = props;
      if (descFirst) {
        if (value === 0) {
          value = -1;
        } else if (value === -1) {
          value = 1;
        } else if (value === 1) {
          if (allowReset) {
            value = 0;
          } else {
            value = -1;
          }
        }
      } else {
        if (value === 0) {
          value = 1;
        } else if (value === 1) {
          value = -1;
        } else if (value === -1) {
          if (allowReset) {
            value = 0;
          } else {
            value = 1;
          }
        }
      }
      emit("update:modelValue", value);
      emit("change", {
        value
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(_ctx.title),
        b: common_vendor.n(`wd-sort-button__left ${_ctx.modelValue !== 0 ? "is-active" : ""}`),
        c: _ctx.modelValue !== 1
      }, _ctx.modelValue !== 1 ? {
        d: common_vendor.p({
          name: "arrow-up",
          ["custom-class"]: "wd-sort-button__icon-up"
        })
      } : {}, {
        e: _ctx.modelValue !== -1
      }, _ctx.modelValue !== -1 ? {
        f: common_vendor.p({
          name: "arrow-down",
          ["custom-class"]: "wd-sort-button__icon-down"
        })
      } : {}, {
        g: common_vendor.n(`wd-sort-button__right ${_ctx.modelValue !== 0 ? "is-active" : ""}`),
        h: common_vendor.n(`wd-sort-button ${_ctx.line ? "wd-sort-button--line" : ""} ${_ctx.customClass}`),
        i: common_vendor.s(_ctx.customStyle),
        j: common_vendor.o(handleClick)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-42f0b178"]]);
wx.createComponent(Component);
