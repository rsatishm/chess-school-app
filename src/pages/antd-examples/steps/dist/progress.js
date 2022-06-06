"use strict";
exports.__esModule = true;
exports.AntdStepsProgress = void 0;
var antd_1 = require("antd");
var Step = antd_1.Steps.Step;
exports.AntdStepsProgress = function () { return React.createElement(antd_1.Steps, { current: 1, percent: 60 },
    React.createElement(Step, { title: "Finished", description: "This is a description." }),
    React.createElement(Step, { title: "In Progress", subTitle: "Left 00:00:08", description: "This is a description." }),
    React.createElement(Step, { title: "Waiting", description: "This is a description." })); };
