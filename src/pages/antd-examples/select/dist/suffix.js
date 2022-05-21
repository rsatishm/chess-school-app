"use strict";
exports.__esModule = true;
exports.AntdSelectSuffix = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var smileIcon = React.createElement(icons_1.SmileOutlined, null);
var mehIcon = React.createElement(icons_1.MehOutlined, null);
var Option = antd_1.Select.Option;
function handleChange(value) {
    console.log("selected " + value);
}
exports.AntdSelectSuffix = function () { return React.createElement(React.Fragment, null,
    React.createElement(antd_1.Select, { suffixIcon: smileIcon, defaultValue: "lucy", style: { width: 120 }, onChange: handleChange },
        React.createElement(Option, { value: "jack" }, "Jack"),
        React.createElement(Option, { value: "lucy" }, "Lucy"),
        React.createElement(Option, { value: "disabled", disabled: true }, "Disabled"),
        React.createElement(Option, { value: "Yiminghe" }, "yiminghe")),
    React.createElement(antd_1.Select, { suffixIcon: mehIcon, defaultValue: "lucy", style: { width: 120 }, disabled: true },
        React.createElement(Option, { value: "lucy" }, "Lucy"))); };
