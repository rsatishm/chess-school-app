"use strict";
exports.__esModule = true;
exports.AntdLayoutResponsive = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var Header = antd_1.Layout.Header, Content = antd_1.Layout.Content, Footer = antd_1.Layout.Footer, Sider = antd_1.Layout.Sider;
exports.AntdLayoutResponsive = function () { return React.createElement(antd_1.Layout, null,
    React.createElement(Sider, { breakpoint: "lg", collapsedWidth: "0", onBreakpoint: function (broken) {
            console.log(broken);
        }, onCollapse: function (collapsed, type) {
            console.log(collapsed, type);
        } },
        React.createElement("div", { className: "logo" }),
        React.createElement(antd_1.Menu, { theme: "dark", mode: "inline", defaultSelectedKeys: ['4'] },
            React.createElement(antd_1.Menu.Item, { key: "1", icon: React.createElement(icons_1.UserOutlined, null) }, "nav 1"),
            React.createElement(antd_1.Menu.Item, { key: "2", icon: React.createElement(icons_1.VideoCameraOutlined, null) }, "nav 2"),
            React.createElement(antd_1.Menu.Item, { key: "3", icon: React.createElement(icons_1.UploadOutlined, null) }, "nav 3"),
            React.createElement(antd_1.Menu.Item, { key: "4", icon: React.createElement(icons_1.UserOutlined, null) }, "nav 4"))),
    React.createElement(antd_1.Layout, null,
        React.createElement(Header, { className: "site-layout-sub-header-background", style: { padding: 0 } }),
        React.createElement(Content, { style: { margin: '24px 16px 0' } },
            React.createElement("div", { className: "site-layout-background", style: { padding: 24, minHeight: 360 } }, "content")),
        React.createElement(Footer, { style: { textAlign: 'center' } }, "Ant Design \u00A92018 Created by Ant UED"))); };
