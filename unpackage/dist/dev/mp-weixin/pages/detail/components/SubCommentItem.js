"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_article = require("../../../api/article.js");
if (!Array) {
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  _easycom_wd_icon2();
}
const _easycom_wd_icon = () => "../../../node-modules/wot-design-uni/components/wd-icon/wd-icon.js";
if (!Math) {
  _easycom_wd_icon();
}
const _sfc_main = {
  __name: "SubCommentItem",
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const handleLike = async (id) => {
      const data = {
        id,
        status: 1
      };
      const res = await api_article.postLike(data);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "点赞成功",
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: "点赞失败",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: __props.comment.avatar,
        b: common_vendor.t(__props.comment.user),
        c: common_vendor.t(__props.comment.date),
        d: common_vendor.o(($event) => handleLike(__props.comment.commentId)),
        e: common_vendor.p({
          name: "thumb-up",
          size: "22px"
        }),
        f: common_vendor.t(__props.comment.likes),
        g: common_vendor.t(__props.comment.content)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5adedf2b"]]);
wx.createComponent(Component);
