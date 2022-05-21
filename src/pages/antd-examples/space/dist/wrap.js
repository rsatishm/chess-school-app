"use strict";
exports.__esModule = true;
exports.AntdSpaceWrap = void 0;
var antd_1 = require("antd");
exports.AntdSpaceWrap = function () { return (React.createElement(antd_1.Space, { size: [8, 16], wrap: true }, new Array(20).fill(null).map(function (_, index) { return (
// eslint-disable-next-line react/no-array-index-key
React.createElement(antd_1.Button, { key: index }, "Button")); }))); };
