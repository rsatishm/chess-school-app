"use strict";
exports.__esModule = true;
exports.AntdBadgeNoWrapper = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var react_1 = require("react");
exports.AntdBadgeNoWrapper = function () {
    var _a = react_1["default"].useState(true), show = _a[0], setShow = _a[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Switch, { checked: show, onChange: function () { return setShow(!show); } }),
        react_1["default"].createElement(antd_1.Badge, { count: show ? 25 : 0 }),
        react_1["default"].createElement(antd_1.Badge, { count: show ? react_1["default"].createElement(icons_1.ClockCircleOutlined, { style: { color: '#f5222d' } }) : 0 }),
        react_1["default"].createElement(antd_1.Badge, { className: "site-badge-count-109", count: show ? 109 : 0, style: { backgroundColor: '#52c41a' } }),
        react_1["default"].createElement(antd_1.Space, null,
            react_1["default"].createElement(antd_1.Switch, { checked: show, onChange: function () { return setShow(!show); } }),
            react_1["default"].createElement(antd_1.Badge, { count: show ? 25 : 0 }),
            react_1["default"].createElement(antd_1.Badge, { count: show ? react_1["default"].createElement(icons_1.ClockCircleOutlined, { style: { color: '#f5222d' } }) : 0 }),
            react_1["default"].createElement(antd_1.Badge, { className: "site-badge-count-109", count: show ? 109 : 0, style: { backgroundColor: '#52c41a' } }))));
};
