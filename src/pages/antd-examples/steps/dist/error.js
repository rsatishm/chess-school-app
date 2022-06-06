"use strict";
exports.__esModule = true;
exports.AntdStepsError = void 0;
var antd_1 = require("antd");
var Step = antd_1.Steps.Step;
exports.AntdStepsError = function () { return React.createElement(antd_1.Steps, { current: 1, status: "error" },
    React.createElement(Step, { title: "Finished", description: "This is a description" }),
    React.createElement(Step, { title: "In Process", description: "This is a description" }),
    React.createElement(Step, { title: "Waiting", description: "This is a description" })); };
