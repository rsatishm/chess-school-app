"use strict";
exports.__esModule = true;
exports.AntdFormComplexFormControl = void 0;
var antd_1 = require("antd");
var Option = antd_1.Select.Option;
exports.AntdFormComplexFormControl = function () {
    var onFinish = function (values) {
        console.log('Received values of form: ', values);
    };
    return (React.createElement(antd_1.Form, { name: "complex-form", onFinish: onFinish, labelCol: { span: 8 }, wrapperCol: { span: 16 } },
        React.createElement(antd_1.Form.Item, { label: "Username" },
            React.createElement(antd_1.Space, null,
                React.createElement(antd_1.Form.Item, { name: "username", noStyle: true, rules: [{ required: true, message: 'Username is required' }] },
                    React.createElement(antd_1.Input, { style: { width: 160 }, placeholder: "Please input" })),
                React.createElement(antd_1.Tooltip, { title: "Useful information" },
                    React.createElement(antd_1.Typography.Link, { href: "#API" }, "Need Help?")))),
        React.createElement(antd_1.Form.Item, { label: "Address" },
            React.createElement(antd_1.Input.Group, { compact: true },
                React.createElement(antd_1.Form.Item, { name: ['address', 'province'], noStyle: true, rules: [{ required: true, message: 'Province is required' }] },
                    React.createElement(antd_1.Select, { placeholder: "Select province" },
                        React.createElement(Option, { value: "Zhejiang" }, "Zhejiang"),
                        React.createElement(Option, { value: "Jiangsu" }, "Jiangsu"))),
                React.createElement(antd_1.Form.Item, { name: ['address', 'street'], noStyle: true, rules: [{ required: true, message: 'Street is required' }] },
                    React.createElement(antd_1.Input, { style: { width: '50%' }, placeholder: "Input street" })))),
        React.createElement(antd_1.Form.Item, { label: "BirthDate", style: { marginBottom: 0 } },
            React.createElement(antd_1.Form.Item, { name: "year", rules: [{ required: true }], style: { display: 'inline-block', width: 'calc(50% - 8px)' } },
                React.createElement(antd_1.Input, { placeholder: "Input birth year" })),
            React.createElement(antd_1.Form.Item, { name: "month", rules: [{ required: true }], style: { display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' } },
                React.createElement(antd_1.Input, { placeholder: "Input birth month" }))),
        React.createElement(antd_1.Form.Item, { label: " ", colon: false },
            React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Submit"))));
};
