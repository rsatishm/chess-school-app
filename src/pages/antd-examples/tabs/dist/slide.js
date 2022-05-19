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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AntdTabsSlide = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var TabPane = antd_1.Tabs.TabPane;
var AntdTabsSlide = /** @class */ (function (_super) {
    __extends(AntdTabsSlide, _super);
    function AntdTabsSlide(props) {
        var _this = _super.call(this, props) || this;
        _this.handleModeChange = function (e) {
            var mode = e.target.value;
            _this.setState({ mode: mode });
        };
        _this.state = {
            mode: 'top'
        };
        return _this;
    }
    AntdTabsSlide.prototype.render = function () {
        var mode = this.state.mode;
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(antd_1.Radio.Group, { onChange: this.handleModeChange, value: mode, style: { marginBottom: 8 } },
                react_1["default"].createElement(antd_1.Radio.Button, { value: "top" }, "Horizontal"),
                react_1["default"].createElement(antd_1.Radio.Button, { value: "left" }, "Vertical")),
            react_1["default"].createElement(antd_1.Tabs, { defaultActiveKey: "1", tabPosition: mode, style: { height: 220 } }, __spreadArrays(Array.from({ length: 30 }, function (v, i) { return i; })).map(function (i) { return (react_1["default"].createElement(TabPane, { tab: "Tab-" + i, key: i, disabled: i === 28 },
                "Content of tab ",
                i)); }))));
    };
    return AntdTabsSlide;
}(react_1["default"].Component));
exports.AntdTabsSlide = AntdTabsSlide;
