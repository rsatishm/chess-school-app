"use strict";
exports.__esModule = true;
exports.AntdSelectBasic = void 0;
var antd_1 = require("antd");
var Option = antd_1.Select.Option;
function handleChange(value) {
    console.log("selected " + value);
}
exports.AntdSelectBasic = function () { return React.createElement(React.Fragment, null,
    React.createElement(antd_1.Select, { defaultValue: "lucy", style: { width: 120 }, onChange: handleChange },
        React.createElement(Option, { value: "jack" }, "Jack"),
        React.createElement(Option, { value: "lucy" }, "Lucy"),
        React.createElement(Option, { value: "disabled", disabled: true }, "Disabled"),
        React.createElement(Option, { value: "Yiminghe" }, "yiminghe")),
    React.createElement(antd_1.Select, { defaultValue: "lucy", style: { width: 120 }, disabled: true },
        React.createElement(Option, { value: "lucy" }, "Lucy")),
    React.createElement(antd_1.Select, { defaultValue: "lucy", style: { width: 120 }, loading: true },
        React.createElement(Option, { value: "lucy" }, "Lucy")),
    React.createElement(antd_1.Select, { defaultValue: "lucy", style: { width: 120 }, allowClear: true },
        React.createElement(Option, { value: "lucy" }, "Lucy"))); };
