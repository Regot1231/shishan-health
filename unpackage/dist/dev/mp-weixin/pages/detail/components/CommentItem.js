"use strict";
const common_vendor = require("../../../common/vendor.js");
const api_article = require("../../../api/article.js");
const api_user = require("../../../api/user.js");
if (!Array) {
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  _easycom_wd_icon2();
}
const _easycom_wd_icon = () => "../../../node-modules/wot-design-uni/components/wd-icon/wd-icon.js";
if (!Math) {
  (_easycom_wd_icon + SubCommentItem)();
}
const SubCommentItem = () => "./SubCommentItem.js";
const _sfc_main = {
  __name: "CommentItem",
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const showReplyInput = common_vendor.ref(false);
    const replyText = common_vendor.ref("");
    const props = __props;
    console.log("拿到的props是", props.comment);
    const replies = common_vendor.ref([]);
    replies.value = props.comment.replies;
    const subComments = common_vendor.ref([]);
    const showSubComments = common_vendor.ref(false);
    const submitReply = async () => {
      if (replyText.value.trim() === "") {
        common_vendor.index.showToast({
          title: "回复内容不能为空",
          icon: "none"
        });
        return;
      }
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      const data = {
        content: replyText.value,
        userId: `${userInfo.userId}`,
        parentId: props.comment.commentId,
        articleId: props.comment.articleId
      };
      const res = await api_article.postComment(data);
      if (res.code === 200) {
        common_vendor.index.showToast({
          title: "提交成功",
          icon: "success"
        });
        replyText.value = "";
        showReplyInput.value = false;
      } else {
        common_vendor.index.showToast({
          title: "提交失败",
          icon: "error"
        });
      }
      console.log("提交回复:", replyText.value);
      replyText.value = "";
      showReplyInput.value = false;
    };
    const updateUserInfo = async () => {
      if (replies.value && replies.value.length > 0) {
        console.log("获取二级评论成功", replies.value);
        for (const [index, reply] of replies.value.entries()) {
          const respond = await api_user.getOtherUser(reply.userId);
          if (respond.code === 200) {
            subComments.value[index].user = respond.user.userName;
          } else {
            common_vendor.index.showToast({
              title: respond.msg || "请求失败",
              icon: "none"
            });
          }
        }
      }
    };
    const changeSubComments = async () => {
      if (replies.value && replies.value.length > 0) {
        subComments.value = replies.value.map((reply) => {
          return {
            date: reply.createTime || "",
            content: reply.content || "",
            likes: reply.like || 0,
            avatar: "/static/image/detail/healthy-hand.png",
            user: "???",
            commentId: reply.commentId
          };
        });
        await updateUserInfo();
      }
    };
    common_vendor.onMounted(() => {
      changeSubComments();
    });
    const toggleSubComments = () => {
      showSubComments.value = !showSubComments.value;
    };
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
      return common_vendor.e({
        a: __props.comment.avatar,
        b: common_vendor.t(__props.comment.user),
        c: common_vendor.t(__props.comment.date),
        d: common_vendor.o(($event) => showReplyInput.value = !showReplyInput.value),
        e: common_vendor.p({
          name: "chat1",
          size: "22px"
        }),
        f: common_vendor.o(($event) => showReplyInput.value = !showReplyInput.value),
        g: common_vendor.o(($event) => handleLike(__props.comment.commentId)),
        h: common_vendor.p({
          name: "thumb-up",
          size: "22px"
        }),
        i: common_vendor.t(__props.comment.likes),
        j: common_vendor.t(__props.comment.content),
        k: __props.comment.replies.length
      }, __props.comment.replies.length ? common_vendor.e({
        l: common_vendor.t(__props.comment.replies.length),
        m: !showSubComments.value
      }, !showSubComments.value ? {
        n: common_vendor.p({
          name: "arrow-down",
          size: "15px"
        })
      } : {}, {
        o: showSubComments.value
      }, showSubComments.value ? {
        p: common_vendor.p({
          name: "arrow-up",
          size: "15px"
        })
      } : {}, {
        q: common_vendor.o(toggleSubComments)
      }) : {}, {
        r: showSubComments.value
      }, showSubComments.value ? {
        s: common_vendor.f(subComments.value, (subComment, index, i0) => {
          return {
            a: index,
            b: "37da37d1-4-" + i0,
            c: common_vendor.p({
              comment: subComment
            })
          };
        })
      } : {}, {
        t: showReplyInput.value
      }, showReplyInput.value ? {
        v: replyText.value,
        w: common_vendor.o(($event) => replyText.value = $event.detail.value),
        x: common_vendor.o(submitReply)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-37da37d1"]]);
wx.createComponent(Component);
