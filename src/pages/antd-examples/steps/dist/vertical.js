"use strict";
exports.__esModule = true;
exports.AntdStepsVertical = void 0;
var antd_1 = require("antd");
var Step = antd_1.Steps.Step;
exports.AntdStepsVertical = function () { return React.createElement(antd_1.Steps, { direction: "vertical", current: 1 },
    React.createElement(Step, { title: "Finished", description: "This is a description." }),
    React.createElement(Step, { title: "In Progress", description: "This is a description." }),
    React.createElement(Step, { title: "Waiting", description: "This is a description." })); };
