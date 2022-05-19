"use strict";
exports.__esModule = true;
exports.AntdTabsCard = void 0;
var antd_1 = require("antd");
var TabPane = antd_1.Tabs.TabPane;
function callback(key) {
    console.log(key);
}
exports.AntdTabsCard = function () { return React.createElement(antd_1.Tabs, { onChange: callback, type: "card" },
    React.createElement(TabPane, { tab: "Tab 1", key: "1" }, "Content of Tab Pane 1"),
    React.createElement(TabPane, { tab: "Tab 2", key: "2" }, "Content of Tab Pane 2"),
    React.createElement(TabPane, { tab: "Tab 3", key: "3" }, "Content of Tab Pane 3")); };
