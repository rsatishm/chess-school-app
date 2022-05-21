"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
var Option = antd_1.Select.Option;
function onChange(value) {
    console.log("selected " + value);
}
function onSearch(val) {
    console.log('search:', val);
}
ReactDOM.render(React.createElement(antd_1.Select, { showSearch: true, placeholder: "Select a person", optionFilterProp: "children", onChange: onChange, onSearch: onSearch, filterOption: function (input, option) {
        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    } },
    React.createElement(Option, { value: "jack" }, "Jack"),
    React.createElement(Option, { value: "lucy" }, "Lucy"),
    React.createElement(Option, { value: "tom" }, "Tom")), mountNode);
