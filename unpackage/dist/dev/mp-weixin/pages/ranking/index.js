"use strict";
const common_vendor = require("../../common/vendor.js");
const services_ranking = require("../../services/ranking.js");
if (!Math) {
  CustomNavbar();
}
const CustomNavbar = () => "../../components/CustomNavbar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const selectedTime = common_vendor.ref("week");
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
        time: selectedTime.value,
        category: selectedCategory.value
      };
      const response = await services_ranking.fetchRankingData(params);
      rankingList.value = response.data;
    };
    common_vendor.onMounted(() => {
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
        return "second-place";
      if (index === 2)
        return "third-place";
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
        b: selectedTime.value === "day" ? 1 : "",
        c: common_vendor.o(($event) => changeTime("day")),
        d: selectedTime.value === "week" ? 1 : "",
        e: common_vendor.o(($event) => changeTime("week")),
        f: selectedTime.value === "month" ? 1 : "",
        g: common_vendor.o(($event) => changeTime("month")),
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
            f: common_vendor.t(item.name),
            g: common_vendor.t(item.score),
            h: index,
            i: common_vendor.n(getBackgroundClass(index))
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-55d17871"]]);
wx.createPage(MiniProgramPage);
