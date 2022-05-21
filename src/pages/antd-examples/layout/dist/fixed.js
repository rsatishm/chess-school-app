"use strict";
exports.__esModule = true;
exports.AntdLayoutFixed = void 0;
var antd_1 = require("antd");
var Header = antd_1.Layout.Header, Content = antd_1.Layout.Content, Footer = antd_1.Layout.Footer;
exports.AntdLayoutFixed = function () { return React.createElement(antd_1.Layout, null,
    React.createElement(Header, { style: { position: 'fixed', zIndex: 1, width: '100%' } },
        React.createElement("div", { className: "logo" }),
        React.createElement(antd_1.Menu, { theme: "dark", mode: "horizontal", defaultSelectedKeys: ['2'] },
            React.createElement(antd_1.Menu.Item, { key: "1" }, "nav 1"),
            React.createElement(antd_1.Menu.Item, { key: "2" }, "nav 2"),
            React.createElement(antd_1.Menu.Item, { key: "3" }, "nav 3"))),
    React.createElement(Content, { className: "site-layout", style: { padding: '0 50px', marginTop: 64 } },
        React.createElement(antd_1.Breadcrumb, { style: { margin: '16px 0' } },
            React.createElement(antd_1.Breadcrumb.Item, null, "Home"),
            React.createElement(antd_1.Breadcrumb.Item, null, "List"),
            React.createElement(antd_1.Breadcrumb.Item, null, "App")),
        React.createElement("div", { className: "site-layout-background", style: { padding: 24, minHeight: 380 } }, "Content")),
    React.createElement(Footer, { style: { textAlign: 'center' } }, "Ant Design \u00A92018 Created by Ant UED")); };
