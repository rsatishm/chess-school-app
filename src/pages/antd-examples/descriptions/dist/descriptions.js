"use strict";
exports.__esModule = true;
exports.AntdDescriptions = void 0;
var antd_components_1 = require("../antd-components");
var basic_1 = require("./basic");
var border_1 = require("./border");
var responsive_1 = require("./responsive");
var size_1 = require("./size");
var style_1 = require("./style");
var text_1 = require("./text");
var vertical_1 = require("./vertical");
var vertical_border_1 = require("./vertical-border");
var components = [
    { feature: "basic", component: React.createElement(basic_1.AntdDescriptionsBasic, null) },
    { feature: "border", component: React.createElement(border_1.AntdDescriptionsBorder, null) },
    { feature: "responsive", component: React.createElement(responsive_1.AntdDescriptionsResponsive, null) },
    { feature: "size", component: React.createElement(size_1.AntdDescriptionsSize, null) },
    { feature: "style", component: React.createElement(style_1.AntdDescriptionsStyle, null) },
    { feature: "text", component: React.createElement(text_1.AntdDescriptionsText, null) },
    { feature: "verticalborder", component: React.createElement(vertical_border_1.AntdDescriptionsVerticalBorder, null) },
    { feature: "vertical", component: React.createElement(vertical_1.AntdDescriptionsVertical, null) }
];
exports.AntdDescriptions = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "descriptions", components: components });
};
