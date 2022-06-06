"use strict";
exports.__esModule = true;
exports.AntdStepsProgressDot = void 0;
var antd_1 = require("antd");
var Step = antd_1.Steps.Step;
exports.AntdStepsProgressDot = function () { return React.createElement(React.Fragment, null,
    React.createElement(antd_1.Steps, { progressDot: true, current: 1 },
        React.createElement(Step, { title: "Finished", description: "This is a description." }),
        React.createElement(Step, { title: "In Progress", description: "This is a description." }),
        React.createElement(Step, { title: "Waiting", description: "This is a description." })),
    React.createElement(antd_1.Divider, null),
    React.createElement(antd_1.Steps, { progressDot: true, current: 1, direction: "vertical" },
        React.createElement(Step, { title: "Finished", description: "This is a description. This is a description." }),
        React.createElement(Step, { title: "Finished", description: "This is a description. This is a description." }),
        React.createElement(Step, { title: "In Progress", description: "This is a description. This is a description." }),
        React.createElement(Step, { title: "Waiting", description: "This is a description." }),
        React.createElement(Step, { title: "Waiting", description: "This is a description." }))); };
