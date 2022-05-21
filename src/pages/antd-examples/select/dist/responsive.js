"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.AntdSelectResponsive = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var options = [];
for (var i = 10; i < 36; i++) {
    var value = i.toString(36) + i;
    options.push({
        label: "Long Label: " + value,
        value: value
    });
}
exports.AntdSelectResponsive = function () {
    var _a = react_1["default"].useState(['a10', 'c12', 'h17', 'j19', 'k20']), value = _a[0], setValue = _a[1];
    var selectProps = {
        mode: 'multiple',
        style: { width: '100%' },
        value: value,
        options: options,
        onChange: function (newValue) {
            setValue(newValue);
        },
        placeholder: 'Select Item...',
        maxTagCount: 'responsive'
    };
    return (react_1["default"].createElement(antd_1.Space, { direction: "vertical", style: { width: '100%' } },
        react_1["default"].createElement(antd_1.Select, __assign({}, selectProps)),
        react_1["default"].createElement(antd_1.Select, __assign({}, selectProps, { disabled: true }))));
};
