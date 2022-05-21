"use strict";
exports.__esModule = true;
exports.AntdSelectCoordinate = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var Option = antd_1.Select.Option;
var provinceData = ['Zhejiang', 'Jiangsu'];
var cityData = {
    Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
    Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang']
};
exports.AntdSelectCoordinate = function () {
    var _a = react_1["default"].useState(cityData[provinceData[0]]), cities = _a[0], setCities = _a[1];
    var _b = react_1["default"].useState(cityData[provinceData[0]][0]), secondCity = _b[0], setSecondCity = _b[1];
    var handleProvinceChange = function (value) {
        setCities(cityData[value]);
        setSecondCity(cityData[value][0]);
    };
    var onSecondCityChange = function (value) {
        setSecondCity(value);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Select, { defaultValue: provinceData[0], style: { width: 120 }, onChange: handleProvinceChange }, provinceData.map(function (province) { return (react_1["default"].createElement(Option, { key: province }, province)); })),
        react_1["default"].createElement(antd_1.Select, { style: { width: 120 }, value: secondCity, onChange: onSecondCityChange }, cities.map(function (city) { return (react_1["default"].createElement(Option, { key: city }, city)); }))));
};
