"use strict";
exports.__esModule = true;
exports.AntdFormCol24Debug = void 0;
var antd_1 = require("antd");
exports.AntdFormCol24Debug = function () {
    var onFinish = function (values) {
        console.log('Success:', values);
    };
    var onFinishFailed = function (errorInfo) {
        console.log('Failed:', errorInfo);
    };
    return (React.createElement(antd_1.Form, { name: "basic", labelCol: { span: 24 }, wrapperCol: { span: 24 }, initialValues: { remember: true }, onFinish: onFinish, onFinishFailed: onFinishFailed, autoComplete: "off" },
        React.createElement(antd_1.Form.Item, { label: "Username", name: "username", rules: [{ required: true, message: 'Please input your username!' }] },
            React.createElement(antd_1.Input, null)),
        React.createElement(antd_1.Form.Item, { label: "Password", name: "password", rules: [{ required: true, message: 'Please input your password!' }] },
            React.createElement(antd_1.Input.Password, null)),
        React.createElement(antd_1.Form.Item, null,
            React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Submit"))));
};
