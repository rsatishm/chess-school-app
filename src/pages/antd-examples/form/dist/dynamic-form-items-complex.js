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
exports.__esModule = true;
exports.AntdFormDynamicFormItemsComplex = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var Option = antd_1.Select.Option;
var areas = [
    { label: 'Beijing', value: 'Beijing' },
    { label: 'Shanghai', value: 'Shanghai' },
];
var sights = {
    Beijing: ['Tiananmen', 'Great Wall'],
    Shanghai: ['Oriental Pearl', 'The Bund']
};
exports.AntdFormDynamicFormItemsComplex = function () {
    var form = antd_1.Form.useForm()[0];
    var onFinish = function (values) {
        console.log('Received values of form:', values);
    };
    var handleChange = function () {
        form.setFieldsValue({ sights: [] });
    };
    return (React.createElement(antd_1.Form, { form: form, name: "dynamic_form_nest_item", onFinish: onFinish, autoComplete: "off" },
        React.createElement(antd_1.Form.Item, { name: "area", label: "Area", rules: [{ required: true, message: 'Missing area' }] },
            React.createElement(antd_1.Select, { options: areas, onChange: handleChange })),
        React.createElement(antd_1.Form.List, { name: "sights" }, function (fields, _a) {
            var add = _a.add, remove = _a.remove;
            return (React.createElement(React.Fragment, null,
                fields.map(function (field) { return (React.createElement(antd_1.Space, { key: field.key, align: "baseline" },
                    React.createElement(antd_1.Form.Item, { noStyle: true, shouldUpdate: function (prevValues, curValues) {
                            return prevValues.area !== curValues.area || prevValues.sights !== curValues.sights;
                        } }, function () { return (React.createElement(antd_1.Form.Item, __assign({}, field, { label: "Sight", name: [field.name, 'sight'], rules: [{ required: true, message: 'Missing sight' }] }),
                        React.createElement(antd_1.Select, { disabled: !form.getFieldValue('area'), style: { width: 130 } }, (sights[form.getFieldValue('area')] || []).map(function (item) { return (React.createElement(Option, { key: item, value: item }, item)); })))); }),
                    React.createElement(antd_1.Form.Item, __assign({}, field, { label: "Price", name: [field.name, 'price'], rules: [{ required: true, message: 'Missing price' }] }),
                        React.createElement(antd_1.Input, null)),
                    React.createElement(icons_1.MinusCircleOutlined, { onClick: function () { return remove(field.name); } }))); }),
                React.createElement(antd_1.Form.Item, null,
                    React.createElement(antd_1.Button, { type: "dashed", onClick: function () { return add(); }, block: true, icon: React.createElement(icons_1.PlusOutlined, null) }, "Add sights"))));
        }),
        React.createElement(antd_1.Form.Item, null,
            React.createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Submit"))));
};
