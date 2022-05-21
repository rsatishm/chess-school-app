"use strict";
exports.__esModule = true;
exports.AntdFormSize = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
exports.AntdFormSize = function () {
    var _a = react_1.useState('default'), componentSize = _a[0], setComponentSize = _a[1];
    var onFormLayoutChange = function (_a) {
        var size = _a.size;
        setComponentSize(size);
    };
    return (react_1["default"].createElement(antd_1.Form, { labelCol: { span: 4 }, wrapperCol: { span: 14 }, layout: "horizontal", initialValues: { size: componentSize }, onValuesChange: onFormLayoutChange, size: componentSize },
        react_1["default"].createElement(antd_1.Form.Item, { label: "Form Size", name: "size" },
            react_1["default"].createElement(antd_1.Radio.Group, null,
                react_1["default"].createElement(antd_1.Radio.Button, { value: "small" }, "Small"),
                react_1["default"].createElement(antd_1.Radio.Button, { value: "default" }, "Default"),
                react_1["default"].createElement(antd_1.Radio.Button, { value: "large" }, "Large"))),
        react_1["default"].createElement(antd_1.Form.Item, { label: "Input" },
            react_1["default"].createElement(antd_1.Input, null)),
        react_1["default"].createElement(antd_1.Form.Item, { label: "Select" },
            react_1["default"].createElement(antd_1.Select, null,
                react_1["default"].createElement(antd_1.Select.Option, { value: "demo" }, "Demo"))),
        react_1["default"].createElement(antd_1.Form.Item, { label: "TreeSelect" },
            react_1["default"].createElement(antd_1.TreeSelect, { treeData: [
                    { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
                ] })),
        react_1["default"].createElement(antd_1.Form.Item, { label: "Cascader" },
            react_1["default"].createElement(antd_1.Cascader, { options: [
                    {
                        value: 'zhejiang',
                        label: 'Zhejiang',
                        children: [
                            {
                                value: 'hangzhou',
                                label: 'Hangzhou'
                            },
                        ]
                    },
                ] })),
        react_1["default"].createElement(antd_1.Form.Item, { label: "DatePicker" },
            react_1["default"].createElement(antd_1.DatePicker, null)),
        react_1["default"].createElement(antd_1.Form.Item, { label: "InputNumber" },
            react_1["default"].createElement(antd_1.InputNumber, null)),
        react_1["default"].createElement(antd_1.Form.Item, { label: "Switch", valuePropName: "checked" },
            react_1["default"].createElement(antd_1.Switch, null)),
        react_1["default"].createElement(antd_1.Form.Item, { label: "Button" },
            react_1["default"].createElement(antd_1.Button, null, "Button"))));
};
