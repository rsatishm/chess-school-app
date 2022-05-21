"use strict";
exports.__esModule = true;
exports.AntdLayout = void 0;
var antd_components_1 = require("../antd-components");
var custom_trigger_1 = require("./custom-trigger");
var custom_trigger_debug_1 = require("./custom-trigger-debug");
var basic_1 = require("./basic");
var fixed_sider_1 = require("./fixed-sider");
var fixed_1 = require("./fixed");
var responsive_1 = require("./responsive");
var side_1 = require("./side");
var top_side_2_1 = require("./top-side-2");
var top_side_1 = require("./top-side");
var top_1 = require("./top");
var components = [
    { feature: "basic", component: React.createElement(basic_1.AntdLayoutBasic, null) },
    { feature: "customtriggerdebug", component: React.createElement(custom_trigger_debug_1.AntdLayoutCustomTriggerDebug, null) },
    { feature: "customtrigger", component: React.createElement(custom_trigger_1.AntdLayoutCustomTrigger, null) },
    { feature: "fixedsider", component: React.createElement(fixed_sider_1.AntdLayoutFixedSider, null) },
    { feature: "fixed", component: React.createElement(fixed_1.AntdLayoutFixed, null) },
    { feature: "responsive", component: React.createElement(responsive_1.AntdLayoutResponsive, null) },
    { feature: "side", component: React.createElement(side_1.AntdLayoutSide, null) },
    { feature: "topside2", component: React.createElement(top_side_2_1.AntdLayoutTopSide2, null) },
    { feature: "topside", component: React.createElement(top_side_1.AntdLayoutTopSide, null) },
    { feature: "top", component: React.createElement(top_1.AntdLayoutTop, null) },
];
exports.AntdLayout = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "layout", components: components });
};
