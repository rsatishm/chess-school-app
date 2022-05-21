"use strict";
exports.__esModule = true;
exports.AntdSelectOptionLabelProp = void 0;
var antd_1 = require("antd");
var Option = antd_1.Select.Option;
function handleChange(value) {
    console.log("selected " + value);
}
exports.AntdSelectOptionLabelProp = function () { return React.createElement(antd_1.Select, { mode: "multiple", style: { width: '100%' }, placeholder: "select one country", defaultValue: ['china'], onChange: handleChange, optionLabelProp: "label" },
    React.createElement(Option, { value: "china", label: "China" },
        React.createElement("div", { className: "demo-option-label-item" },
            React.createElement("span", { role: "img", "aria-label": "China" }, "\uD83C\uDDE8\uD83C\uDDF3"),
            "China (\u4E2D\u56FD)")),
    React.createElement(Option, { value: "usa", label: "USA" },
        React.createElement("div", { className: "demo-option-label-item" },
            React.createElement("span", { role: "img", "aria-label": "USA" }, "\uD83C\uDDFA\uD83C\uDDF8"),
            "USA (\u7F8E\u56FD)")),
    React.createElement(Option, { value: "japan", label: "Japan" },
        React.createElement("div", { className: "demo-option-label-item" },
            React.createElement("span", { role: "img", "aria-label": "Japan" }, "\uD83C\uDDEF\uD83C\uDDF5"),
            "Japan (\u65E5\u672C)")),
    React.createElement(Option, { value: "korea", label: "Korea" },
        React.createElement("div", { className: "demo-option-label-item" },
            React.createElement("span", { role: "img", "aria-label": "Korea" }, "\uD83C\uDDF0\uD83C\uDDF7"),
            "Korea (\u97E9\u56FD)"))); };
