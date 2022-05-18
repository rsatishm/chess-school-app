"use strict";
exports.__esModule = true;
exports.AntdButtonBlock = void 0;
var antd_1 = require("antd");
exports.AntdButtonBlock = function () { return React.createElement(React.Fragment, null,
    React.createElement(antd_1.Button, { type: "primary", block: true }, "Primary"),
    React.createElement(antd_1.Button, { block: true }, "Default"),
    React.createElement(antd_1.Button, { type: "dashed", block: true }, "Dashed"),
    React.createElement(antd_1.Button, { type: "link", block: true }, "Link")); };
