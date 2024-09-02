"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "ArticleSection",
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    console.log("ArticleSection clicked");
    const handleClick = () => {
      emit("click");
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.article.titile),
        b: __props.article.cover,
        c: common_vendor.t(__props.article.author),
        d: common_vendor.t(__props.article.viewCount),
        e: common_vendor.t(__props.article.createTime),
        f: common_vendor.t(__props.article.content),
        g: __props.article.cover,
        h: common_vendor.o(handleClick)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-19927128"]]);
wx.createComponent(Component);
