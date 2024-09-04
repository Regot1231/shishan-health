"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_wd_table_col2 = common_vendor.resolveComponent("wd-table-col");
  const _easycom_wd_table2 = common_vendor.resolveComponent("wd-table");
  (_easycom_wd_table_col2 + _easycom_wd_table2)();
}
const _easycom_wd_table_col = () => "../../../node-modules/wot-design-uni/components/wd-table-col/wd-table-col.js";
const _easycom_wd_table = () => "../../../node-modules/wot-design-uni/components/wd-table/wd-table.js";
if (!Math) {
  (NavBar + _easycom_wd_table_col + _easycom_wd_table)();
}
const NavBar = () => "../../../components/NavBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const runningRecords = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      runningRecords.value = common_vendor.index.getStorageSync("runningRecords");
    });
    const handleBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleBack),
        b: common_vendor.p({
          title: "跑步记录",
          showBack: true,
          showShare: true
        }),
        c: common_vendor.p({
          prop: "date",
          label: "日期",
          fixed: true
        }),
        d: common_vendor.p({
          prop: "time",
          label: "运动时长"
        }),
        e: common_vendor.p({
          prop: "distance",
          label: "运动距离/米"
        }),
        f: common_vendor.p({
          prop: "points",
          label: "得分"
        }),
        g: common_vendor.p({
          prop: "scheme",
          label: "方案"
        }),
        h: common_vendor.p({
          prop: "totalPoints",
          label: "总得分"
        }),
        i: common_vendor.p({
          data: runningRecords.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1094f99b"]]);
wx.createPage(MiniProgramPage);
