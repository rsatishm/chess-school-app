"use strict";
exports.__esModule = true;
exports.AntdTimeline = void 0;
var antd_components_1 = require("../antd-components");
var basic_1 = require("./basic");
var custom_1 = require("./custom");
var pending_1 = require("./pending");
var components = [
    { feature: "basic", component: React.createElement(basic_1.AntdTimelineBasic, null) },
    { feature: "custom", component: React.createElement(custom_1.AntdTimelineCustom, null) },
    { feature: "pending", component: React.createElement(pending_1.AntdTimelinePending, null) },
];
exports.AntdTimeline = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "timeline", components: components });
};
