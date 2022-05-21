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
exports.AntdFormCustomizedFormControls = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var Option = antd_1.Select.Option;
var PriceInput = function (_a) {
    var _b = _a.value, value = _b === void 0 ? {} : _b, onChange = _a.onChange;
    var _c = react_1.useState(0), number = _c[0], setNumber = _c[1];
    var _d = react_1.useState('rmb'), currency = _d[0], setCurrency = _d[1];
    var triggerChange = function (changedValue) {
        onChange === null || onChange === void 0 ? void 0 : onChange(__assign(__assign({ number: number, currency: currency }, value), changedValue));
    };
    var onNumberChange = function (e) {
        var newNumber = parseInt(e.target.value || '0', 10);
        if (Number.isNaN(number)) {
            return;
        }
        if (!('number' in value)) {
            setNumber(newNumber);
        }
        triggerChange({ number: newNumber });
    };
    var onCurrencyChange = function (newCurrency) {
        if (!('currency' in value)) {
            setCurrency(newCurrency);
        }
        triggerChange({ currency: newCurrency });
    };
    return (react_1["default"].createElement("span", null,
        react_1["default"].createElement(antd_1.Input, { type: "text", value: value.number || number, onChange: onNumberChange, style: { width: 100 } }),
        react_1["default"].createElement(antd_1.Select, { value: value.currency || currency, style: { width: 80, margin: '0 8px' }, onChange: onCurrencyChange },
            react_1["default"].createElement(Option, { value: "rmb" }, "RMB"),
            react_1["default"].createElement(Option, { value: "dollar" }, "Dollar"))));
};
exports.AntdFormCustomizedFormControls = function () {
    var onFinish = function (values) {
        console.log('Received values from form: ', values);
    };
    var checkPrice = function (_, value) {
        if (value.number > 0) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('Price must be greater than zero!'));
    };
    return (react_1["default"].createElement(antd_1.Form, { name: "customized_form_controls", layout: "inline", onFinish: onFinish, initialValues: {
            price: {
                number: 0,
                currency: 'rmb'
            }
        } },
        react_1["default"].createElement(antd_1.Form.Item, { name: "price", label: "Price", rules: [{ validator: checkPrice }] },
            react_1["default"].createElement(PriceInput, null)),
        react_1["default"].createElement(antd_1.Form.Item, null,
            react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Submit"))));
};
