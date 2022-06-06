"use strict";
exports.__esModule = true;
exports.AntdStepsSmallSize = void 0;
var antd_1 = require("antd");
var Step = antd_1.Steps.Step;
exports.AntdStepsSmallSize = function () { return React.createElement(antd_1.Steps, { size: "small", current: 1 },
    React.createElement(Step, { title: "Finished" }),
    React.createElement(Step, { title: "In Progress" }),
    React.createElement(Step, { title: "Waiting" })); };
