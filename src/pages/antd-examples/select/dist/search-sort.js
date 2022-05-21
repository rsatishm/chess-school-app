"use strict";
exports.__esModule = true;
exports.AntdSelectSearchSort = void 0;
var antd_1 = require("antd");
var Option = antd_1.Select.Option;
exports.AntdSelectSearchSort = function () { return React.createElement(antd_1.Select, { showSearch: true, style: { width: 200 }, placeholder: "Search to Select", optionFilterProp: "children", filterOption: function (input, option) {
        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    }, filterSort: function (optionA, optionB) {
        return optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase());
    } },
    React.createElement(Option, { value: "1" }, "Not Identified"),
    React.createElement(Option, { value: "2" }, "Closed"),
    React.createElement(Option, { value: "3" }, "Communicated"),
    React.createElement(Option, { value: "4" }, "Identified"),
    React.createElement(Option, { value: "5" }, "Resolved"),
    React.createElement(Option, { value: "6" }, "Cancelled")); };
