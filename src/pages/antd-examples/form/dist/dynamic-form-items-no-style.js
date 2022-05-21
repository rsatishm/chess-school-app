"use strict";
exports.__esModule = true;
exports.AntdFormDynamicFormItemsNoStyle = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
exports.AntdFormDynamicFormItemsNoStyle = function () {
    var onFinish = function (values) {
        console.log('Received values of form:', values);
    };
    return (React.createElement(antd_1.Form, { name: "dynamic_form_nest_item", onFinish: onFinish, autoComplete: "off" },
        React.createElement(antd_1.Form.Item, { label: "Users" },
            React.createElement(antd_1.Form.List, { name: "users" }, function (fields, _a) {
                var add = _a.add, remove = _a.remove;
                return (React.createElement(React.Fragment, null,
                    fields.map(function (field) { return (React.createElement(antd_1.Space, { key: field.key, style: { marginBottom: 16 } },
                        React.createElement(antd_1.Form.Item, { noStyle: true, name: [field.name, 'lastName'], rules: [{ required: true }] },
                            React.createElement(antd_1.Input, { placeholder: "Last Name" })),
                        React.createElement(antd_1.Form.Item, { noStyle: true, name: [field.name, 'firstName'], rules: [{ required: true }] },
                            React.createElement(antd_1.Input, { placeholder: "First Name" })),
                        React.createElement(icons_1.MinusCircleOutlined, { onClick: function () {
                                remove(field.name);
                            } }))); }),
                    React.createElement(antd_1.Form.Item, null,
                        React.createElement(antd_1.Button, { type: "dashed", onClick: function () { return add(); }, block: true, icon: React.createElement(icons_1.PlusOutlined, null) }, "Add field"))));
            })),
        React.createElement(antd_1.Form.Item, null,
            React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Submit"))));
};
