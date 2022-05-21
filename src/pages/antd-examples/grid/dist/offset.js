"use strict";
exports.__esModule = true;
exports.AntdGridOffset = void 0;
var antd_1 = require("antd");
exports.AntdGridOffset = function () { return React.createElement(React.Fragment, null,
    React.createElement(antd_1.Row, null,
        React.createElement(antd_1.Col, { span: 8 }, "col-8"),
        React.createElement(antd_1.Col, { span: 8, offset: 8 }, "col-8")),
    React.createElement(antd_1.Row, null,
        React.createElement(antd_1.Col, { span: 6, offset: 6 }, "col-6 col-offset-6"),
        React.createElement(antd_1.Col, { span: 6, offset: 6 }, "col-6 col-offset-6")),
    React.createElement(antd_1.Row, null,
        React.createElement(antd_1.Col, { span: 12, offset: 6 }, "col-12 col-offset-6"))); };
