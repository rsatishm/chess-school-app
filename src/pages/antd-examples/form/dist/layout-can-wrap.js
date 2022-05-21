"use strict";
exports.__esModule = true;
exports.AntdFormLayoutCanWrap = void 0;
var antd_1 = require("antd");
exports.AntdFormLayoutCanWrap = function () { return (React.createElement(antd_1.Form, { name: "wrap", labelCol: { flex: '110px' }, labelAlign: "left", labelWrap: true, wrapperCol: { flex: 1 }, colon: false },
    React.createElement(antd_1.Form.Item, { label: "\u6B63\u5E38\u6807\u7B7E\u6587\u6848", name: "username", rules: [{ required: true }] },
        React.createElement(antd_1.Input, null)),
    React.createElement(antd_1.Form.Item, { label: "\u8D85\u957F\u6807\u7B7E\u6587\u6848\u8D85\u957F\u6807\u7B7E\u6587\u6848", name: "password", rules: [{ required: true }] },
        React.createElement(antd_1.Input, null)),
    React.createElement(antd_1.Form.Item, { label: " " },
        React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Submit")))); };
