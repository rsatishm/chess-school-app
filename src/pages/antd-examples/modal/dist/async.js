"use strict";
exports.__esModule = true;
exports.AntdModalAsync = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
exports.AntdModalAsync = function () {
    var _a = react_1["default"].useState(false), visible = _a[0], setVisible = _a[1];
    var _b = react_1["default"].useState(false), confirmLoading = _b[0], setConfirmLoading = _b[1];
    var _c = react_1["default"].useState('Content of the modal'), modalText = _c[0], setModalText = _c[1];
    var showModal = function () {
        setVisible(true);
    };
    var handleOk = function () {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(function () {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };
    var handleCancel = function () {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: showModal }, "Open Modal with async logic"),
        react_1["default"].createElement(antd_1.Modal, { title: "Title", visible: visible, onOk: handleOk, confirmLoading: confirmLoading, onCancel: handleCancel },
            react_1["default"].createElement("p", null, modalText))));
};
