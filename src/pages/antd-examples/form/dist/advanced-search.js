"use strict";
exports.__esModule = true;
exports.AntdFormAdavancedSearch = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var Option = antd_1.Select.Option;
var AdvancedSearchForm = function () {
    var _a = react_1.useState(false), expand = _a[0], setExpand = _a[1];
    var form = antd_1.Form.useForm()[0];
    var getFields = function () {
        var count = expand ? 10 : 6;
        var children = [];
        for (var i = 0; i < count; i++) {
            children.push(react_1["default"].createElement(antd_1.Col, { span: 8, key: i },
                react_1["default"].createElement(antd_1.Form.Item, { name: "field-" + i, label: "Field " + i, rules: [
                        {
                            required: true,
                            message: 'Input something!'
                        },
                    ] }, i % 3 !== 1 ? (react_1["default"].createElement(antd_1.Input, { placeholder: "placeholder" })) : (react_1["default"].createElement(antd_1.Select, { defaultValue: "2" },
                    react_1["default"].createElement(Option, { value: "1" }, "1"),
                    react_1["default"].createElement(Option, { value: "2" }, "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong"))))));
        }
        return children;
    };
    var onFinish = function (values) {
        console.log('Received values of form: ', values);
    };
    return (react_1["default"].createElement(antd_1.Form, { form: form, name: "advanced_search", className: "ant-advanced-search-form", onFinish: onFinish },
        react_1["default"].createElement(antd_1.Row, { gutter: 24 }, getFields()),
        react_1["default"].createElement(antd_1.Row, null,
            react_1["default"].createElement(antd_1.Col, { span: 24, style: { textAlign: 'right' } },
                react_1["default"].createElement(antd_1.Button, { type: "primary", htmlType: "submit" }, "Search"),
                react_1["default"].createElement(antd_1.Button, { style: { margin: '0 8px' }, onClick: function () {
                        form.resetFields();
                    } }, "Clear"),
                react_1["default"].createElement("a", { style: { fontSize: 12 }, onClick: function () {
                        setExpand(!expand);
                    } },
                    expand ? react_1["default"].createElement(icons_1.UpOutlined, null) : react_1["default"].createElement(icons_1.DownOutlined, null),
                    " Collapse")))));
};
exports.AntdFormAdavancedSearch = function () { return react_1["default"].createElement("div", null,
    react_1["default"].createElement(AdvancedSearchForm, null),
    react_1["default"].createElement("div", { className: "search-result-list" }, "Search Result List")); };
