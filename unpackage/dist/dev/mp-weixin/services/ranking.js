"use strict";
const fetchRankingData = async (params) => {
  const mockData = {
    week: {
      health: [
        { name: "健康守护者", score: 100 },
        { name: "可爱宝宝", score: 100 },
        { name: "曙光", score: 100 },
        { name: "朱丽叶的爱情", score: 98 },
        { name: "大约在春天", score: 97 },
        { name: "冬天的约定", score: 96 },
        { name: "在哪里见过你", score: 95 }
      ],
      sport: [
        { name: "运动达人", score: 105 },
        { name: "跑步健将", score: 102 },
        { name: "健身狂人", score: 101 },
        { name: "铁人三项", score: 99 },
        { name: "冲浪高手", score: 97 }
      ]
    }
    // 其他时间段的模拟数据也可以在这里添加
  };
  return {
    data: mockData[params.time][params.category] || []
  };
};
exports.fetchRankingData = fetchRankingData;
