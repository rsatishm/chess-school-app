"use strict";
exports.__esModule = true;
exports.AntdModalBasic = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
exports.AntdModalBasic = function () {
    var _a = react_1.useState(false), isModalVisible = _a[0], setIsModalVisible = _a[1];
    var showModal = function () {
        setIsModalVisible(true);
    };
    var handleOk = function () {
        setIsModalVisible(false);
    };
    var handleCancel = function () {
        setIsModalVisible(false);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: showModal }, "Open Modal"),
        react_1["default"].createElement(antd_1.Modal, { title: "Basic Modal", visible: isModalVisible, onOk: handleOk, onCancel: handleCancel },
            react_1["default"].createElement("p", null, "Some contents..."),
            react_1["default"].createElement("p", null, "Some contents..."),
            react_1["default"].createElement("p", null, "Some contents..."))));
};
