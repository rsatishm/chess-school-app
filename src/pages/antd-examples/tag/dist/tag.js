"use strict";
exports.__esModule = true;
exports.AntdTag = void 0;
var antd_components_1 = require("../antd-components");
var animation_1 = require("./animation");
var basic_1 = require("./basic");
var customize_1 = require("./customize");
var components = [
    { feature: "animation", component: React.createElement(animation_1.AntdTagAnimation, null) },
    { feature: "basic", component: React.createElement(basic_1.AntdTagBasic, null) },
    { feature: "customize", component: React.createElement(customize_1.AntdTagCustomize, null) }
];
exports.AntdTag = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "tag", components: components });
};
