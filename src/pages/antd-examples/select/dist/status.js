"use strict";
exports.__esModule = true;
exports.AntdSelectStatus = void 0;
var antd_1 = require("antd");
exports.AntdSelectStatus = function () { return (React.createElement(antd_1.Space, { direction: "vertical", style: { width: '100%' } },
    React.createElement(antd_1.Select, { status: "error", style: { width: '100%' } }),
    React.createElement(antd_1.Select, { status: "warning", style: { width: '100%' } }))); };
