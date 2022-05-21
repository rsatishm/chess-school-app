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
exports.AntdFormLayout = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
exports.AntdFormLayout = function () {
    var form = antd_1.Form.useForm()[0];
    var _a = react_1.useState('horizontal'), formLayout = _a[0], setFormLayout = _a[1];
    var onFormLayoutChange = function (_a) {
        var layout = _a.layout;
        setFormLayout(layout);
    };
    var formItemLayout = formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
        }
        : null;
    var buttonItemLayout = formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 }
        }
        : null;
    return (react_1["default"].createElement(antd_1.Form, __assign({}, formItemLayout, { layout: formLayout, form: form, initialValues: { layout: formLayout }, onValuesChange: onFormLayoutChange }),
        react_1["default"].createElement(antd_1.Form.Item, { label: "Form Layout", name: "layout" },
            react_1["default"].createElement(antd_1.Radio.Group, { value: formLayout },
                react_1["default"].createElement(antd_1.Radio.Button, { value: "horizontal" }, "Horizontal"),
                react_1["default"].createElement(antd_1.Radio.Button, { value: "vertical" }, "Vertical"),
                react_1["default"].createElement(antd_1.Radio.Button, { value: "inline" }, "Inline"))),
        react_1["default"].createElement(antd_1.Form.Item, { label: "Field A" },
            react_1["default"].createElement(antd_1.Input, { placeholder: "input placeholder" })),
        react_1["default"].createElement(antd_1.Form.Item, { label: "Field B" },
            react_1["default"].createElement(antd_1.Input, { placeholder: "input placeholder" })),
        react_1["default"].createElement(antd_1.Form.Item, __assign({}, buttonItemLayout),
            react_1["default"].createElement(antd_1.Button, { type: "primary" }, "Submit"))));
};
