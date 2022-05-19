"use strict";
exports.__esModule = true;
exports.AntdTypography = void 0;
var antd_components_1 = require("../antd-components");
var basic_1 = require("./basic");
var components = [
    { feature: "basic", component: React.createElement(basic_1.AntdTypographyBasic, null) },
];
exports.AntdTypography = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "typography", components: components });
};
