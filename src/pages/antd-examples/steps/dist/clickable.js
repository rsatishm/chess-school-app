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
exports.AntdStepsClickable = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var Step = antd_1.Steps.Step;
var AntdStepsClickable = /** @class */ (function (_super) {
    __extends(AntdStepsClickable, _super);
    function AntdStepsClickable() {
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
    AntdStepsClickable.prototype.render = function () {
        var current = this.state.current;
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(antd_1.Steps, { current: current, onChange: this.onChange },
                react_1["default"].createElement(Step, { title: "Step 1", description: "This is a description." }),
                react_1["default"].createElement(Step, { title: "Step 2", description: "This is a description." }),
                react_1["default"].createElement(Step, { title: "Step 3", description: "This is a description." })),
            react_1["default"].createElement(antd_1.Divider, null),
            react_1["default"].createElement(antd_1.Steps, { current: current, onChange: this.onChange, direction: "vertical" },
                react_1["default"].createElement(Step, { title: "Step 1", description: "This is a description." }),
                react_1["default"].createElement(Step, { title: "Step 2", description: "This is a description." }),
                react_1["default"].createElement(Step, { title: "Step 3", description: "This is a description." }))));
    };
    return AntdStepsClickable;
}(react_1["default"].Component));
exports.AntdStepsClickable = AntdStepsClickable;
