"use strict";
exports.__esModule = true;
exports.AntdSelectBordered = void 0;
var antd_1 = require("antd");
var Option = antd_1.Select.Option;
exports.AntdSelectBordered = function () { return React.createElement(React.Fragment, null,
    React.createElement(antd_1.Select, { defaultValue: "lucy", style: { width: 120 }, bordered: false },
        React.createElement(Option, { value: "jack" }, "Jack"),
        React.createElement(Option, { value: "lucy" }, "Lucy"),
        React.createElement(Option, { value: "Yiminghe" }, "yiminghe")),
    React.createElement(antd_1.Select, { defaultValue: "lucy", style: { width: 120 }, disabled: true, bordered: false },
        React.createElement(Option, { value: "lucy" }, "Lucy"))); };
