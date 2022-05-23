"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.AntdModalLocale = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var react_1 = require("react");
var LocalizedModal = /** @class */ (function (_super) {
    __extends(LocalizedModal, _super);
    function LocalizedModal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { visible: false };
        _this.showModal = function () {
            _this.setState({
                visible: true
            });
        };
        _this.hideModal = function () {
            _this.setState({
                visible: false
            });
        };
        return _this;
    }
    LocalizedModal.prototype.render = function () {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: this.showModal }, "Modal"),
            react_1["default"].createElement(antd_1.Modal, { title: "Modal", visible: this.state.visible, onOk: this.hideModal, onCancel: this.hideModal, okText: "\u786E\u8BA4", cancelText: "\u53D6\u6D88" },
                react_1["default"].createElement("p", null, "Bla bla ..."),
                react_1["default"].createElement("p", null, "Bla bla ..."),
                react_1["default"].createElement("p", null, "Bla bla ..."))));
    };
    return LocalizedModal;
}(react_1["default"].Component));
function confirm() {
    antd_1.Modal.confirm({
        title: 'Confirm',
        icon: react_1["default"].createElement(icons_1.ExclamationCircleOutlined, null),
        content: 'Bla bla ...',
        okText: '确认',
        cancelText: '取消'
    });
}
exports.AntdModalLocale = function () { return react_1["default"].createElement(antd_1.Space, null,
    react_1["default"].createElement(LocalizedModal, null),
    react_1["default"].createElement(antd_1.Button, { onClick: confirm }, "Confirm")); };
