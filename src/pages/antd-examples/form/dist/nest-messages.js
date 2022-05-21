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
exports.AntdFormNestMessages = void 0;
var antd_1 = require("antd");
var layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};
/* eslint-disable no-template-curly-in-string */
var validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!'
    },
    number: {
        range: '${label} must be between ${min} and ${max}'
    }
};
/* eslint-enable no-template-curly-in-string */
exports.AntdFormNestMessages = function () {
    var onFinish = function (values) {
        console.log(values);
    };
    return (React.createElement(antd_1.Form, __assign({}, layout, { name: "nest-messages", onFinish: onFinish, validateMessages: validateMessages }),
        React.createElement(antd_1.Form.Item, { name: ['user', 'name'], label: "Name", rules: [{ required: true }] },
            React.createElement(antd_1.Input, null)),
        React.createElement(antd_1.Form.Item, { name: ['user', 'email'], label: "Email", rules: [{ type: 'email' }] },
            React.createElement(antd_1.Input, null)),
        React.createElement(antd_1.Form.Item, { name: ['user', 'age'], label: "Age", rules: [{ type: 'number', min: 0, max: 99 }] },
            React.createElement(antd_1.InputNumber, null)),
        React.createElement(antd_1.Form.Item, { name: ['user', 'website'], label: "Website" },
            React.createElement(antd_1.Input, null)),
        React.createElement(antd_1.Form.Item, { name: ['user', 'introduction'], label: "Introduction" },
            React.createElement(antd_1.Input.TextArea, null)),
        React.createElement(antd_1.Form.Item, { wrapperCol: __assign(__assign({}, layout.wrapperCol), { offset: 8 }) },
            React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Submit"))));
};
