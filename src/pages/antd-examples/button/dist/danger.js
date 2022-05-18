"use strict";
exports.__esModule = true;
exports.AntdButtonDanger = void 0;
var antd_1 = require("antd");
exports.AntdButtonDanger = function () { return React.createElement(React.Fragment, null,
    React.createElement(antd_1.Button, { type: "primary", danger: true }, "Primary"),
    React.createElement(antd_1.Button, { danger: true }, "Default"),
    React.createElement(antd_1.Button, { type: "dashed", danger: true }, "Dashed"),
    React.createElement(antd_1.Button, { type: "text", danger: true }, "Text"),
    React.createElement(antd_1.Button, { type: "link", danger: true }, "Link")); };
