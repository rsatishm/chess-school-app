"use strict";
exports.__esModule = true;
exports.AntdSelectSize = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var Option = antd_1.Select.Option;
var children = [];
for (var i = 10; i < 36; i++) {
    children.push(react_1["default"].createElement(Option, { key: i.toString(36) + i }, i.toString(36) + i));
}
function handleChange(value) {
    console.log("Selected: " + value);
}
function AntdSelectSize() {
    var _a = react_1["default"].useState('default'), size = _a[0], setSize = _a[1];
    var handleSizeChange = function (e) {
        setSize(e.target.value);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Radio.Group, { value: size, onChange: handleSizeChange },
            react_1["default"].createElement(antd_1.Radio.Button, { value: "large" }, "Large"),
            react_1["default"].createElement(antd_1.Radio.Button, { value: "default" }, "Default"),
            react_1["default"].createElement(antd_1.Radio.Button, { value: "small" }, "Small")),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement(antd_1.Select, { size: size, defaultValue: "a1", onChange: handleChange, style: { width: 200 } }, children),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement(antd_1.Select, { mode: "multiple", size: size, placeholder: "Please select", defaultValue: ['a10', 'c12'], onChange: handleChange, style: { width: '100%' } }, children),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement(antd_1.Select, { mode: "tags", size: size, placeholder: "Please select", defaultValue: ['a10', 'c12'], onChange: handleChange, style: { width: '100%' } }, children)));
}
exports.AntdSelectSize = AntdSelectSize;
