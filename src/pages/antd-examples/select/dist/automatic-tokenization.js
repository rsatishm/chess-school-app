"use strict";
exports.__esModule = true;
exports.AntdSelectAutoToken = void 0;
var antd_1 = require("antd");
var Option = antd_1.Select.Option;
var children = [];
for (var i = 10; i < 36; i++) {
    children.push(React.createElement(Option, { key: i.toString(36) + i }, i.toString(36) + i));
}
function handleChange(value) {
    console.log("selected " + value);
}
exports.AntdSelectAutoToken = function () { return React.createElement(antd_1.Select, { mode: "tags", style: { width: '100%' }, onChange: handleChange, tokenSeparators: [','] }, children); };
