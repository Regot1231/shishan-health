"use strict";
const common_vendor = require("../../../../common/vendor.js");
const __default__ = {
  name: "wd-card",
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: common_vendor.cardProps,
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.title
      }, _ctx.title ? {
        b: common_vendor.t(_ctx.title)
      } : {}, {
        c: common_vendor.n(_ctx.customTitleClass),
        d: common_vendor.n(`wd-card__content ${_ctx.customContentClass}`),
        e: common_vendor.n(`wd-card__footer ${_ctx.customFooterClass}`),
        f: common_vendor.n(_ctx.type == "rectangle" ? "is-rectangle" : ""),
        g: common_vendor.n(_ctx.customClass),
        h: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-62f00037"]]);
wx.createComponent(Component);
