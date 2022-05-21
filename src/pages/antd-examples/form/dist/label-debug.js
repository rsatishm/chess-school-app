"use strict";
exports.__esModule = true;
exports.AntdFormLabelDebug = void 0;
var antd_1 = require("antd");
exports.AntdFormLabelDebug = function () { return (React.createElement(antd_1.Form, { name: "label-ellipsis", labelCol: { span: 8 }, wrapperCol: { span: 16 } },
    React.createElement(antd_1.Form.Item, { label: React.createElement(antd_1.Typography.Text, { ellipsis: true }, "longtextlongtextlongtextlongtextlongtextlongtextlongtext"), name: "username" },
        React.createElement(antd_1.Input, null)),
    React.createElement(antd_1.Form.Item, { label: React.createElement(antd_1.Typography.Text, { ellipsis: true }, "longtext longtext longtext longtext longtext longtext longtext"), name: "password" },
        React.createElement(antd_1.Input.Password, null)))); };
