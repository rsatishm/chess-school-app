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
exports.AntdFormValidateStatic = void 0;
var icons_1 = require("@ant-design/icons");
var antd_1 = require("antd");
var Option = antd_1.Select.Option;
var formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 }
    }
};
exports.AntdFormValidateStatic = function () { return React.createElement(antd_1.Form, __assign({}, formItemLayout),
    React.createElement(antd_1.Form.Item, { label: "Fail", validateStatus: "error", help: "Should be combination of numbers & alphabets" },
        React.createElement(antd_1.Input, { placeholder: "unavailable choice", id: "error" })),
    React.createElement(antd_1.Form.Item, { label: "Warning", validateStatus: "warning" },
        React.createElement(antd_1.Input, { placeholder: "Warning", id: "warning", prefix: React.createElement(icons_1.SmileOutlined, null) })),
    React.createElement(antd_1.Form.Item, { label: "Validating", hasFeedback: true, validateStatus: "validating", help: "The information is being validated..." },
        React.createElement(antd_1.Input, { placeholder: "I'm the content is being validated", id: "validating" })),
    React.createElement(antd_1.Form.Item, { label: "Success", hasFeedback: true, validateStatus: "success" },
        React.createElement(antd_1.Input, { placeholder: "I'm the content", id: "success" })),
    React.createElement(antd_1.Form.Item, { label: "Warning", hasFeedback: true, validateStatus: "warning" },
        React.createElement(antd_1.Input, { placeholder: "Warning", id: "warning2" })),
    React.createElement(antd_1.Form.Item, { label: "Fail", hasFeedback: true, validateStatus: "error", help: "Should be combination of numbers & alphabets" },
        React.createElement(antd_1.Input, { placeholder: "unavailable choice", id: "error2" })),
    React.createElement(antd_1.Form.Item, { label: "Success", hasFeedback: true, validateStatus: "success" },
        React.createElement(antd_1.DatePicker, { style: { width: '100%' } })),
    React.createElement(antd_1.Form.Item, { label: "Warning", hasFeedback: true, validateStatus: "warning" },
        React.createElement(antd_1.TimePicker, { style: { width: '100%' } })),
    React.createElement(antd_1.Form.Item, { label: "Error", hasFeedback: true, validateStatus: "error" },
        React.createElement(antd_1.DatePicker.RangePicker, { style: { width: '100%' } })),
    React.createElement(antd_1.Form.Item, { label: "Error", hasFeedback: true, validateStatus: "error" },
        React.createElement(antd_1.Select, { placeholder: "I'm Select", allowClear: true },
            React.createElement(Option, { value: "1" }, "Option 1"),
            React.createElement(Option, { value: "2" }, "Option 2"),
            React.createElement(Option, { value: "3" }, "Option 3"))),
    React.createElement(antd_1.Form.Item, { label: "Validating", hasFeedback: true, validateStatus: "error", help: "Something breaks the rule." },
        React.createElement(antd_1.Cascader, { placeholder: "I'm Cascader", options: [{ value: 'xx', label: 'xx' }], allowClear: true })),
    React.createElement(antd_1.Form.Item, { label: "Warning", hasFeedback: true, validateStatus: "warning", help: "Need to be checked" },
        React.createElement(antd_1.TreeSelect, { placeholder: "I'm TreeSelect", treeData: [{ value: 'xx', label: 'xx' }], allowClear: true })),
    React.createElement(antd_1.Form.Item, { label: "inline", style: { marginBottom: 0 } },
        React.createElement(antd_1.Form.Item, { validateStatus: "error", help: "Please select right date", style: { display: 'inline-block', width: 'calc(50% - 12px)' } },
            React.createElement(antd_1.DatePicker, null)),
        React.createElement("span", { style: { display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center' } }, "-"),
        React.createElement(antd_1.Form.Item, { style: { display: 'inline-block', width: 'calc(50% - 12px)' } },
            React.createElement(antd_1.DatePicker, null))),
    React.createElement(antd_1.Form.Item, { label: "Success", hasFeedback: true, validateStatus: "success" },
        React.createElement(antd_1.InputNumber, { style: { width: '100%' } })),
    React.createElement(antd_1.Form.Item, { label: "Success", hasFeedback: true, validateStatus: "success" },
        React.createElement(antd_1.Input, { allowClear: true, placeholder: "with allowClear" })),
    React.createElement(antd_1.Form.Item, { label: "Warning", hasFeedback: true, validateStatus: "warning" },
        React.createElement(antd_1.Input.Password, { placeholder: "with input password" })),
    React.createElement(antd_1.Form.Item, { label: "Error", hasFeedback: true, validateStatus: "error" },
        React.createElement(antd_1.Input.Password, { allowClear: true, placeholder: "with input password and allowClear" })),
    React.createElement(antd_1.Form.Item, { label: "Fail", validateStatus: "error", hasFeedback: true },
        React.createElement(antd_1.Mentions, null)),
    React.createElement(antd_1.Form.Item, { label: "Fail", validateStatus: "error", hasFeedback: true, help: "Should have something" },
        React.createElement(antd_1.Input.TextArea, { allowClear: true, showCount: true }))); };
