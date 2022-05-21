"use strict";
exports.__esModule = true;
exports.AntdSelectMultiple = void 0;
var antd_1 = require("antd");
var Option = antd_1.Select.Option;
var children = [];
for (var i = 10; i < 36; i++) {
    children.push(React.createElement(Option, { key: i.toString(36) + i }, i.toString(36) + i));
}
function handleChange(value) {
    console.log("selected " + value);
}
exports.AntdSelectMultiple = function () { return React.createElement(React.Fragment, null,
    React.createElement(antd_1.Select, { mode: "multiple", allowClear: true, style: { width: '100%' }, placeholder: "Please select", defaultValue: ['a10', 'c12'], onChange: handleChange }, children),
    React.createElement("br", null),
    React.createElement(antd_1.Select, { mode: "multiple", disabled: true, style: { width: '100%' }, placeholder: "Please select", defaultValue: ['a10', 'c12'], onChange: handleChange }, children)); };
