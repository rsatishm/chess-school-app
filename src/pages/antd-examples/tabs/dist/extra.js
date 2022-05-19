"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.AntdTabsExtra = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var TabPane = antd_1.Tabs.TabPane;
var CheckboxGroup = antd_1.Checkbox.Group;
var operations = react_1["default"].createElement(antd_1.Button, null, "Extra Action");
var OperationsSlot = {
    left: react_1["default"].createElement(antd_1.Button, { className: "tabs-extra-demo-button" }, "Left Extra Action"),
    right: react_1["default"].createElement(antd_1.Button, null, "Right Extra Action")
};
var options = ['left', 'right'];
exports.AntdTabsExtra = function () {
    var _a = react_1["default"].useState(['left', 'right']), position = _a[0], setPosition = _a[1];
    var slot = react_1["default"].useMemo(function () {
        if (position.length === 0)
            return null;
        return position.reduce(function (acc, direction) {
            var _a;
            return (__assign(__assign({}, acc), (_a = {}, _a[direction] = OperationsSlot[direction], _a)));
        }, {});
    }, [position]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Tabs, { tabBarExtraContent: operations },
            react_1["default"].createElement(TabPane, { tab: "Tab 1", key: "1" }, "Content of tab 1"),
            react_1["default"].createElement(TabPane, { tab: "Tab 2", key: "2" }, "Content of tab 2"),
            react_1["default"].createElement(TabPane, { tab: "Tab 3", key: "3" }, "Content of tab 3")),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("div", null, "You can also specify its direction or both side"),
        react_1["default"].createElement(antd_1.Divider, null),
        react_1["default"].createElement(CheckboxGroup, { options: options, value: position, onChange: function (value) {
                setPosition(value);
            } }),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement(antd_1.Tabs, { tabBarExtraContent: slot },
            react_1["default"].createElement(TabPane, { tab: "Tab 1", key: "1" }, "Content of tab 1"),
            react_1["default"].createElement(TabPane, { tab: "Tab 2", key: "2" }, "Content of tab 2"),
            react_1["default"].createElement(TabPane, { tab: "Tab 3", key: "3" }, "Content of tab 3"))));
};
