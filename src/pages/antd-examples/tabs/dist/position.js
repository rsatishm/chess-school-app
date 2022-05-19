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
exports.AntdTabsPosition = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var TabPane = antd_1.Tabs.TabPane;
var AntdTabsPosition = /** @class */ (function (_super) {
    __extends(AntdTabsPosition, _super);
    function AntdTabsPosition() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            tabPosition: 'left'
        };
        _this.changeTabPosition = function (e) {
            _this.setState({ tabPosition: e.target.value });
        };
        return _this;
    }
    AntdTabsPosition.prototype.render = function () {
        var tabPosition = this.state.tabPosition;
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(antd_1.Space, { style: { marginBottom: 24 } },
                "Tab position:",
                react_1["default"].createElement(antd_1.Radio.Group, { value: tabPosition, onChange: this.changeTabPosition },
                    react_1["default"].createElement(antd_1.Radio.Button, { value: "top" }, "top"),
                    react_1["default"].createElement(antd_1.Radio.Button, { value: "bottom" }, "bottom"),
                    react_1["default"].createElement(antd_1.Radio.Button, { value: "left" }, "left"),
                    react_1["default"].createElement(antd_1.Radio.Button, { value: "right" }, "right"))),
            react_1["default"].createElement(antd_1.Tabs, { tabPosition: tabPosition },
                react_1["default"].createElement(TabPane, { tab: "Tab 1", key: "1" }, "Content of Tab 1"),
                react_1["default"].createElement(TabPane, { tab: "Tab 2", key: "2" }, "Content of Tab 2"),
                react_1["default"].createElement(TabPane, { tab: "Tab 3", key: "3" }, "Content of Tab 3"))));
    };
    return AntdTabsPosition;
}(react_1["default"].Component));
exports.AntdTabsPosition = AntdTabsPosition;
