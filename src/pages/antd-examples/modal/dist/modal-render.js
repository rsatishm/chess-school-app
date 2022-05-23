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
exports.AntdModalRender = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var react_draggable_1 = require("react-draggable");
var AntdModalRender = /** @class */ (function (_super) {
    __extends(AntdModalRender, _super);
    function AntdModalRender() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            visible: false,
            disabled: true,
            bounds: { left: 0, top: 0, bottom: 0, right: 0 }
        };
        _this.draggleRef = react_1["default"].createRef();
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
        _this.onStart = function (event, uiData) {
            var _a = window.document.documentElement, clientWidth = _a.clientWidth, clientHeight = _a.clientHeight;
            var draggle = _this.draggleRef.current;
            var targetRect = draggle === null || draggle === void 0 ? void 0 : draggle.getBoundingClientRect();
            if (!targetRect) {
                return;
            }
            _this.setState({
                bounds: {
                    left: -targetRect.left + uiData.x,
                    right: clientWidth - (targetRect.right - uiData.x),
                    top: -targetRect.top + uiData.y,
                    bottom: clientHeight - (targetRect.bottom - uiData.y)
                }
            });
        };
        return _this;
    }
    AntdModalRender.prototype.render = function () {
        var _this = this;
        var _a = this.state, bounds = _a.bounds, disabled = _a.disabled, visible = _a.visible;
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(antd_1.Button, { onClick: this.showModal }, "Open Draggable Modal"),
            react_1["default"].createElement(antd_1.Modal, { title: react_1["default"].createElement("div", { style: {
                        width: '100%',
                        cursor: 'move'
                    }, onMouseOver: function () {
                        if (disabled) {
                            _this.setState({
                                disabled: false
                            });
                        }
                    }, onMouseOut: function () {
                        _this.setState({
                            disabled: true
                        });
                    }, 
                    // fix eslintjsx-a11y/mouse-events-have-key-events
                    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
                    onFocus: function () { }, onBlur: function () { } }, "Draggable Modal"), visible: visible, onOk: this.handleOk, onCancel: this.handleCancel, modalRender: function (modal) { return (react_1["default"].createElement(react_draggable_1["default"], { disabled: disabled, bounds: bounds, onStart: function (event, uiData) { return _this.onStart(event, uiData); } },
                    react_1["default"].createElement("div", { ref: _this.draggleRef }, modal))); } },
                react_1["default"].createElement("p", null, "Just don't learn physics at school and your life will be full of magic and miracles."),
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("p", null, "Day before yesterday I saw a rabbit, and yesterday a deer, and today, you."))));
    };
    return AntdModalRender;
}(react_1["default"].Component));
exports.AntdModalRender = AntdModalRender;
