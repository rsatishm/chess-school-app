"use strict";
exports.__esModule = true;
exports.AntdStatistic = void 0;
var antd_components_1 = require("../antd-components");
var basic_1 = require("./basic");
var card_1 = require("./card");
var countdown_1 = require("./countdown");
var unit_1 = require("./unit");
var components = [
    { feature: "basic", component: React.createElement(basic_1.AntdStatisticBasic, null) },
    { feature: "card", component: React.createElement(card_1.AntdStatisticCard, null) },
    { feature: "countdown", component: React.createElement(countdown_1.AntdStatisticCountDown, null) },
    { feature: "unit", component: React.createElement(unit_1.AntdStatisticUnit, null) },
];
exports.AntdStatistic = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "statistic", components: components });
};
