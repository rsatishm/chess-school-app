"use strict";
exports.__esModule = true;
exports.AntdSkeleton = void 0;
var antd_components_1 = require("../antd-components");
var active_1 = require("./active");
var basic_1 = require("./basic");
var children_1 = require("./children");
var complex_1 = require("./complex");
var element_1 = require("./element");
var list_1 = require("./list");
var components = [
    { feature: "active", component: React.createElement(active_1.AntdSkeletonActive, null) },
    { feature: "basic", component: React.createElement(basic_1.AntdSkeletonBasic, null) },
    { feature: "children", component: React.createElement(children_1.AntdSkeletonChildren, null) },
    { feature: "complex", component: React.createElement(complex_1.AntdSkeletonComplex, null) },
    { feature: "element", component: React.createElement(element_1.AntdSkleletonElement, null) },
    { feature: "list", component: React.createElement(list_1.AntdSkeletonList, null) },
];
exports.AntdSkeleton = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "skeleton", components: components });
};
