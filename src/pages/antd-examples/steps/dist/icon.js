"use strict";
exports.__esModule = true;
exports.AntdStepsIcon = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var Step = antd_1.Steps.Step;
exports.AntdStepsIcon = function () { return React.createElement(antd_1.Steps, null,
    React.createElement(Step, { status: "finish", title: "Login", icon: React.createElement(icons_1.UserOutlined, null) }),
    React.createElement(Step, { status: "finish", title: "Verification", icon: React.createElement(icons_1.SolutionOutlined, null) }),
    React.createElement(Step, { status: "process", title: "Pay", icon: React.createElement(icons_1.LoadingOutlined, null) }),
    React.createElement(Step, { status: "wait", title: "Done", icon: React.createElement(icons_1.SmileOutlined, null) })); };
