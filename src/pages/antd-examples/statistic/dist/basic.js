"use strict";
exports.__esModule = true;
exports.AntdStatisticBasic = void 0;
var antd_1 = require("antd");
exports.AntdStatisticBasic = function () { return React.createElement(antd_1.Row, { gutter: 16 },
    React.createElement(antd_1.Col, { span: 12 },
        React.createElement(antd_1.Statistic, { title: "Active Users", value: 112893 })),
    React.createElement(antd_1.Col, { span: 12 },
        React.createElement(antd_1.Statistic, { title: "Account Balance (CNY)", value: 112893, precision: 2 }),
        React.createElement(antd_1.Button, { style: { marginTop: 16 }, type: "primary" }, "Recharge")),
    React.createElement(antd_1.Col, { span: 12 },
        React.createElement(antd_1.Statistic, { title: "Active Users", value: 112893, loading: true }))); };
