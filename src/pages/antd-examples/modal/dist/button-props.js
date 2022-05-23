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
exports.AntdModalButtonProps = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var AntdModalButtonProps = /** @class */ (function (_super) {
    __extends(AntdModalButtonProps, _super);
    function AntdModalButtonProps() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { visible: false };
        _this.showModal = function () {
            _this.setState({
                visible: true
            });
        };
        _this.handleOk = function (e) {
            console.log(e);
            _this.setState({
                visible: false
            });
        };
        _this.handleCancel = function (e) {
            console.log(e);
            _this.setState({
                visible: false
            });
        };
        return _this;
    }
    AntdModalButtonProps.prototype.render = function () {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: this.showModal }, "Open Modal with customized button props"),
            react_1["default"].createElement(antd_1.Modal, { title: "Basic Modal", visible: this.state.visible, onOk: this.handleOk, onCancel: this.handleCancel, okButtonProps: { disabled: true }, cancelButtonProps: { disabled: true } },
                react_1["default"].createElement("p", null, "Some contents..."),
                react_1["default"].createElement("p", null, "Some contents..."),
                react_1["default"].createElement("p", null, "Some contents..."))));
    };
    return AntdModalButtonProps;
}(react_1["default"].Component));
exports.AntdModalButtonProps = AntdModalButtonProps;
