"use strict";
exports.__esModule = true;
exports.AntdBreadcrumb = void 0;
var antd_components_1 = require("../antd-components");
var basic_1 = require("./basic");
var overlay_1 = require("./overlay");
var react_router_1 = require("./react-router");
var separator_1 = require("./separator");
var separator_component_1 = require("./separator-component");
var withIcon_1 = require("./withIcon");
var components = [
    { feature: "basic", component: React.createElement(basic_1.AntdBreadcrumbBasic, null) },
    { feature: "overlay", component: React.createElement(overlay_1.AntdBreadcrumbOverlay, null) },
    { feature: "reactrouter/*", component: React.createElement(react_router_1.AntdBreadcrumbReactRouter, null) },
    { feature: "separatorcomponent", component: React.createElement(separator_component_1.AntdBreadcrumbSeparatorComp, null) },
    { feature: "separator", component: React.createElement(separator_1.AntdBreadcrumbSeparator, null) },
    { feature: "icon", component: React.createElement(withIcon_1.AntdBreadcrumbWithIcon, null) }
];
exports.AntdBreadcrumb = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "breadcrumb", components: components });
};
