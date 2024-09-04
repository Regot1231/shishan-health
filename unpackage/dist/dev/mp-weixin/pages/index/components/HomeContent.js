"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const api_article = require("../../../api/article.js");
if (!Array) {
  const _easycom_l_circle2 = common_vendor.resolveComponent("l-circle");
  _easycom_l_circle2();
}
const _easycom_l_circle = () => "../../../uni_modules/lime-circle/components/l-circle/l-circle.js";
if (!Math) {
  (_easycom_l_circle + RecommendationItem)();
}
const RecommendationItem = () => "./RecommendationItem.js";
const _sfc_main = {
  __name: "HomeContent",
  props: {
    wxRunData: Number
  },
  setup(__props) {
    const modelVale = common_vendor.ref(0);
    const runningRecords = common_vendor.ref([]);
    const runningRecordsToday = common_vendor.ref({
      totalPoints: 0,
      // 当天总积分
      totalCount: 0
      // 当天总次数
    });
    const isActive = common_vendor.ref(false);
    const goToQuestion = () => {
      common_vendor.index.navigateTo({
        url: "/pages/question/index"
      });
    };
    const goToScience = () => {
      common_vendor.index.switchTab({
        url: "/pages/science/index"
      });
    };
    const recommendations = common_vendor.ref([]);
    const fetchRecommendations = async () => {
      const res = await api_article.getHotInfo();
      if (res.code === 200) {
        recommendations.value = res.rows;
      } else {
        common_vendor.index.showToast({
          title: res.msg || "获取热推荐失败",
          icon: "error"
        });
      }
    };
    common_vendor.index.startPullDownRefresh({
      success() {
        fetchRecommendations();
      }
    });
    common_vendor.onShow(() => {
      fetchRecommendations();
      runningRecords.value = common_vendor.index.getStorageSync("runningRecords");
      if (runningRecords.value[0]) {
        runningRecordsToday.value = runningRecords.value[0];
        common_vendor.index.stopPullDownRefresh();
      } else {
        common_vendor.index.showToast({
          title: "获取跑步记录失败",
          icon: "error"
        });
      }
      if (runningRecordsToday.value.totalCount >= 3) {
        isActive.value = true;
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.wxRunData),
        b: common_vendor.o(($event) => modelVale.value = $event),
        c: common_vendor.p({
          percent: __props.wxRunData / 200,
          ["stroke-width"]: 13,
          strokeColor: "#55B89A",
          trailWidth: 13,
          trailColor: "#D8F9EF",
          dashboard: true,
          current: modelVale.value
        }),
        d: common_vendor.t(runningRecordsToday.value.totalPoints),
        e: runningRecordsToday.value.totalCount >= 1 ? 1 : "",
        f: runningRecordsToday.value.totalCount >= 2 ? 1 : "",
        g: isActive.value ? 1 : "",
        h: !isActive.value ? 1 : "",
        i: isActive.value ? 1 : "",
        j: !isActive.value ? 1 : "",
        k: common_assets._imports_0$2,
        l: common_vendor.o(goToQuestion),
        m: common_vendor.o(goToScience),
        n: common_vendor.f(recommendations.value, (item, index, i0) => {
          return {
            a: index,
            b: "0b80912c-1-" + i0,
            c: common_vendor.p({
              title: item.titile,
              description: item.content,
              image: item.cover,
              articleId: item.articleId
            })
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0b80912c"]]);
wx.createComponent(Component);
