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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.AntdFormDynamicFormItems = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
exports.AntdFormDynamicFormItems = function () {
    var onFinish = function (values) {
        console.log('Received values of form:', values);
    };
    return (React.createElement(antd_1.Form, { name: "dynamic_form_nest_item", onFinish: onFinish, autoComplete: "off" },
        React.createElement(antd_1.Form.List, { name: "users" }, function (fields, _a) {
            var add = _a.add, remove = _a.remove;
            return (React.createElement(React.Fragment, null,
                fields.map(function (_a) {
                    var key = _a.key, name = _a.name, restField = __rest(_a, ["key", "name"]);
                    return (React.createElement(antd_1.Space, { key: key, style: { display: 'flex', marginBottom: 8 }, align: "baseline" },
                        React.createElement(antd_1.Form.Item, __assign({}, restField, { name: [name, 'first'], rules: [{ required: true, message: 'Missing first name' }] }),
                            React.createElement(antd_1.Input, { placeholder: "First Name" })),
                        React.createElement(antd_1.Form.Item, __assign({}, restField, { name: [name, 'last'], rules: [{ required: true, message: 'Missing last name' }] }),
                            React.createElement(antd_1.Input, { placeholder: "Last Name" })),
                        React.createElement(icons_1.MinusCircleOutlined, { onClick: function () { return remove(name); } })));
                }),
                React.createElement(antd_1.Form.Item, null,
                    React.createElement(antd_1.Button, { type: "dashed", onClick: function () { return add(); }, block: true, icon: React.createElement(icons_1.PlusOutlined, null) }, "Add field"))));
        }),
        React.createElement(antd_1.Form.Item, null,
            React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Submit"))));
};
