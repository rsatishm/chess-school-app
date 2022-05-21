"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AntdSelectCustomDropdownMenu = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var Option = antd_1.Select.Option;
var index = 0;
exports.AntdSelectCustomDropdownMenu = function () {
    var _a = react_1.useState(['jack', 'lucy']), items = _a[0], setItems = _a[1];
    var _b = react_1.useState(''), name = _b[0], setName = _b[1];
    var onNameChange = function (event) {
        setName(event.target.value);
    };
    var addItem = function (e) {
        e.preventDefault();
        setItems(__spreadArrays(items, [name || "New item " + index++]));
        setName('');
    };
    return (react_1["default"].createElement(antd_1.Select, { style: { width: 300 }, placeholder: "custom dropdown render", dropdownRender: function (menu) { return (react_1["default"].createElement(react_1["default"].Fragment, null,
            menu,
            react_1["default"].createElement(antd_1.Divider, { style: { margin: '8px 0' } }),
            react_1["default"].createElement(antd_1.Space, { align: "center", style: { padding: '0 8px 4px' } },
                react_1["default"].createElement(antd_1.Input, { placeholder: "Please enter item", value: name, onChange: onNameChange }),
                react_1["default"].createElement(antd_1.Typography.Link, { onClick: addItem, style: { whiteSpace: 'nowrap' } },
                    react_1["default"].createElement(icons_1.PlusOutlined, null),
                    " Add item")))); } }, items.map(function (item) { return (react_1["default"].createElement(Option, { key: item }, item)); })));
};
