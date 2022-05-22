"use strict";
exports.__esModule = true;
exports.AntdStatisticCard = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
exports.AntdStatisticCard = function () { return React.createElement("div", { className: "site-statistic-demo-card" },
    React.createElement(antd_1.Row, { gutter: 16 },
        React.createElement(antd_1.Col, { span: 12 },
            React.createElement(antd_1.Card, null,
                React.createElement(antd_1.Statistic, { title: "Active", value: 11.28, precision: 2, valueStyle: { color: '#3f8600' }, prefix: React.createElement(icons_1.ArrowUpOutlined, null), suffix: "%" }))),
        React.createElement(antd_1.Col, { span: 12 },
            React.createElement(antd_1.Card, null,
                React.createElement(antd_1.Statistic, { title: "Idle", value: 9.3, precision: 2, valueStyle: { color: '#cf1322' }, prefix: React.createElement(icons_1.ArrowDownOutlined, null), suffix: "%" }))))); };
