"use strict";
exports.__esModule = true;
exports.AntdTreeSelect = void 0;
var antd_components_1 = require("../antd-components");
var basic_1 = require("./basic");
var components = [
    { feature: "basic", component: React.createElement(basic_1.AntdTreeSelectBasic, null) },
];
exports.AntdTreeSelect = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "treeselect", components: components });
};
