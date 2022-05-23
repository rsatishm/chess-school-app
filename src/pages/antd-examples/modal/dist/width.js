"use strict";
exports.__esModule = true;
exports.AntdModalWidth = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
exports.AntdModalWidth = function () {
    var _a = react_1.useState(false), visible = _a[0], setVisible = _a[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: function () { return setVisible(true); } }, "Open Modal of 1000px width"),
        react_1["default"].createElement(antd_1.Modal, { title: "Modal 1000px width", centered: true, visible: visible, onOk: function () { return setVisible(false); }, onCancel: function () { return setVisible(false); }, width: 1000 },
            react_1["default"].createElement("p", null, "some contents..."),
            react_1["default"].createElement("p", null, "some contents..."),
            react_1["default"].createElement("p", null, "some contents..."))));
};
