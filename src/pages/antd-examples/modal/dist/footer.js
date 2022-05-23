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
exports.AntdModalFooter = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var AntdModalFooter = /** @class */ (function (_super) {
    __extends(AntdModalFooter, _super);
    function AntdModalFooter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loading: false,
            visible: false
        };
        _this.showModal = function () {
            _this.setState({
                visible: true
            });
        };
        _this.handleOk = function () {
            _this.setState({ loading: true });
            setTimeout(function () {
                _this.setState({ loading: false, visible: false });
            }, 3000);
        };
        _this.handleCancel = function () {
            _this.setState({ visible: false });
        };
        return _this;
    }
    AntdModalFooter.prototype.render = function () {
        var _a = this.state, visible = _a.visible, loading = _a.loading;
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: this.showModal }, "Open Modal with customized footer"),
            react_1["default"].createElement(antd_1.Modal, { visible: visible, title: "Title", onOk: this.handleOk, onCancel: this.handleCancel, footer: [
                    react_1["default"].createElement(antd_1.Button, { key: "back", onClick: this.handleCancel }, "Return"),
                    react_1["default"].createElement(antd_1.Button, { key: "submit", type: "primary", loading: loading, onClick: this.handleOk }, "Submit"),
                    react_1["default"].createElement(antd_1.Button, { key: "link", href: "https://google.com", type: "primary", loading: loading, onClick: this.handleOk }, "Search on Google"),
                ] },
                react_1["default"].createElement("p", null, "Some contents..."),
                react_1["default"].createElement("p", null, "Some contents..."),
                react_1["default"].createElement("p", null, "Some contents..."),
                react_1["default"].createElement("p", null, "Some contents..."),
                react_1["default"].createElement("p", null, "Some contents..."))));
    };
    return AntdModalFooter;
}(react_1["default"].Component));
exports.AntdModalFooter = AntdModalFooter;
