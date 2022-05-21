"use strict";
exports.__esModule = true;
exports.AntdFormWarningOnly = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
exports.AntdFormWarningOnly = function () {
    var form = antd_1.Form.useForm()[0];
    var onFinish = function () {
        antd_1.message.success('Submit success!');
    };
    var onFinishFailed = function () {
        antd_1.message.error('Submit failed!');
    };
    var onFill = function () {
        form.setFieldsValue({
            url: 'https://taobao.com/'
        });
    };
    return (react_1["default"].createElement(antd_1.Form, { form: form, layout: "vertical", onFinish: onFinish, onFinishFailed: onFinishFailed, autoComplete: "off" },
        react_1["default"].createElement(antd_1.Form.Item, { name: "url", label: "URL", rules: [{ required: true }, { type: 'url', warningOnly: true }, { type: 'string', min: 6 }] },
            react_1["default"].createElement(antd_1.Input, { placeholder: "input placeholder" })),
        react_1["default"].createElement(antd_1.Form.Item, null,
            react_1["default"].createElement(antd_1.Space, null,
                react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Submit"),
                react_1["default"].createElement(antd_1.Button, { htmlType: "button", onClick: onFill }, "Fill")))));
};
