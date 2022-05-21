"use strict";
exports.__esModule = true;
exports.AntdSelectDebug = void 0;
var antd_1 = require("antd");
var Option = antd_1.Select.Option;
function handleChange(value) {
    console.log("selected " + value);
}
exports.AntdSelectDebug = function () { return React.createElement("div", { style: {
        width: 500,
        position: 'relative',
        zIndex: 1,
        border: '1px solid red',
        background: '#FFF'
    } },
    React.createElement(antd_1.Input, { style: { width: 100 }, value: "222" }),
    React.createElement(antd_1.Select, { style: { width: 120 }, onChange: handleChange, showSearch: true, placeholder: "233" },
        React.createElement(Option, { value: "jack" }, "Jack"),
        React.createElement(Option, { value: "lucy" }, "Lucy"),
        React.createElement(Option, { value: "disabled", disabled: true }, "Disabled"),
        React.createElement(Option, { value: "Yiminghe" }, "yiminghe"),
        React.createElement(Option, { value: "long" }, "I am super super long!")),
    React.createElement(antd_1.Select, { mode: "multiple", style: { width: 120 }, defaultValue: ['lucy'], onChange: handleChange, showSearch: true, placeholder: "233" },
        React.createElement(Option, { value: "jack" }, "Jack"),
        React.createElement(Option, { value: "lucy" }, "Lucy"),
        React.createElement(Option, { value: "disabled", disabled: true }, "Disabled"),
        React.createElement(Option, { value: "Yiminghe" }, "yiminghe"),
        React.createElement(Option, { value: "long" }, "I am super super long!")),
    React.createElement("span", { className: "debug-align" }, "AntDesign"),
    React.createElement(antd_1.Button, null, "222")); };
