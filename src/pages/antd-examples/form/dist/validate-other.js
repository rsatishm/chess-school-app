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
exports.AntdFormValidateOther = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var Option = antd_1.Select.Option;
var formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
};
var normFile = function (e) {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
        return e;
    }
    return e && e.fileList;
};
exports.AntdFormValidateOther = function () {
    var onFinish = function (values) {
        console.log('Received values of form: ', values);
    };
    return (React.createElement(antd_1.Form, __assign({ name: "validate_other" }, formItemLayout, { onFinish: onFinish, initialValues: {
            'input-number': 3,
            'checkbox-group': ['A', 'B'],
            rate: 3.5
        } }),
        React.createElement(antd_1.Form.Item, { label: "Plain Text" },
            React.createElement("span", { className: "ant-form-text" }, "China")),
        React.createElement(antd_1.Form.Item, { name: "select", label: "Select", hasFeedback: true, rules: [{ required: true, message: 'Please select your country!' }] },
            React.createElement(antd_1.Select, { placeholder: "Please select a country" },
                React.createElement(Option, { value: "china" }, "China"),
                React.createElement(Option, { value: "usa" }, "U.S.A"))),
        React.createElement(antd_1.Form.Item, { name: "select-multiple", label: "Select[multiple]", rules: [{ required: true, message: 'Please select your favourite colors!', type: 'array' }] },
            React.createElement(antd_1.Select, { mode: "multiple", placeholder: "Please select favourite colors" },
                React.createElement(Option, { value: "red" }, "Red"),
                React.createElement(Option, { value: "green" }, "Green"),
                React.createElement(Option, { value: "blue" }, "Blue"))),
        React.createElement(antd_1.Form.Item, { label: "InputNumber" },
            React.createElement(antd_1.Form.Item, { name: "input-number", noStyle: true },
                React.createElement(antd_1.InputNumber, { min: 1, max: 10 })),
            React.createElement("span", { className: "ant-form-text" }, " machines")),
        React.createElement(antd_1.Form.Item, { name: "switch", label: "Switch", valuePropName: "checked" },
            React.createElement(antd_1.Switch, null)),
        React.createElement(antd_1.Form.Item, { name: "slider", label: "Slider" },
            React.createElement(antd_1.Slider, { marks: {
                    0: 'A',
                    20: 'B',
                    40: 'C',
                    60: 'D',
                    80: 'E',
                    100: 'F'
                } })),
        React.createElement(antd_1.Form.Item, { name: "radio-group", label: "Radio.Group" },
            React.createElement(antd_1.Radio.Group, null,
                React.createElement(antd_1.Radio, { value: "a" }, "item 1"),
                React.createElement(antd_1.Radio, { value: "b" }, "item 2"),
                React.createElement(antd_1.Radio, { value: "c" }, "item 3"))),
        React.createElement(antd_1.Form.Item, { name: "radio-button", label: "Radio.Button", rules: [{ required: true, message: 'Please pick an item!' }] },
            React.createElement(antd_1.Radio.Group, null,
                React.createElement(antd_1.Radio.Button, { value: "a" }, "item 1"),
                React.createElement(antd_1.Radio.Button, { value: "b" }, "item 2"),
                React.createElement(antd_1.Radio.Button, { value: "c" }, "item 3"))),
        React.createElement(antd_1.Form.Item, { name: "checkbox-group", label: "Checkbox.Group" },
            React.createElement(antd_1.Checkbox.Group, null,
                React.createElement(antd_1.Row, null,
                    React.createElement(antd_1.Col, { span: 8 },
                        React.createElement(antd_1.Checkbox, { value: "A", style: { lineHeight: '32px' } }, "A")),
                    React.createElement(antd_1.Col, { span: 8 },
                        React.createElement(antd_1.Checkbox, { value: "B", style: { lineHeight: '32px' }, disabled: true }, "B")),
                    React.createElement(antd_1.Col, { span: 8 },
                        React.createElement(antd_1.Checkbox, { value: "C", style: { lineHeight: '32px' } }, "C")),
                    React.createElement(antd_1.Col, { span: 8 },
                        React.createElement(antd_1.Checkbox, { value: "D", style: { lineHeight: '32px' } }, "D")),
                    React.createElement(antd_1.Col, { span: 8 },
                        React.createElement(antd_1.Checkbox, { value: "E", style: { lineHeight: '32px' } }, "E")),
                    React.createElement(antd_1.Col, { span: 8 },
                        React.createElement(antd_1.Checkbox, { value: "F", style: { lineHeight: '32px' } }, "F"))))),
        React.createElement(antd_1.Form.Item, { name: "rate", label: "Rate" },
            React.createElement(antd_1.Rate, null)),
        React.createElement(antd_1.Form.Item, { name: "upload", label: "Upload", valuePropName: "fileList", getValueFromEvent: normFile, extra: "longgggggggggggggggggggggggggggggggggg" },
            React.createElement(antd_1.Upload, { name: "logo", action: "/upload.do", listType: "picture" },
                React.createElement(antd_1.Button, { icon: React.createElement(icons_1.UploadOutlined, null) }, "Click to upload"))),
        React.createElement(antd_1.Form.Item, { label: "Dragger" },
            React.createElement(antd_1.Form.Item, { name: "dragger", valuePropName: "fileList", getValueFromEvent: normFile, noStyle: true },
                React.createElement(antd_1.Upload.Dragger, { name: "files", action: "/upload.do" },
                    React.createElement("p", { className: "ant-upload-drag-icon" },
                        React.createElement(icons_1.InboxOutlined, null)),
                    React.createElement("p", { className: "ant-upload-text" }, "Click or drag file to this area to upload"),
                    React.createElement("p", { className: "ant-upload-hint" }, "Support for a single or bulk upload.")))),
        React.createElement(antd_1.Form.Item, { wrapperCol: { span: 12, offset: 6 } },
            React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Submit"))));
};
