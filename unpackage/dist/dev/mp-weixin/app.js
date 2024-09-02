"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/index.js";
  "./pages/register/index.js";
  "./pages/index/index.js";
  "./pages/detail/index.js";
  "./pages/sport/index.js";
  "./pages/sport/runningRecords/index.js";
  "./pages/my/comment/index.js";
  "./pages/my/forward/index.js";
  "./pages/my/collection/index.js";
  "./pages/my/settings/index.js";
  "./pages/my/settings/aboutUs.js";
  "./pages/my/settings/changePassword.js";
  "./pages/my/my.js";
  "./pages/question/index.js";
  "./pages/ranking/index.js";
  "./pages/grade/index.js";
  "./pages/share/index.js";
  "./pages/science/index.js";
  "./pages/history/index.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    common_vendor.onLaunch(() => {
      console.log("加载完毕");
      const token = common_vendor.index.getStorageSync("token");
      if (!token) {
        common_vendor.index.redirectTo({
          url: "/pages/login/index"
        });
      } else {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      }
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const TabBar = () => "./components/CustomTabBar.js";
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.component("TabBar", TabBar);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
