"use strict";
exports.__esModule = true;
exports.AntdTabs = void 0;
var antd_components_1 = require("../antd-components");
var card_1 = require("./card");
var extra_1 = require("./extra");
var nest_1 = require("./nest");
var position_1 = require("./position");
var slide_1 = require("./slide");
var components = [
    { feature: "card", component: React.createElement(card_1.AntdTabsCard, null) },
    { feature: "extra", component: React.createElement(extra_1.AntdTabsExtra, null) },
    { feature: "nest", component: React.createElement(nest_1.AntdTabsNest, null) },
    { feature: "position", component: React.createElement(position_1.AntdTabsPosition, null) },
    { feature: "slide", component: React.createElement(slide_1.AntdTabsSlide, null) }
];
exports.AntdTabs = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "tabs", components: components });
};
