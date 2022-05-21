"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.AntdFormControlRef = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var Option = antd_1.Select.Option;
var layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};
var tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};
var AntdFormControlRef = /** @class */ (function (_super) {
    __extends(AntdFormControlRef, _super);
    function AntdFormControlRef() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.formRef = react_1["default"].createRef();
        _this.onGenderChange = function (value) {
            switch (value) {
                case 'male':
                    _this.formRef.current.setFieldsValue({ note: 'Hi, man!' });
                    return;
                case 'female':
                    _this.formRef.current.setFieldsValue({ note: 'Hi, lady!' });
                    return;
                case 'other':
                    _this.formRef.current.setFieldsValue({ note: 'Hi there!' });
            }
        };
        _this.onFinish = function (values) {
            console.log(values);
        };
        _this.onReset = function () {
            _this.formRef.current.resetFields();
        };
        _this.onFill = function () {
            _this.formRef.current.setFieldsValue({
                note: 'Hello world!',
                gender: 'male'
            });
        };
        return _this;
    }
    AntdFormControlRef.prototype.render = function () {
        return (react_1["default"].createElement(antd_1.Form, __assign({}, layout, { ref: this.formRef, name: "control-ref", onFinish: this.onFinish }),
            react_1["default"].createElement(antd_1.Form.Item, { name: "note", label: "Note", rules: [{ required: true }] },
                react_1["default"].createElement(antd_1.Input, null)),
            react_1["default"].createElement(antd_1.Form.Item, { name: "gender", label: "Gender", rules: [{ required: true }] },
                react_1["default"].createElement(antd_1.Select, { placeholder: "Select a option and change input text above", onChange: this.onGenderChange, allowClear: true },
                    react_1["default"].createElement(Option, { value: "male" }, "male"),
                    react_1["default"].createElement(Option, { value: "female" }, "female"),
                    react_1["default"].createElement(Option, { value: "other" }, "other"))),
            react_1["default"].createElement(antd_1.Form.Item, { noStyle: true, shouldUpdate: function (prevValues, currentValues) { return prevValues.gender !== currentValues.gender; } }, function (_a) {
                var getFieldValue = _a.getFieldValue;
                return getFieldValue('gender') === 'other' ? (react_1["default"].createElement(antd_1.Form.Item, { name: "customizeGender", label: "Customize Gender", rules: [{ required: true }] },
                    react_1["default"].createElement(antd_1.Input, null))) : null;
            }),
            react_1["default"].createElement(antd_1.Form.Item, __assign({}, tailLayout),
                react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Submit"),
                react_1["default"].createElement(antd_1.Button, { htmlType: "button", onClick: this.onReset }, "Reset"),
                react_1["default"].createElement(antd_1.Button, { type: "link", htmlType: "button", onClick: this.onFill }, "Fill form"))));
    };
    return AntdFormControlRef;
}(react_1["default"].Component));
exports.AntdFormControlRef = AntdFormControlRef;
