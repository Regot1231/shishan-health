"use strict";
const common_vendor = require("../../common/vendor.js");
const api_user = require("../../api/user.js");
const api_article = require("../../api/article.js");
if (!Array) {
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  _easycom_wd_icon2();
}
const _easycom_wd_icon = () => "../../node-modules/wot-design-uni/components/wd-icon/wd-icon.js";
if (!Math) {
  (NavBar + ArticleSection + CommentItem + _easycom_wd_icon)();
}
const CommentItem = () => "./components/CommentItem.js";
const NavBar = () => "../../components/NavBar.js";
const ArticleSection = () => "../../components/ArticleSection.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    const handleLike = async (id) => {
      console.log("开始点赞了！");
      const data = { id, status: 0 };
      console.log("开始点赞了！", data);
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
    const commentText = common_vendor.ref("");
    const article = common_vendor.ref({});
    const options = common_vendor.ref({});
    const commentTotal = common_vendor.ref();
    const comments = common_vendor.ref([]);
    const updateUserInfo = async (rows) => {
      for (const [index, row] of rows.entries()) {
        const respond = await api_user.getOtherUser(row.userId);
        if (respond.code === 200) {
          comments.value[index].user = respond.user.userName;
        } else {
          common_vendor.index.showToast({
            title: respond.msg || "请求失败",
            icon: "none"
          });
        }
      }
    };
    const sendComment = async () => {
      if (commentText.value.trim() === "") {
        common_vendor.index.showToast({
          title: "评论不能为空",
          icon: "none"
        });
        return;
      }
      console.log("用户发送的评论:", commentText.value);
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      const data = {
        content: commentText.value,
        parentId: 0,
        userId: `${userInfo.userId}`,
        articleId: options.value.id
      };
      await api_article.postComment(data);
      commentText.value = "";
    };
    const commentLikeLists = async (id) => {
      options.value.id = id;
      console.log("跳转之前的id", id);
      const res = await api_article.getCommentLikeLists(id);
      if (res.code === 200) {
        commentTotal.value = res.total;
        comments.value = res.rows.map((row) => {
          return {
            date: row.createTime || "",
            content: row.content || "",
            likes: row.like || 0,
            avatar: "/static/image/detail/healthy-hand.png",
            user: "???",
            commentId: row.commentId,
            replies: row.replies,
            articleId: row.articleId
          };
        });
        await updateUserInfo(res.rows);
      } else {
        common_vendor.index.showToast({
          title: res.msg || "请求失败",
          icon: "none"
        });
      }
    };
    const commentNewLists = async (id) => {
      options.value.id = id;
      console.log("跳转之前的id", id);
      const res = await api_article.getCommentNewLists(id);
      if (res.code === 200) {
        commentTotal.value = res.total;
        comments.value = res.rows.map((row) => {
          return {
            date: row.createTime || "",
            content: row.content || "",
            likes: row.like || 0,
            avatar: "/static/image/detail/healthy-hand.png",
            user: "???",
            commentId: row.commentId,
            replies: row.replies,
            articleId: row.articleId
          };
        });
        await updateUserInfo(res.rows);
      } else {
        common_vendor.index.showToast({
          title: res.msg || "请求失败",
          icon: "none"
        });
      }
    };
    common_vendor.onMounted(async () => {
    });
    common_vendor.onLoad(async (options2) => {
      const {
        id
      } = options2;
      options2.value = {
        id
      };
      const articleId = options2.value.id;
      console.log("传过来的id", articleId);
      commentLikeLists(articleId);
      const res = await api_article.getArticleDetail(articleId);
      if (res.code === 200) {
        article.value = res.data;
        console.log(article.value.viewCount);
        const data = { id: article.value.viewCount };
        api_article.postView(data);
        const respond = await api_user.getOtherUser(res.data.author);
        if (respond.code === 200) {
          article.value.author = respond.user.userName;
        } else {
          common_vendor.index.showToast({
            title: respond.msg || "请求失败",
            icon: "none"
          });
        }
      } else {
        common_vendor.index.showToast({
          title: res.msg || "请求失败",
          icon: "none"
        });
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.p({
          title: "详情",
          showBack: true,
          showShare: true
        }),
        c: common_vendor.p({
          article: article.value
        }),
        d: common_vendor.o(($event) => commentLikeLists(options.value.id)),
        e: common_vendor.o(($event) => commentNewLists(options.value.id)),
        f: common_vendor.f(comments.value, (comment, index, i0) => {
          return {
            a: index,
            b: "2fd5b0a7-2-" + i0,
            c: common_vendor.p({
              comment
            })
          };
        }),
        g: common_vendor.o(sendComment),
        h: commentText.value,
        i: common_vendor.o(($event) => commentText.value = $event.detail.value),
        j: common_vendor.p({
          name: "chat1",
          size: "22px"
        }),
        k: common_vendor.t(commentTotal.value),
        l: common_vendor.o(($event) => handleLike(article.value.articleId)),
        m: common_vendor.p({
          name: "thumb-up",
          size: "22px"
        }),
        n: common_vendor.t(article.value.like)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2fd5b0a7"]]);
wx.createPage(MiniProgramPage);
