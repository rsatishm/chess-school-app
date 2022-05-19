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
exports.AntdTimelinePending = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var AntdTimelinePending = /** @class */ (function (_super) {
    __extends(AntdTimelinePending, _super);
    function AntdTimelinePending() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            reverse: false
        };
        _this.handleClick = function () {
            _this.setState({ reverse: !_this.state.reverse });
        };
        return _this;
    }
    AntdTimelinePending.prototype.render = function () {
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(antd_1.Timeline, { pending: "Recording...", reverse: this.state.reverse },
                react_1["default"].createElement(antd_1.Timeline.Item, null, "Create a services site 2015-09-01"),
                react_1["default"].createElement(antd_1.Timeline.Item, null, "Solve initial network problems 2015-09-01"),
                react_1["default"].createElement(antd_1.Timeline.Item, null, "Technical testing 2015-09-01")),
            react_1["default"].createElement(antd_1.Button, { type: "primary", style: { marginTop: 16 }, onClick: this.handleClick }, "Toggle Reverse")));
    };
    return AntdTimelinePending;
}(react_1["default"].Component));
exports.AntdTimelinePending = AntdTimelinePending;
