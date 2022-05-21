"use strict";
exports.__esModule = true;
exports.AntdGridFlexStretch = void 0;
var antd_1 = require("antd");
exports.AntdGridFlexStretch = function () { return React.createElement(React.Fragment, null,
    React.createElement(antd_1.Divider, { orientation: "left" }, "Percentage columns"),
    React.createElement(antd_1.Row, null,
        React.createElement(antd_1.Col, { flex: 2 }, "2 / 5"),
        React.createElement(antd_1.Col, { flex: 3 }, "3 / 5")),
    React.createElement(antd_1.Divider, { orientation: "left" }, "Fill rest"),
    React.createElement(antd_1.Row, null,
        React.createElement(antd_1.Col, { flex: "100px" }, "100px"),
        React.createElement(antd_1.Col, { flex: "auto" }, "Fill Rest")),
    React.createElement(antd_1.Divider, { orientation: "left" }, "Raw flex style"),
    React.createElement(antd_1.Row, null,
        React.createElement(antd_1.Col, { flex: "1 1 200px" }, "1 1 200px"),
        React.createElement(antd_1.Col, { flex: "0 1 300px" }, "0 1 300px")),
    React.createElement(antd_1.Row, { wrap: false },
        React.createElement(antd_1.Col, { flex: "none" },
            React.createElement("div", { style: { padding: '0 16px' } }, "none")),
        React.createElement(antd_1.Col, { flex: "auto" }, "auto with no-wrap"))); };
