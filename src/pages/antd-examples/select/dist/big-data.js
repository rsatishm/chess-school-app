"use strict";
exports.__esModule = true;
exports.AntdSelectBigData = void 0;
var antd_1 = require("antd");
var Title = antd_1.Typography.Title;
var options = [];
for (var i = 0; i < 100000; i++) {
    var value = "" + i.toString(36) + i;
    options.push({
        value: value,
        disabled: i === 10
    });
}
function handleChange(value) {
    console.log("selected " + value);
}
exports.AntdSelectBigData = function () { return React.createElement(React.Fragment, null,
    React.createElement(Title, { level: 3 }, "Ant Design 4.0"),
    React.createElement(Title, { level: 4 },
        options.length,
        " Items"),
    React.createElement(antd_1.Select, { mode: "multiple", style: { width: '100%' }, placeholder: "Please select", defaultValue: ['a10', 'c12'], onChange: handleChange, options: options }),
    React.createElement(antd_1.Divider, null),
    React.createElement(Title, { level: 3 }, "Ant Design 3.0"),
    React.createElement("iframe", { title: "Ant Design 3.0 Select demo", src: "https://codesandbox.io/embed/solitary-voice-m3vme?fontsize=14&hidenavigation=1&theme=dark&view=preview", style: { width: '100%', height: 300 } })); };
