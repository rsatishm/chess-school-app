"use strict";
exports.__esModule = true;
exports.AntdSpaceGapInLine = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var style = {
    width: 150,
    height: 100,
    background: 'red'
};
exports.AntdSpaceGapInLine = function () {
    var _a = react_1["default"].useState(false), singleCol = _a[0], setSingleCol = _a[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Switch, { checked: singleCol, onChange: function () {
                setSingleCol(!singleCol);
            } }),
        react_1["default"].createElement("div", { style: { boxShadow: '0 0 5px green' } },
            react_1["default"].createElement(antd_1.Space, { style: { width: singleCol ? 307 : 310, background: 'blue' }, size: [8, 8], wrap: true },
                react_1["default"].createElement("div", { style: style }),
                react_1["default"].createElement("div", { style: style }),
                react_1["default"].createElement("div", { style: style }),
                react_1["default"].createElement("div", { style: style })))));
};
