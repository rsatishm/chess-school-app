"use strict";
exports.__esModule = true;
exports.AntdLayoutBasic = void 0;
var antd_1 = require("antd");
var Header = antd_1.Layout.Header, Footer = antd_1.Layout.Footer, Sider = antd_1.Layout.Sider, Content = antd_1.Layout.Content;
exports.AntdLayoutBasic = function () { return React.createElement(React.Fragment, null,
    React.createElement(antd_1.Layout, null,
        React.createElement(Header, null, "Header"),
        React.createElement(Content, null, "Content"),
        React.createElement(Footer, null, "Footer")),
    React.createElement(antd_1.Layout, null,
        React.createElement(Header, null, "Header"),
        React.createElement(antd_1.Layout, null,
            React.createElement(Sider, null, "Sider"),
            React.createElement(Content, null, "Content")),
        React.createElement(Footer, null, "Footer")),
    React.createElement(antd_1.Layout, null,
        React.createElement(Header, null, "Header"),
        React.createElement(antd_1.Layout, null,
            React.createElement(Content, null, "Content"),
            React.createElement(Sider, null, "Sider")),
        React.createElement(Footer, null, "Footer")),
    React.createElement(antd_1.Layout, null,
        React.createElement(Sider, null, "Sider"),
        React.createElement(antd_1.Layout, null,
            React.createElement(Header, null, "Header"),
            React.createElement(Content, null, "Content"),
            React.createElement(Footer, null, "Footer")))); };
