"use strict";
exports.__esModule = true;
exports.AntdSpaceVertical = void 0;
var antd_1 = require("antd");
function AntdSpaceVertical() {
    return (React.createElement(antd_1.Space, { direction: "vertical" },
        React.createElement(antd_1.Card, { title: "Card", style: { width: 300 } },
            React.createElement("p", null, "Card content"),
            React.createElement("p", null, "Card content")),
        React.createElement(antd_1.Card, { title: "Card", style: { width: 300 } },
            React.createElement("p", null, "Card content"),
            React.createElement("p", null, "Card content"))));
}
exports.AntdSpaceVertical = AntdSpaceVertical;
