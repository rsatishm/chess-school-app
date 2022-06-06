"use strict";
exports.__esModule = true;
exports.AntdStepsSimple = void 0;
var antd_1 = require("antd");
var Step = antd_1.Steps.Step;
exports.AntdStepsSimple = function () { return React.createElement(antd_1.Steps, { current: 1 },
    React.createElement(Step, { title: "Finished", description: "This is a description." }),
    React.createElement(Step, { title: "In Progress", subTitle: "Left 00:00:08", description: "This is a description." }),
    React.createElement(Step, { title: "Waiting", description: "This is a description." })); };
