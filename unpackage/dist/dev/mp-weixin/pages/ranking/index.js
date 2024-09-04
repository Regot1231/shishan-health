"use strict";
const common_vendor = require("../../common/vendor.js");
const api_ranking = require("../../api/ranking.js");
if (!Math) {
  CustomNavbar();
}
const CustomNavbar = () => "../../components/CustomNavbar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const selectedTime = common_vendor.ref(2);
    const selectedCategory = common_vendor.ref("health");
    const rankingList = common_vendor.ref([]);
    const changeTime = (time) => {
      selectedTime.value = time;
      fetchData();
    };
    const changeCategory = (category) => {
      selectedCategory.value = category;
      fetchData();
    };
    const fetchData = async () => {
      const params = {
        status: selectedTime.value,
        category: selectedCategory.value
      };
      if (selectedCategory.value === "health") {
        const response = await api_ranking.getCardRankings(params);
        console.log("返回的数据", response);
        rankingList.value = response;
      } else if (selectedCategory.value === "sport") {
        const res = await getSportRankings(params);
        console.log("返回的数据", res);
        rankingList.value = res;
      } else {
        common_vendor.index.showToast({
          title: "请求数据失败",
          icon: "error"
        });
      }
    };
    common_vendor.onShow(() => {
      fetchData();
    });
    const getMedal = (index) => {
      const medals = [
        "../../static/image/ranking/gold.png",
        "../../static/image/ranking/silver.png",
        "../../static/image/ranking/bronze.png"
      ];
      return medals[index];
    };
    const getAvatar = (index) => {
      const avatars = [
        "../../static/image/ranking/Ellipse1.png",
        "../../static/image/ranking/Ellipse2.png",
        "../../static/image/ranking/Ellipse3.png"
      ];
      return avatars[index];
    };
    const getBackgroundClass = (index) => {
      if (index === 0)
        return "first-place";
      if (index === 1)
        return " third-place";
      if (index === 2)
        return "second-place";
      return "";
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          position: "center",
          title: "排行榜",
          showBack: "true",
          isFixed: false
        }),
        b: selectedTime.value === 1 ? 1 : "",
        c: common_vendor.o(($event) => changeTime(1)),
        d: selectedTime.value === 2 ? 1 : "",
        e: common_vendor.o(($event) => changeTime(2)),
        f: selectedTime.value === 3 ? 1 : "",
        g: common_vendor.o(($event) => changeTime(3)),
        h: selectedCategory.value === "health" ? 1 : "",
        i: common_vendor.o(($event) => changeCategory("health")),
        j: selectedCategory.value === "sport" ? 1 : "",
        k: common_vendor.o(($event) => changeCategory("sport")),
        l: common_vendor.f(rankingList.value, (item, index, i0) => {
          return common_vendor.e({
            a: index > 2
          }, index > 2 ? {
            b: common_vendor.t(index + 1)
          } : {}, {
            c: index < 3
          }, index < 3 ? {
            d: getMedal(index)
          } : {}, {
            e: getAvatar(index),
            f: common_vendor.t(item.username)
          }, selectedCategory.value === "health" ? {
            g: common_vendor.t(item.score)
          } : {
            h: common_vendor.t(item.stepCounts)
          }, {
            i: index,
            j: common_vendor.n(getBackgroundClass(index))
          });
        }),
        m: selectedCategory.value === "health"
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-55d17871"]]);
wx.createPage(MiniProgramPage);
