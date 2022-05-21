"use strict";
exports.__esModule = true;
exports.AntdGrid = void 0;
var antd_components_1 = require("../antd-components");
var basic_1 = require("./basic");
var flex_1 = require("./flex");
var flex_align_1 = require("./flex-align");
var flex_order_1 = require("./flex-order");
var flex_stretch_1 = require("./flex-stretch");
var gutter_1 = require("./gutter");
var offset_1 = require("./offset");
var playground_1 = require("./playground");
var responsive_1 = require("./responsive");
var responsive_more_1 = require("./responsive-more");
var sort_1 = require("./sort");
var useBreakpoint_1 = require("./useBreakpoint");
var components = [
    { feature: "basic", component: React.createElement(basic_1.AntdGridBasic, null) },
    { feature: "flexalign", component: React.createElement(flex_align_1.AntdGridFlexAlign, null) },
    { feature: "flexorder", component: React.createElement(flex_order_1.AntdGridFlexOrder, null) },
    { feature: "flexstretch", component: React.createElement(flex_stretch_1.AntdGridFlexStretch, null) },
    { feature: "flex", component: React.createElement(flex_1.AntdGridFlex, null) },
    { feature: "gutter", component: React.createElement(gutter_1.AntdGridGutter, null) },
    { feature: "offset", component: React.createElement(offset_1.AntdGridOffset, null) },
    { feature: "playground", component: React.createElement(playground_1.AntdGridPlayground, null) },
    { feature: "responsivemore", component: React.createElement(responsive_more_1.AntdGridResponsiveMore, null) },
    { feature: "responsive", component: React.createElement(responsive_1.AntdGridResponsive, null) },
    { feature: "sort", component: React.createElement(sort_1.AntdGridSort, null) },
    { feature: "usebreakpoint", component: React.createElement(useBreakpoint_1.AntdGridUseBreakpoint, null) },
];
exports.AntdGrid = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "grid", components: components });
};
