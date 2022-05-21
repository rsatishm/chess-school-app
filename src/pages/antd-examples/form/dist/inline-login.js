"use strict";
exports.__esModule = true;
exports.AntdFormInlineLogin = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
exports.AntdFormInlineLogin = function () {
    var form = antd_1.Form.useForm()[0];
    var _a = react_1.useState({}), forceUpdate = _a[1];
    // To disable submit button at the beginning.
    react_1.useEffect(function () {
        forceUpdate({});
    }, []);
    var onFinish = function (values) {
        console.log('Finish:', values);
    };
    return (react_1["default"].createElement(antd_1.Form, { form: form, name: "horizontal_login", layout: "inline", onFinish: onFinish },
        react_1["default"].createElement(antd_1.Form.Item, { name: "username", rules: [{ required: true, message: 'Please input your username!' }] },
            react_1["default"].createElement(antd_1.Input, { prefix: react_1["default"].createElement(icons_1.UserOutlined, { className: "site-form-item-icon" }), placeholder: "Username" })),
        react_1["default"].createElement(antd_1.Form.Item, { name: "password", rules: [{ required: true, message: 'Please input your password!' }] },
            react_1["default"].createElement(antd_1.Input, { prefix: react_1["default"].createElement(icons_1.LockOutlined, { className: "site-form-item-icon" }), type: "password", placeholder: "Password" })),
        react_1["default"].createElement(antd_1.Form.Item, { shouldUpdate: true }, function () { return (react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit", disabled: !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(function (_a) {
                    var errors = _a.errors;
                    return errors.length;
                }).length }, "Log in")); })));
};
