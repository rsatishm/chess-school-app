"use strict";
exports.__esModule = true;
exports.AntdSpaceDebug = void 0;
var antd_1 = require("antd");
exports.AntdSpaceDebug = function () { return React.createElement(antd_1.Space, null,
    React.createElement(React.Fragment, null,
        "Button",
        React.createElement(antd_1.Button, null, "Button")),
    "Button",
    React.createElement(antd_1.Popconfirm, { title: "Are you sure delete this task?", okText: "Yes", cancelText: "No" },
        React.createElement(antd_1.Button, null, "Delete")),
    React.createElement(antd_1.Popconfirm, { title: "Are you sure delete this task?", okText: "Yes", cancelText: "No" },
        React.createElement(antd_1.Button, { disabled: true }, "Delete")),
    null,
    false,
    1,
    "Button",
    null,
    undefined); };
