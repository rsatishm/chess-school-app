"use strict";
exports.__esModule = true;
exports.AntdLayoutTopSide = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var SubMenu = antd_1.Menu.SubMenu;
var Header = antd_1.Layout.Header, Content = antd_1.Layout.Content, Footer = antd_1.Layout.Footer, Sider = antd_1.Layout.Sider;
exports.AntdLayoutTopSide = function () { return React.createElement(antd_1.Layout, null,
    React.createElement(Header, { className: "header" },
        React.createElement("div", { className: "logo" }),
        React.createElement(antd_1.Menu, { theme: "dark", mode: "horizontal", defaultSelectedKeys: ['2'] },
            React.createElement(antd_1.Menu.Item, { key: "1" }, "nav 1"),
            React.createElement(antd_1.Menu.Item, { key: "2" }, "nav 2"),
            React.createElement(antd_1.Menu.Item, { key: "3" }, "nav 3"))),
    React.createElement(Content, { style: { padding: '0 50px' } },
        React.createElement(antd_1.Breadcrumb, { style: { margin: '16px 0' } },
            React.createElement(antd_1.Breadcrumb.Item, null, "Home"),
            React.createElement(antd_1.Breadcrumb.Item, null, "List"),
            React.createElement(antd_1.Breadcrumb.Item, null, "App")),
        React.createElement(antd_1.Layout, { className: "site-layout-background", style: { padding: '24px 0' } },
            React.createElement(Sider, { className: "site-layout-background", width: 200 },
                React.createElement(antd_1.Menu, { mode: "inline", defaultSelectedKeys: ['1'], defaultOpenKeys: ['sub1'], style: { height: '100%' } },
                    React.createElement(SubMenu, { key: "sub1", icon: React.createElement(icons_1.UserOutlined, null), title: "subnav 1" },
                        React.createElement(antd_1.Menu.Item, { key: "1" }, "option1"),
                        React.createElement(antd_1.Menu.Item, { key: "2" }, "option2"),
                        React.createElement(antd_1.Menu.Item, { key: "3" }, "option3"),
                        React.createElement(antd_1.Menu.Item, { key: "4" }, "option4")),
                    React.createElement(SubMenu, { key: "sub2", icon: React.createElement(icons_1.LaptopOutlined, null), title: "subnav 2" },
                        React.createElement(antd_1.Menu.Item, { key: "5" }, "option5"),
                        React.createElement(antd_1.Menu.Item, { key: "6" }, "option6"),
                        React.createElement(antd_1.Menu.Item, { key: "7" }, "option7"),
                        React.createElement(antd_1.Menu.Item, { key: "8" }, "option8")),
                    React.createElement(SubMenu, { key: "sub3", icon: React.createElement(icons_1.NotificationOutlined, null), title: "subnav 3" },
                        React.createElement(antd_1.Menu.Item, { key: "9" }, "option9"),
                        React.createElement(antd_1.Menu.Item, { key: "10" }, "option10"),
                        React.createElement(antd_1.Menu.Item, { key: "11" }, "option11"),
                        React.createElement(antd_1.Menu.Item, { key: "12" }, "option12")))),
            React.createElement(Content, { style: { padding: '0 24px', minHeight: 280 } }, "Content"))),
    React.createElement(Footer, { style: { textAlign: 'center' } }, "Ant Design \u00A92018 Created by Ant UED")); };
