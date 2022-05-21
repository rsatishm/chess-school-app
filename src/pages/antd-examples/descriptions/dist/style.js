"use strict";
exports.__esModule = true;
exports.AntdDescriptionsStyle = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var labelStyle = { background: 'red' };
var contentStyle = { background: 'green' };
exports.AntdDescriptionsStyle = function () {
    var _a = react_1["default"].useState(true), border = _a[0], setBorder = _a[1];
    var _b = react_1["default"].useState('horizontal'), layout = _b[0], setLayout = _b[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Switch, { checkedChildren: "Border", unCheckedChildren: "No Border", checked: border, onChange: function (e) { return setBorder(e); } }),
        react_1["default"].createElement(antd_1.Divider, null),
        react_1["default"].createElement(antd_1.Radio.Group, { onChange: function (e) { return setLayout(e.target.value); }, value: layout },
            react_1["default"].createElement(antd_1.Radio, { value: "horizontal" }, "horizontal"),
            react_1["default"].createElement(antd_1.Radio, { value: "vertical" }, "vertical")),
        react_1["default"].createElement(antd_1.Divider, null),
        react_1["default"].createElement(antd_1.Descriptions, { title: "User Info", bordered: border, layout: layout },
            react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Product", labelStyle: labelStyle, contentStyle: contentStyle }, "Cloud Database"),
            react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Billing Mode" }, "Prepaid"),
            react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Automatic Renewal" }, "YES")),
        react_1["default"].createElement(antd_1.Divider, null),
        react_1["default"].createElement(antd_1.Descriptions, { title: "Root style", labelStyle: labelStyle, contentStyle: contentStyle, bordered: border, layout: layout },
            react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Product" }, "Cloud Database"),
            react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Billing Mode" }, "Prepaid"),
            react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Automatic Renewal", labelStyle: { color: 'orange' }, contentStyle: { color: 'blue' } }, "YES"))));
};
