"use strict";
exports.__esModule = true;
exports.AntdTree = void 0;
var antd_components_1 = require("../antd-components");
var basic_1 = require("./basic");
var basic_controlled_1 = require("./basic-controlled");
var big_data_1 = require("./big-data");
var customized_icon_1 = require("./customized-icon");
var directory_1 = require("./directory");
var line_1 = require("./line");
var switcher_icon_1 = require("./switcher-icon");
var virtual_scroll_1 = require("./virtual-scroll");
var components = [
    { feature: "basiccontrolled", component: React.createElement(basic_controlled_1.AntdTreeBasicControlled, null) },
    { feature: "basic", component: React.createElement(basic_1.AntdTreeBasic, null) },
    { feature: "bigdata", component: React.createElement(big_data_1.AntdTreeBigData, null) },
    { feature: "customizedicon", component: React.createElement(customized_icon_1.AntdTreeCustomizedIcon, null) },
    { feature: "directory", component: React.createElement(directory_1.AntdTreeDirectory, null) },
    { feature: "line", component: React.createElement(line_1.AntdTreeLine, null) },
    { feature: "switchericon", component: React.createElement(switcher_icon_1.AntdTreeSwitcherIcon, null) },
    { feature: "virtualscroll", component: React.createElement(virtual_scroll_1.AntdTreeVirtualScroll, null) }
];
exports.AntdTree = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "tree", components: components });
};
