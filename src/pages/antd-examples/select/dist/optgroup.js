"use strict";
exports.__esModule = true;
exports.AntdSelectOptGroup = void 0;
var antd_1 = require("antd");
var Option = antd_1.Select.Option, OptGroup = antd_1.Select.OptGroup;
function handleChange(value) {
    console.log("selected " + value);
}
exports.AntdSelectOptGroup = function () { return React.createElement(antd_1.Select, { defaultValue: "lucy", style: { width: 200 }, onChange: handleChange },
    React.createElement(OptGroup, { label: "Manager" },
        React.createElement(Option, { value: "jack" }, "Jack"),
        React.createElement(Option, { value: "lucy" }, "Lucy")),
    React.createElement(OptGroup, { label: "Engineer" },
        React.createElement(Option, { value: "Yiminghe" }, "yiminghe"))); };
