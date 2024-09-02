"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  _easycom_wd_icon2();
}
const _easycom_wd_icon = () => "../../node-modules/wot-design-uni/components/wd-icon/wd-icon.js";
if (!Math) {
  _easycom_wd_icon();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const latitude = common_vendor.ref(0);
    const longitude = common_vendor.ref(0);
    const markers = common_vendor.ref([]);
    const speed = common_vendor.ref(0);
    const distance = common_vendor.ref(0);
    const formattedTime = common_vendor.ref("00:00:00");
    const debugInfo = common_vendor.ref("调试信息：");
    const goButtonText = common_vendor.ref("GO");
    const goButtonClass = common_vendor.ref("go-button");
    const totalDuration = common_vendor.ref(0);
    const score = common_vendor.ref(0);
    const runningRecords = common_vendor.ref([]);
    let scheme1Count = 0;
    let scheme2Count = 0;
    let combinedCount = 0;
    let timer = null;
    let startTime = null;
    let startLocation = null;
    let lastLocation = null;
    let lastTimestamp = null;
    let interval = 5;
    let watchId = null;
    let isCounting = false;
    const maleSpeedRange = {
      min: 80,
      max: 120
    };
    const speedRange = maleSpeedRange;
    const toggleRunning = () => {
      if (goButtonText.value === "GO") {
        startRunning();
      } else {
        stopRunning();
      }
    };
    const getUserLocation = () => {
      debugInfo.value += "\n开始获取用户定位权限";
      common_vendor.index.getSetting({
        success(res) {
          if (!res.authSetting["scope.userLocation"]) {
            debugInfo.value += "\n未授权定位权限，申请授权中";
            common_vendor.index.authorize({
              scope: "scope.userLocation",
              success() {
                debugInfo.value += "\n授权成功，开始获取位置";
                fetchLocation();
              },
              fail() {
                debugInfo.value += "\n授权失败，提示用户前往设置开启权限";
                common_vendor.index.showModal({
                  title: "授权失败",
                  content: "请前往设置中开启地理位置权限",
                  success(modalRes) {
                    if (modalRes.confirm) {
                      debugInfo.value += "\n用户同意前往设置";
                      common_vendor.index.openSetting();
                    }
                  }
                });
              }
            });
          } else {
            debugInfo.value += "\n已授权定位权限，开始获取位置";
            fetchLocation();
          }
        },
        fail(err) {
          debugInfo.value += `
获取用户设置失败: ${JSON.stringify(err)}`;
        }
      });
    };
    const fetchLocation = () => {
      common_vendor.index.getLocation({
        type: "gcj02",
        success(locRes) {
          debugInfo.value += `
当前位置获取成功: 经度: ${locRes.longitude}, 纬度: ${locRes.latitude}`;
          latitude.value = locRes.latitude;
          longitude.value = locRes.longitude;
          markers.value = [{
            id: 1,
            latitude: locRes.latitude,
            longitude: locRes.longitude,
            title: "当前位置"
          }];
          startLocation = {
            latitude: locRes.latitude,
            longitude: locRes.longitude
          };
          lastLocation = {
            ...startLocation
          };
          lastTimestamp = Date.now();
        },
        fail(err) {
          debugInfo.value += `
获取当前位置失败: ${JSON.stringify(err)}`;
        }
      });
    };
    const startRunning = () => {
      goButtonText.value = "结束";
      goButtonClass.value = "stop-button";
      debugInfo.value += "\n开始跑步";
      startTime = Date.now();
      if (startLocation) {
        distance.value = 0;
      }
      common_vendor.index.startLocationUpdate({
        success() {
          debugInfo.value += "\n位置更新已开启";
          watchId = common_vendor.index.onLocationChange((locRes) => {
            debugInfo.value += `
位置变化: 经度: ${locRes.longitude}, 纬度: ${locRes.latitude}, 速度: ${locRes.speed}`;
            const newLocation = {
              latitude: locRes.latitude,
              longitude: locRes.longitude
            };
            const currentTime = Date.now();
            const timeElapsed = (currentTime - lastTimestamp) / 1e3;
            const currentSpeed = locRes.speed * 60;
            if (currentSpeed >= speedRange.min && currentSpeed <= speedRange.max) {
              if (!isCounting) {
                isCounting = true;
                lastTimestamp = currentTime;
              }
              if (timeElapsed >= interval) {
                const distanceTraveled = calculateDistance(lastLocation, newLocation);
                distance.value += distanceTraveled;
                const intervalSpeed = calculateIntervalSpeed(
                  distanceTraveled,
                  timeElapsed
                );
                speed.value = parseFloat(intervalSpeed).toFixed(1);
                lastLocation = newLocation;
                lastTimestamp = currentTime;
              }
            } else {
              isCounting = false;
              debugInfo.value += `
速度不在规定范围内，暂停计时`;
            }
          });
        },
        fail(err) {
          debugInfo.value += `
开启位置更新失败: ${JSON.stringify(err)}`;
        }
      });
      timer = setInterval(updateTime, 1e3);
    };
    const stopRunning = () => {
      debugInfo.value += "\n停止跑步";
      goButtonText.value = "GO";
      goButtonClass.value = "go-button";
      clearInterval(timer);
      common_vendor.index.stopLocationUpdate({
        success() {
          debugInfo.value += "\n位置更新已停止";
        },
        fail(err) {
          debugInfo.value += `
停止位置更新失败: ${JSON.stringify(err)}`;
        }
      });
      common_vendor.index.offLocationChange(watchId);
      calculateScore();
      speed.value = 0;
      distance.value = 0;
      formattedTime.value = "00:00:00";
      totalDuration.value = 0;
    };
    const calculateScore = () => {
      const minutes = Math.floor(totalDuration.value / 60);
      let earnedScore = 0;
      if (combinedCount < 3) {
        if (minutes >= 15 && scheme2Count < 3) {
          scheme2Count += 1;
          combinedCount += 1;
          earnedScore = 3;
        }
        if (minutes >= 10 && combinedCount < 3 && scheme1Count < 3) {
          let scheme1Score = 1;
          if (minutes >= 20) {
            scheme1Score += 3;
            if (minutes > 20) {
              const additional10Min = Math.floor((minutes - 20) / 10);
              scheme1Score += additional10Min * 3;
            }
          }
          scheme1Count += 1;
          combinedCount += 1;
          earnedScore = scheme1Score;
        }
      }
      score.value = earnedScore;
      const newRecord = {
        date: (/* @__PURE__ */ new Date()).toLocaleDateString(),
        // 当前日期
        time: formattedTime.value,
        distance: distance.value,
        points: earnedScore,
        scheme: earnedScore === 3 ? 2 : 1,
        // 根据得分判断使用的方案
        totalPoints: score.value,
        // 当天总积分
        totalCount: combinedCount
        // 当天总次数
      };
      runningRecords.value.push(newRecord);
      common_vendor.index.setStorageSync("runningRecords", runningRecords.value);
      console.log(`总运动时间: ${formattedTime.value}, 方案1得分次数: ${scheme1Count}, 方案2得分次数: ${scheme2Count}, 得分: ${score.value}`);
    };
    const updateTime = () => {
      if (isCounting) {
        const elapsed = Math.floor((Date.now() - startTime) / 1e3);
        totalDuration.value = elapsed;
        formattedTime.value = formatTime(elapsed);
      }
    };
    const calculateDistance = (loc1, loc2) => {
      const radLat1 = loc1.latitude * Math.PI / 180;
      const radLat2 = loc2.latitude * Math.PI / 180;
      const deltaLat = radLat1 - radLat2;
      const deltaLng = (loc1.longitude - loc2.longitude) * Math.PI / 180;
      const distance2 = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
      return parseFloat((distance2 * 6378137).toFixed(1));
    };
    const calculateIntervalSpeed = (dist, time) => {
      return dist / time * 60;
    };
    const formatTime = (seconds) => {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor(seconds % 3600 / 60);
      const secs = seconds % 60;
      return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    const viewHistory = () => {
      debugInfo.value += "\n查看运动记录";
      common_vendor.index.navigateTo({
        url: `/pages/sport/runningRecords/index`
      });
    };
    const openSettings = () => {
      common_vendor.index.navigateTo({
        url: "/pages/my/settings/index"
      });
    };
    common_vendor.onMounted(() => {
      getUserLocation();
    });
    common_vendor.onUnmounted(() => {
      clearInterval(timer);
      common_vendor.index.offLocationChange(watchId);
    });
    return (_ctx, _cache) => {
      return {
        a: latitude.value,
        b: longitude.value,
        c: markers.value,
        d: common_vendor.t(speed.value),
        e: common_vendor.t(formattedTime.value),
        f: common_vendor.t(distance.value),
        g: common_vendor.p({
          name: "list",
          size: "22px",
          color: "#55B89A"
        }),
        h: common_vendor.o(viewHistory),
        i: common_vendor.t(goButtonText.value),
        j: common_vendor.n(goButtonClass.value),
        k: common_vendor.o(toggleRunning),
        l: common_vendor.p({
          name: "setting",
          size: "22px",
          color: "#55B89A"
        }),
        m: common_vendor.o(openSettings)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-22ac38f1"]]);
wx.createPage(MiniProgramPage);
