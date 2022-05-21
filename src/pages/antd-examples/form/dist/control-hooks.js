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
exports.AntdFormControlHooks = void 0;
var antd_1 = require("antd");
var Option = antd_1.Select.Option;
var layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};
var tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};
exports.AntdFormControlHooks = function () {
    var form = antd_1.Form.useForm()[0];
    var onGenderChange = function (value) {
        switch (value) {
            case 'male':
                form.setFieldsValue({ note: 'Hi, man!' });
                return;
            case 'female':
                form.setFieldsValue({ note: 'Hi, lady!' });
                return;
            case 'other':
                form.setFieldsValue({ note: 'Hi there!' });
        }
    };
    var onFinish = function (values) {
        console.log(values);
    };
    var onReset = function () {
        form.resetFields();
    };
    var onFill = function () {
        form.setFieldsValue({
            note: 'Hello world!',
            gender: 'male'
        });
    };
    return (React.createElement(antd_1.Form, __assign({}, layout, { form: form, name: "control-hooks", onFinish: onFinish }),
        React.createElement(antd_1.Form.Item, { name: "note", label: "Note", rules: [{ required: true }] },
            React.createElement(antd_1.Input, null)),
        React.createElement(antd_1.Form.Item, { name: "gender", label: "Gender", rules: [{ required: true }] },
            React.createElement(antd_1.Select, { placeholder: "Select a option and change input text above", onChange: onGenderChange, allowClear: true },
                React.createElement(Option, { value: "male" }, "male"),
                React.createElement(Option, { value: "female" }, "female"),
                React.createElement(Option, { value: "other" }, "other"))),
        React.createElement(antd_1.Form.Item, { noStyle: true, shouldUpdate: function (prevValues, currentValues) { return prevValues.gender !== currentValues.gender; } }, function (_a) {
            var getFieldValue = _a.getFieldValue;
            return getFieldValue('gender') === 'other' ? (React.createElement(antd_1.Form.Item, { name: "customizeGender", label: "Customize Gender", rules: [{ required: true }] },
                React.createElement(antd_1.Input, null))) : null;
        }),
        React.createElement(antd_1.Form.Item, __assign({}, tailLayout),
            React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Submit"),
            React.createElement(antd_1.Button, { htmlType: "button", onClick: onReset }, "Reset"),
            React.createElement(antd_1.Button, { type: "link", htmlType: "button", onClick: onFill }, "Fill form"))));
};
