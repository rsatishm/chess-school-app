"use strict";
exports.__esModule = true;
exports.AntdSpaceAlign = void 0;
var antd_1 = require("antd");
exports.AntdSpaceAlign = function () { return React.createElement("div", { className: "space-align-container" },
    React.createElement("div", { className: "space-align-block" },
        React.createElement(antd_1.Space, { align: "center" },
            "center",
            React.createElement(antd_1.Button, { type: "primary" }, "Primary"),
            React.createElement("span", { className: "mock-block" }, "Block"))),
    React.createElement("div", { className: "space-align-block" },
        React.createElement(antd_1.Space, { align: "start" },
            "start",
            React.createElement(antd_1.Button, { type: "primary" }, "Primary"),
            React.createElement("span", { className: "mock-block" }, "Block"))),
    React.createElement("div", { className: "space-align-block" },
        React.createElement(antd_1.Space, { align: "end" },
            "end",
            React.createElement(antd_1.Button, { type: "primary" }, "Primary"),
            React.createElement("span", { className: "mock-block" }, "Block"))),
    React.createElement("div", { className: "space-align-block" },
        React.createElement(antd_1.Space, { align: "baseline" },
            "baseline",
            React.createElement(antd_1.Button, { type: "primary" }, "Primary"),
            React.createElement("span", { className: "mock-block" }, "Block")))); };
