"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "RecommendationItem",
  props: {
    title: String,
    description: String,
    image: String,
    articleId: Number
  },
  setup(__props) {
    const viewDetails = (articleId) => {
      console.log(articleId);
      common_vendor.index.navigateTo({
        url: `/pages/detail/index?id=${articleId}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: __props.image,
        b: common_vendor.t(__props.title),
        c: common_vendor.t(__props.description),
        d: common_vendor.o(($event) => viewDetails(__props.articleId))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6a4445b6"]]);
wx.createComponent(Component);
