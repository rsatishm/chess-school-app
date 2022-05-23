"use strict";
exports.__esModule = true;
exports.AntdModalHooks = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var ReachableContext = react_1["default"].createContext({});
var UnreachableContext = react_1["default"].createContext({});
var config = {
    title: 'Use Hook!',
    content: (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(ReachableContext.Consumer, null, function (name) { return "Reachable: " + name + "!"; }),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement(UnreachableContext.Consumer, null, function (name) { return "Unreachable: " + name + "!"; })))
};
exports.AntdModalHooks = function () {
    var _a = antd_1.Modal.useModal(), modal = _a[0], contextHolder = _a[1];
    return (react_1["default"].createElement(ReachableContext.Provider, { value: "Light" },
        react_1["default"].createElement(antd_1.Space, null,
            react_1["default"].createElement(antd_1.Button, { onClick: function () {
                    modal.confirm(config);
                } }, "Confirm"),
            react_1["default"].createElement(antd_1.Button, { onClick: function () {
                    modal.warning(config);
                } }, "Warning"),
            react_1["default"].createElement(antd_1.Button, { onClick: function () {
                    modal.info(config);
                } }, "Info"),
            react_1["default"].createElement(antd_1.Button, { onClick: function () {
                    modal.error(config);
                } }, "Error")),
        contextHolder,
        react_1["default"].createElement(UnreachableContext.Provider, { value: "Bamboo" })));
};
