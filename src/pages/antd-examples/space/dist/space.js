"use strict";
exports.__esModule = true;
exports.AntdSpace = void 0;
var antd_components_1 = require("../antd-components");
var align_1 = require("./align");
var base_1 = require("./base");
var customize_1 = require("./customize");
var debug_1 = require("./debug");
var gap_in_line_1 = require("./gap-in-line");
var size_1 = require("./size");
var split_1 = require("./split");
var vertical_1 = require("./vertical");
var wrap_1 = require("./wrap");
var components = [
    { feature: "align", component: React.createElement(align_1.AntdSpaceAlign, null) },
    { feature: "base", component: React.createElement(base_1.AntdSpaceBase, null) },
    { feature: "customize", component: React.createElement(customize_1.AntdSpaceCustomize, null) },
    { feature: "debug", component: React.createElement(debug_1.AntdSpaceDebug, null) },
    { feature: "gameinline", component: React.createElement(gap_in_line_1.AntdSpaceGapInLine, null) },
    { feature: "size", component: React.createElement(size_1.AntdSpaceSize, null) },
    { feature: "split", component: React.createElement(split_1.AntdSpaceSplit, null) },
    { feature: "vertical", component: React.createElement(vertical_1.AntdSpaceVertical, null) },
    { feature: "wrap", component: React.createElement(wrap_1.AntdSpaceWrap, null) },
];
exports.AntdSpace = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "space", components: components });
};
