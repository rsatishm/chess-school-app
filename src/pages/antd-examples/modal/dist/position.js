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
exports.AntdModalPosition = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var AntdModalPosition = /** @class */ (function (_super) {
    __extends(AntdModalPosition, _super);
    function AntdModalPosition() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            modal1Visible: false,
            modal2Visible: false
        };
        return _this;
    }
    AntdModalPosition.prototype.setModal1Visible = function (modal1Visible) {
        this.setState({ modal1Visible: modal1Visible });
    };
    AntdModalPosition.prototype.setModal2Visible = function (modal2Visible) {
        this.setState({ modal2Visible: modal2Visible });
    };
    AntdModalPosition.prototype.render = function () {
        var _this = this;
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: function () { return _this.setModal1Visible(true); } }, "Display a modal dialog at 20px to Top"),
            react_1["default"].createElement(antd_1.Modal, { title: "20px to Top", style: { top: 20 }, visible: this.state.modal1Visible, onOk: function () { return _this.setModal1Visible(false); }, onCancel: function () { return _this.setModal1Visible(false); } },
                react_1["default"].createElement("p", null, "some contents..."),
                react_1["default"].createElement("p", null, "some contents..."),
                react_1["default"].createElement("p", null, "some contents...")),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: function () { return _this.setModal2Visible(true); } }, "Vertically centered modal dialog"),
            react_1["default"].createElement(antd_1.Modal, { title: "Vertically centered modal dialog", centered: true, visible: this.state.modal2Visible, onOk: function () { return _this.setModal2Visible(false); }, onCancel: function () { return _this.setModal2Visible(false); } },
                react_1["default"].createElement("p", null, "some contents..."),
                react_1["default"].createElement("p", null, "some contents..."),
                react_1["default"].createElement("p", null, "some contents..."))));
    };
    return AntdModalPosition;
}(react_1["default"].Component));
exports.AntdModalPosition = AntdModalPosition;
