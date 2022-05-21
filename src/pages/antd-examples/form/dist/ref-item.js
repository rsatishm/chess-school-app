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
exports.AntdFormRefItem = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
exports.AntdFormRefItem = function () {
    var form = antd_1.Form.useForm()[0];
    var ref = react_1["default"].useRef();
    return (react_1["default"].createElement(antd_1.Form, { form: form, initialValues: { list: ['light'] } },
        react_1["default"].createElement(antd_1.Form.Item, { name: "test", label: "test" },
            react_1["default"].createElement(antd_1.Input, { ref: ref })),
        react_1["default"].createElement(antd_1.Form.List, { name: "list" }, function (fields) {
            return fields.map(function (field) { return (react_1["default"].createElement(antd_1.Form.Item, __assign({ key: field.key }, field),
                react_1["default"].createElement(antd_1.Input, { ref: ref }))); });
        }),
        react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: function () {
                form.getFieldInstance('test').focus();
            } }, "Focus Form.Item"),
        react_1["default"].createElement(antd_1.Button, { onClick: function () {
                form.getFieldInstance(['list', 0]).focus();
            } }, "Focus Form.List")));
};
