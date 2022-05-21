"use strict";
exports.__esModule = true;
exports.AntdSelectLabelInValue = void 0;
var antd_1 = require("antd");
var Option = antd_1.Select.Option;
function handleChange(value) {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
}
exports.AntdSelectLabelInValue = function () { return React.createElement(antd_1.Select, { labelInValue: true, defaultValue: { value: 'lucy' }, style: { width: 120 }, onChange: handleChange },
    React.createElement(Option, { value: "jack" }, "Jack (100)"),
    React.createElement(Option, { value: "lucy" }, "Lucy (101)")); };
