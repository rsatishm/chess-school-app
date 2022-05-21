"use strict";
exports.__esModule = true;
exports.AntdLayoutTop = void 0;
var antd_1 = require("antd");
var Header = antd_1.Layout.Header, Content = antd_1.Layout.Content, Footer = antd_1.Layout.Footer;
exports.AntdLayoutTop = function () { return React.createElement(antd_1.Layout, { className: "layout" },
    React.createElement(Header, null,
        React.createElement("div", { className: "logo" }),
        React.createElement(antd_1.Menu, { theme: "dark", mode: "horizontal", defaultSelectedKeys: ['2'] }, new Array(15).fill(null).map(function (_, index) {
            var key = index + 1;
            return React.createElement(antd_1.Menu.Item, { key: key }, "nav " + key);
        }))),
    React.createElement(Content, { style: { padding: '0 50px' } },
        React.createElement(antd_1.Breadcrumb, { style: { margin: '16px 0' } },
            React.createElement(antd_1.Breadcrumb.Item, null, "Home"),
            React.createElement(antd_1.Breadcrumb.Item, null, "List"),
            React.createElement(antd_1.Breadcrumb.Item, null, "App")),
        React.createElement("div", { className: "site-layout-content" }, "Content")),
    React.createElement(Footer, { style: { textAlign: 'center' } }, "Ant Design \u00A92018 Created by Ant UED")); };
