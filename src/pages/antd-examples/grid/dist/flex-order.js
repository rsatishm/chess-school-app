"use strict";
exports.__esModule = true;
exports.AntdGridFlexOrder = void 0;
var antd_1 = require("antd");
exports.AntdGridFlexOrder = function () { return React.createElement(React.Fragment, null,
    React.createElement(antd_1.Divider, { orientation: "left" }, "Normal"),
    React.createElement(antd_1.Row, null,
        React.createElement(antd_1.Col, { span: 6, order: 4 }, "1 col-order-4"),
        React.createElement(antd_1.Col, { span: 6, order: 3 }, "2 col-order-3"),
        React.createElement(antd_1.Col, { span: 6, order: 2 }, "3 col-order-2"),
        React.createElement(antd_1.Col, { span: 6, order: 1 }, "4 col-order-1")),
    React.createElement(antd_1.Divider, { orientation: "left" }, "Responsive"),
    React.createElement(antd_1.Row, null,
        React.createElement(antd_1.Col, { span: 6, xs: { order: 1 }, sm: { order: 2 }, md: { order: 3 }, lg: { order: 4 } }, "1 col-order-responsive"),
        React.createElement(antd_1.Col, { span: 6, xs: { order: 2 }, sm: { order: 1 }, md: { order: 4 }, lg: { order: 3 } }, "2 col-order-responsive"),
        React.createElement(antd_1.Col, { span: 6, xs: { order: 3 }, sm: { order: 4 }, md: { order: 2 }, lg: { order: 1 } }, "3 col-order-responsive"),
        React.createElement(antd_1.Col, { span: 6, xs: { order: 4 }, sm: { order: 3 }, md: { order: 1 }, lg: { order: 2 } }, "4 col-order-responsive"))); };
