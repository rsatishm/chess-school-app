"use strict";
exports.__esModule = true;
exports.AntdStatisticUnit = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
exports.AntdStatisticUnit = function () { return React.createElement(antd_1.Row, { gutter: 16 },
    React.createElement(antd_1.Col, { span: 12 },
        React.createElement(antd_1.Statistic, { title: "Feedback", value: 1128, prefix: React.createElement(icons_1.LikeOutlined, null) })),
    React.createElement(antd_1.Col, { span: 12 },
        React.createElement(antd_1.Statistic, { title: "Unmerged", value: 93, suffix: "/ 100" }))); };
