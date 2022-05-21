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
exports.AntdLayoutCustomTriggerDebug = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var react_1 = require("react");
var Header = antd_1.Layout.Header, Sider = antd_1.Layout.Sider, Content = antd_1.Layout.Content;
var SubMenu = antd_1.Menu.SubMenu;
var AntdLayoutCustomTriggerDebug = /** @class */ (function (_super) {
    __extends(AntdLayoutCustomTriggerDebug, _super);
    function AntdLayoutCustomTriggerDebug() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            collapsed: true
        };
        _this.toggle = function () {
            _this.setState({
                collapsed: !_this.state.collapsed
            });
        };
        return _this;
    }
    AntdLayoutCustomTriggerDebug.prototype.render = function () {
        return (react_1["default"].createElement(antd_1.Layout, null,
            react_1["default"].createElement(Sider, { trigger: null, collapsible: true, collapsed: this.state.collapsed },
                react_1["default"].createElement("div", { className: "logo" }),
                react_1["default"].createElement(antd_1.Menu, { theme: "dark", mode: "inline", defaultSelectedKeys: ['3'], defaultOpenKeys: ['sub1'] },
                    react_1["default"].createElement(antd_1.Menu.Item, { key: "1", icon: react_1["default"].createElement(icons_1.PieChartOutlined, null) }, "Option 1"),
                    react_1["default"].createElement(antd_1.Menu.Item, { key: "2", icon: react_1["default"].createElement(icons_1.DesktopOutlined, null) }, "Option 2"),
                    react_1["default"].createElement(SubMenu, { key: "sub1", icon: react_1["default"].createElement(icons_1.UserOutlined, null), title: "User" },
                        react_1["default"].createElement(antd_1.Menu.Item, { key: "3" }, "Tom"),
                        react_1["default"].createElement(antd_1.Menu.Item, { key: "4" }, "Bill"),
                        react_1["default"].createElement(antd_1.Menu.Item, { key: "5" }, "Alex")),
                    react_1["default"].createElement(SubMenu, { key: "sub2", icon: react_1["default"].createElement(icons_1.TeamOutlined, null), title: "Team" },
                        react_1["default"].createElement(antd_1.Menu.Item, { key: "6" }, "Team 1"),
                        react_1["default"].createElement(antd_1.Menu.Item, { key: "8" }, "Team 2")),
                    react_1["default"].createElement(antd_1.Menu.Item, { key: "9", icon: react_1["default"].createElement(icons_1.FileOutlined, null) }))),
            react_1["default"].createElement(antd_1.Layout, null,
                react_1["default"].createElement(Header, { className: "site-layout-background", style: { padding: 0 } }, react_1["default"].createElement(this.state.collapsed ? icons_1.MenuUnfoldOutlined : icons_1.MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle
                })),
                react_1["default"].createElement(Content, { className: "site-layout-background", style: {
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280
                    } }, "Content"))));
    };
    return AntdLayoutCustomTriggerDebug;
}(react_1["default"].Component));
exports.AntdLayoutCustomTriggerDebug = AntdLayoutCustomTriggerDebug;
