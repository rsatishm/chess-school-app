"use strict";
exports.__esModule = true;
exports.AntdFormNormalLogin = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
exports.AntdFormNormalLogin = function () {
    var onFinish = function (values) {
        console.log('Received values of form: ', values);
    };
    return (React.createElement(antd_1.Form, { name: "normal_login", className: "login-form", initialValues: { remember: true }, onFinish: onFinish },
        React.createElement(antd_1.Form.Item, { name: "username", rules: [{ required: true, message: 'Please input your Username!' }] },
            React.createElement(antd_1.Input, { prefix: React.createElement(icons_1.UserOutlined, { className: "site-form-item-icon" }), placeholder: "Username" })),
        React.createElement(antd_1.Form.Item, { name: "password", rules: [{ required: true, message: 'Please input your Password!' }] },
            React.createElement(antd_1.Input, { prefix: React.createElement(icons_1.LockOutlined, { className: "site-form-item-icon" }), type: "password", placeholder: "Password" })),
        React.createElement(antd_1.Form.Item, null,
            React.createElement(antd_1.Form.Item, { name: "remember", valuePropName: "checked", noStyle: true },
                React.createElement(antd_1.Checkbox, null, "Remember me")),
            React.createElement("a", { className: "login-form-forgot", href: "" }, "Forgot password")),
        React.createElement(antd_1.Form.Item, null,
            React.createElement(antd_1.Button, { type: "primary", htmlType: "submit", className: "login-form-button" }, "Log in"),
            "Or ",
            React.createElement("a", { href: "" }, "register now!"))));
};
