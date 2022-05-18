"use strict";
exports.__esModule = true;
exports.AntdBadgeOverflow = void 0;
var antd_1 = require("antd");
exports.AntdBadgeOverflow = function () { return React.createElement(React.Fragment, null,
    React.createElement(antd_1.Badge, { count: 99 },
        React.createElement(antd_1.Avatar, { shape: "square", size: "large" })),
    React.createElement(antd_1.Badge, { count: 100 },
        React.createElement(antd_1.Avatar, { shape: "square", size: "large" })),
    React.createElement(antd_1.Badge, { count: 99, overflowCount: 100 },
        React.createElement(antd_1.Avatar, { shape: "square", size: "large" })),
    React.createElement(antd_1.Badge, { count: 1000, overflowCount: 999 },
        React.createElement(antd_1.Avatar, { shape: "square", size: "large" }))); };
