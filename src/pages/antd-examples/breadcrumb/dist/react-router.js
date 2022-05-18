"use strict";
exports.__esModule = true;
exports.AntdBreadcrumbReactRouter = void 0;
var react_router_dom_1 = require("react-router-dom");
var antd_1 = require("antd");
require("./react-router.css");
var Apps = function () { return (React.createElement("ul", { className: "app-list" },
    React.createElement("li", null,
        React.createElement(react_router_dom_1.Link, { to: "/apps/1" }, "Application1"),
        "\uFF1A",
        React.createElement(react_router_dom_1.Link, { to: "/apps/1/detail" }, "Detail")),
    React.createElement("li", null,
        React.createElement(react_router_dom_1.Link, { to: "/apps/2" }, "Application2"),
        "\uFF1A",
        React.createElement(react_router_dom_1.Link, { to: "/apps/2/detail" }, "Detail")))); };
var breadcrumbNameMap = {
    '/apps': 'Application List',
    '/apps/1': 'Application1',
    '/apps/2': 'Application2',
    '/apps/1/detail': 'Detail',
    '/apps/2/detail': 'Detail'
};
var Home = function (props) {
    var location = react_router_dom_1.useLocation();
    console.log("Location " + location.pathname);
    var pathSnippets = location.pathname.split('/').filter(function (i) { return i; });
    console.log("snippets " + location.pathname.split('/'));
    console.log("pathSnippets " + location.pathname.split('/').filter(function (i) { return i; }));
    var extraBreadcrumbItems = pathSnippets.map(function (_, index) {
        var url = "/" + pathSnippets.slice(0, index + 1).join('/');
        console.log(url);
        return (React.createElement(antd_1.Breadcrumb.Item, { key: url },
            React.createElement(react_router_dom_1.Link, { to: url }, url.substring(url.lastIndexOf('/') + 1))));
    });
    var breadcrumbItems = [
        React.createElement(antd_1.Breadcrumb.Item, { key: "home" },
            React.createElement(react_router_dom_1.Link, { to: "/" }, "Home")),
    ].concat(extraBreadcrumbItems);
    return (React.createElement("div", { className: "demo" },
        React.createElement("div", { className: "demo-nav" },
            React.createElement(react_router_dom_1.Link, { to: "/" }, "Home"),
            React.createElement(react_router_dom_1.Link, { to: "/apps" }, "Application List")),
        React.createElement(react_router_dom_1.Routes, null,
            React.createElement(react_router_dom_1.Route, { path: "/apps", element: React.createElement(Apps, null) }),
            React.createElement(react_router_dom_1.Route, { path: "*", element: React.createElement("span", null, "Home Page") })),
        React.createElement(antd_1.Alert, { style: { margin: '16px 0' }, message: "Click the navigation above to switch:" }),
        React.createElement(antd_1.Breadcrumb, null, breadcrumbItems)));
};
exports.AntdBreadcrumbReactRouter = function () { return React.createElement(Home, null); };
