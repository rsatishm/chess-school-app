"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AntdTransferBasic = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var mockData = [];
for (var i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        title: "content" + (i + 1),
        description: "description of content" + (i + 1)
    });
}
var initialTargetKeys = mockData.filter(function (item) { return +item.key > 10; }).map(function (item) { return item.key; });
exports.AntdTransferBasic = function () {
    var _a = react_1.useState(initialTargetKeys), targetKeys = _a[0], setTargetKeys = _a[1];
    var _b = react_1.useState([]), selectedKeys = _b[0], setSelectedKeys = _b[1];
    var onChange = function (nextTargetKeys, direction, moveKeys) {
        console.log('targetKeys:', nextTargetKeys);
        console.log('direction:', direction);
        console.log('moveKeys:', moveKeys);
        setTargetKeys(nextTargetKeys);
    };
    var onSelectChange = function (sourceSelectedKeys, targetSelectedKeys) {
        console.log('sourceSelectedKeys:', sourceSelectedKeys);
        console.log('targetSelectedKeys:', targetSelectedKeys);
        setSelectedKeys(__spreadArrays(sourceSelectedKeys, targetSelectedKeys));
    };
    var onScroll = function (direction, e) {
        console.log('direction:', direction);
        console.log('target:', e.target);
    };
    return (react_1["default"].createElement(antd_1.Transfer, { dataSource: mockData, titles: ['Source', 'Target'], targetKeys: targetKeys, selectedKeys: selectedKeys, onChange: onChange, onSelectChange: onSelectChange, onScroll: onScroll, render: function (item) { return item.title; } }));
};
