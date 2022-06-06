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
exports.AntdStepsNav = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var Step = antd_1.Steps.Step;
var AntdStepsNav = /** @class */ (function (_super) {
    __extends(AntdStepsNav, _super);
    function AntdStepsNav() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            current: 0
        };
        _this.onChange = function (current) {
            console.log('onChange:', current);
            _this.setState({ current: current });
        };
        return _this;
    }
    AntdStepsNav.prototype.render = function () {
        var current = this.state.current;
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(antd_1.Steps, { type: "navigation", size: "small", current: current, onChange: this.onChange, className: "site-navigation-steps" },
                react_1["default"].createElement(Step, { title: "Step 1", subTitle: "00:00:05", status: "finish", description: "This is a description." }),
                react_1["default"].createElement(Step, { title: "Step 2", subTitle: "00:01:02", status: "process", description: "This is a description." }),
                react_1["default"].createElement(Step, { title: "Step 3", subTitle: "waiting for longlong time", status: "wait", description: "This is a description." })),
            react_1["default"].createElement(antd_1.Steps, { type: "navigation", current: current, onChange: this.onChange, className: "site-navigation-steps" },
                react_1["default"].createElement(Step, { status: "finish", title: "Step 1" }),
                react_1["default"].createElement(Step, { status: "process", title: "Step 2" }),
                react_1["default"].createElement(Step, { status: "wait", title: "Step 3" }),
                react_1["default"].createElement(Step, { status: "wait", title: "Step 4" })),
            react_1["default"].createElement(antd_1.Steps, { type: "navigation", size: "small", current: current, onChange: this.onChange, className: "site-navigation-steps" },
                react_1["default"].createElement(Step, { status: "finish", title: "finish 1" }),
                react_1["default"].createElement(Step, { status: "finish", title: "finish 2" }),
                react_1["default"].createElement(Step, { status: "process", title: "current process" }),
                react_1["default"].createElement(Step, { status: "wait", title: "wait", disabled: true }))));
    };
    return AntdStepsNav;
}(react_1["default"].Component));
exports.AntdStepsNav = AntdStepsNav;
