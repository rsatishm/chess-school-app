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
exports.AntdFormWithoutFormCreate = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
function validatePrimeNumber(number) {
    if (number === 11) {
        return {
            validateStatus: 'success',
            errorMsg: null
        };
    }
    return {
        validateStatus: 'error',
        errorMsg: 'The prime between 8 and 12 is 11!'
    };
}
var formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 }
};
exports.AntdFormWithoutFormCreate = function () {
    var _a = react_1.useState({
        value: 11
    }), number = _a[0], setNumber = _a[1];
    var tips = 'A prime is a natural number greater than 1 that has no positive divisors other than 1 and itself.';
    var onNumberChange = function (value) {
        setNumber(__assign(__assign({}, validatePrimeNumber(value)), { value: value }));
    };
    return (react_1["default"].createElement(antd_1.Form, null,
        react_1["default"].createElement(antd_1.Form.Item, __assign({}, formItemLayout, { label: "Prime between 8 & 12", validateStatus: number.validateStatus, help: number.errorMsg || tips }),
            react_1["default"].createElement(antd_1.InputNumber, { min: 8, max: 12, value: number.value, onChange: onNumberChange }))));
};
