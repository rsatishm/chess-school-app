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
exports.AntdLayoutSide = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var react_1 = require("react");
var Header = antd_1.Layout.Header, Content = antd_1.Layout.Content, Footer = antd_1.Layout.Footer, Sider = antd_1.Layout.Sider;
var SubMenu = antd_1.Menu.SubMenu;
var AntdLayoutSide = /** @class */ (function (_super) {
    __extends(AntdLayoutSide, _super);
    function AntdLayoutSide() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            collapsed: false
        };
        _this.onCollapse = function (collapsed) {
            console.log(collapsed);
            _this.setState({ collapsed: collapsed });
        };
        return _this;
    }
    AntdLayoutSide.prototype.render = function () {
        var collapsed = this.state.collapsed;
        return (react_1["default"].createElement(antd_1.Layout, { style: { minHeight: '100vh' } },
            react_1["default"].createElement(Sider, { collapsible: true, collapsed: collapsed, onCollapse: this.onCollapse },
                react_1["default"].createElement("div", { className: "logo" }),
                react_1["default"].createElement(antd_1.Menu, { theme: "dark", defaultSelectedKeys: ['1'], mode: "inline" },
                    react_1["default"].createElement(antd_1.Menu.Item, { key: "1", icon: react_1["default"].createElement(icons_1.PieChartOutlined, null) }, "Option 1"),
                    react_1["default"].createElement(antd_1.Menu.Item, { key: "2", icon: react_1["default"].createElement(icons_1.DesktopOutlined, null) }, "Option 2"),
                    react_1["default"].createElement(SubMenu, { key: "sub1", icon: react_1["default"].createElement(icons_1.UserOutlined, null), title: "User" },
                        react_1["default"].createElement(antd_1.Menu.Item, { key: "3" }, "Tom"),
                        react_1["default"].createElement(antd_1.Menu.Item, { key: "4" }, "Bill"),
                        react_1["default"].createElement(antd_1.Menu.Item, { key: "5" }, "Alex")),
                    react_1["default"].createElement(SubMenu, { key: "sub2", icon: react_1["default"].createElement(icons_1.TeamOutlined, null), title: "Team" },
                        react_1["default"].createElement(antd_1.Menu.Item, { key: "6" }, "Team 1"),
                        react_1["default"].createElement(antd_1.Menu.Item, { key: "8" }, "Team 2")),
                    react_1["default"].createElement(antd_1.Menu.Item, { key: "9", icon: react_1["default"].createElement(icons_1.FileOutlined, null) }, "Files"))),
            react_1["default"].createElement(antd_1.Layout, { className: "site-layout" },
                react_1["default"].createElement(Header, { className: "site-layout-background", style: { padding: 0 } }),
                react_1["default"].createElement(Content, { style: { margin: '0 16px' } },
                    react_1["default"].createElement(antd_1.Breadcrumb, { style: { margin: '16px 0' } },
                        react_1["default"].createElement(antd_1.Breadcrumb.Item, null, "User"),
                        react_1["default"].createElement(antd_1.Breadcrumb.Item, null, "Bill")),
                    react_1["default"].createElement("div", { className: "site-layout-background", style: { padding: 24, minHeight: 360 } }, "Bill is a cat.")),
                react_1["default"].createElement(Footer, { style: { textAlign: 'center' } }, "Ant Design \u00A92018 Created by Ant UED"))));
    };
    return AntdLayoutSide;
}(react_1["default"].Component));
exports.AntdLayoutSide = AntdLayoutSide;
