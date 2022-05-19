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
exports.AntdTabsNest = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var TabPane = antd_1.Tabs.TabPane;
var Option = antd_1.Select.Option;
var positionList = ['left', 'right', 'top', 'bottom'];
var list = new Array(20).fill(null).map(function (_, index) { return index; });
var AntdTabsNest = /** @class */ (function (_super) {
    __extends(AntdTabsNest, _super);
    function AntdTabsNest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            parentPos: undefined,
            childPos: undefined,
            parentType: undefined,
            childType: undefined
        };
        return _this;
    }
    AntdTabsNest.prototype.render = function () {
        var _this = this;
        var _a = this.state, parentPos = _a.parentPos, childPos = _a.childPos, parentType = _a.parentType, childType = _a.childType;
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(antd_1.Select, { style: { width: 200 }, onChange: function (val) {
                    _this.setState({ parentPos: val });
                } }, positionList.map(function (pos) { return (react_1["default"].createElement(Option, { key: pos, value: pos },
                "Parent - ",
                pos)); })),
            react_1["default"].createElement(antd_1.Select, { style: { width: 200 }, onChange: function (val) {
                    _this.setState({ childPos: val });
                } }, positionList.map(function (pos) { return (react_1["default"].createElement(Option, { key: pos, value: pos },
                "Child - ",
                pos)); })),
            react_1["default"].createElement(antd_1.Select, { style: { width: 200 }, onChange: function (val) {
                    _this.setState({ parentType: val });
                } },
                react_1["default"].createElement(Option, { value: "line" }, "Parent - line"),
                react_1["default"].createElement(Option, { value: "card" }, "Parent - card"),
                react_1["default"].createElement(Option, { value: "editable-card" }, "Parent - card edit")),
            react_1["default"].createElement(antd_1.Select, { style: { width: 200 }, onChange: function (val) {
                    _this.setState({ childType: val });
                } },
                react_1["default"].createElement(Option, { value: "line" }, "Child - line"),
                react_1["default"].createElement(Option, { value: "card" }, "Child - card"),
                react_1["default"].createElement(Option, { value: "editable-card" }, "Parent - card edit")),
            react_1["default"].createElement(antd_1.Tabs, { defaultActiveKey: "1", tabPosition: parentPos, type: parentType },
                react_1["default"].createElement(TabPane, { tab: "Tab 1", key: "1" },
                    react_1["default"].createElement(antd_1.Tabs, { defaultActiveKey: "1", tabPosition: childPos, type: childType, style: { height: 300 } }, list.map(function (key) { return (react_1["default"].createElement(TabPane, { tab: "Tab " + key, key: key },
                        "TTTT ",
                        key)); }))),
                react_1["default"].createElement(TabPane, { tab: "Tab 2", key: "2" }, "Content of Tab Pane 2"))));
    };
    return AntdTabsNest;
}(react_1["default"].Component));
exports.AntdTabsNest = AntdTabsNest;
