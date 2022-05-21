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
exports.AntdFormRegister = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var Option = antd_1.Select.Option;
var residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake'
                    },
                ]
            },
        ]
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men'
                    },
                ]
            },
        ]
    },
];
var formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
};
var tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 8
        }
    }
};
exports.AntdFormRegister = function () {
    var form = antd_1.Form.useForm()[0];
    var onFinish = function (values) {
        console.log('Received values of form: ', values);
    };
    var prefixSelector = (react_1["default"].createElement(antd_1.Form.Item, { name: "prefix", noStyle: true },
        react_1["default"].createElement(antd_1.Select, { style: { width: 70 } },
            react_1["default"].createElement(Option, { value: "86" }, "+86"),
            react_1["default"].createElement(Option, { value: "87" }, "+87"))));
    var suffixSelector = (react_1["default"].createElement(antd_1.Form.Item, { name: "suffix", noStyle: true },
        react_1["default"].createElement(antd_1.Select, { style: { width: 70 } },
            react_1["default"].createElement(Option, { value: "USD" }, "$"),
            react_1["default"].createElement(Option, { value: "CNY" }, "\u00A5"))));
    var _a = react_1.useState([]), autoCompleteResult = _a[0], setAutoCompleteResult = _a[1];
    var onWebsiteChange = function (value) {
        if (!value) {
            setAutoCompleteResult([]);
        }
        else {
            setAutoCompleteResult(['.com', '.org', '.net'].map(function (domain) { return "" + value + domain; }));
        }
    };
    var websiteOptions = autoCompleteResult.map(function (website) { return ({
        label: website,
        value: website
    }); });
    return (react_1["default"].createElement(antd_1.Form, __assign({}, formItemLayout, { form: form, name: "register", onFinish: onFinish, initialValues: {
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86'
        }, scrollToFirstError: true }),
        react_1["default"].createElement(antd_1.Form.Item, { name: "email", label: "E-mail", rules: [
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                },
                {
                    required: true,
                    message: 'Please input your E-mail!'
                },
            ] },
            react_1["default"].createElement(antd_1.Input, null)),
        react_1["default"].createElement(antd_1.Form.Item, { name: "password", label: "Password", rules: [
                {
                    required: true,
                    message: 'Please input your password!'
                },
            ], hasFeedback: true },
            react_1["default"].createElement(antd_1.Input.Password, null)),
        react_1["default"].createElement(antd_1.Form.Item, { name: "confirm", label: "Confirm Password", dependencies: ['password'], hasFeedback: true, rules: [
                {
                    required: true,
                    message: 'Please confirm your password!'
                },
                function (_a) {
                    var getFieldValue = _a.getFieldValue;
                    return ({
                        validator: function (_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        }
                    });
                },
            ] },
            react_1["default"].createElement(antd_1.Input.Password, null)),
        react_1["default"].createElement(antd_1.Form.Item, { name: "nickname", label: "Nickname", tooltip: "What do you want others to call you?", rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }] },
            react_1["default"].createElement(antd_1.Input, null)),
        react_1["default"].createElement(antd_1.Form.Item, { name: "residence", label: "Habitual Residence", rules: [
                { type: 'array', required: true, message: 'Please select your habitual residence!' },
            ] },
            react_1["default"].createElement(antd_1.Cascader, { options: residences })),
        react_1["default"].createElement(antd_1.Form.Item, { name: "phone", label: "Phone Number", rules: [{ required: true, message: 'Please input your phone number!' }] },
            react_1["default"].createElement(antd_1.Input, { addonBefore: prefixSelector, style: { width: '100%' } })),
        react_1["default"].createElement(antd_1.Form.Item, { name: "donation", label: "Donation", rules: [{ required: true, message: 'Please input donation amount!' }] },
            react_1["default"].createElement(antd_1.InputNumber, { addonAfter: suffixSelector, style: { width: '100%' } })),
        react_1["default"].createElement(antd_1.Form.Item, { name: "website", label: "Website", rules: [{ required: true, message: 'Please input website!' }] },
            react_1["default"].createElement(antd_1.AutoComplete, { options: websiteOptions, onChange: onWebsiteChange, placeholder: "website" },
                react_1["default"].createElement(antd_1.Input, null))),
        react_1["default"].createElement(antd_1.Form.Item, { name: "intro", label: "Intro", rules: [{ required: true, message: 'Please input Intro' }] },
            react_1["default"].createElement(antd_1.Input.TextArea, { showCount: true, maxLength: 100 })),
        react_1["default"].createElement(antd_1.Form.Item, { name: "gender", label: "Gender", rules: [{ required: true, message: 'Please select gender!' }] },
            react_1["default"].createElement(antd_1.Select, { placeholder: "select your gender" },
                react_1["default"].createElement(Option, { value: "male" }, "Male"),
                react_1["default"].createElement(Option, { value: "female" }, "Female"),
                react_1["default"].createElement(Option, { value: "other" }, "Other"))),
        react_1["default"].createElement(antd_1.Form.Item, { label: "Captcha", extra: "We must make sure that your are a human." },
            react_1["default"].createElement(antd_1.Row, { gutter: 8 },
                react_1["default"].createElement(antd_1.Col, { span: 12 },
                    react_1["default"].createElement(antd_1.Form.Item, { name: "captcha", noStyle: true, rules: [{ required: true, message: 'Please input the captcha you got!' }] },
                        react_1["default"].createElement(antd_1.Input, null))),
                react_1["default"].createElement(antd_1.Col, { span: 12 },
                    react_1["default"].createElement(antd_1.Button, null, "Get captcha")))),
        react_1["default"].createElement(antd_1.Form.Item, __assign({ name: "agreement", valuePropName: "checked", rules: [
                {
                    validator: function (_, value) {
                        return value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'));
                    }
                },
            ] }, tailFormItemLayout),
            react_1["default"].createElement(antd_1.Checkbox, null,
                "I have read the ",
                react_1["default"].createElement("a", { href: "" }, "agreement"))),
        react_1["default"].createElement(antd_1.Form.Item, __assign({}, tailFormItemLayout),
            react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Register"))));
};
