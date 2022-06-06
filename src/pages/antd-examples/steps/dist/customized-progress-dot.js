"use strict";
exports.__esModule = true;
exports.AntdStepsCustomizedProgressDot = void 0;
var antd_1 = require("antd");
var Step = antd_1.Steps.Step;
var customDot = function (dot, _a) {
    var status = _a.status, index = _a.index;
    return (React.createElement(antd_1.Popover, { content: React.createElement("span", null,
            "step ",
            index,
            " status: ",
            status) }, dot));
};
exports.AntdStepsCustomizedProgressDot = function () { return React.createElement(antd_1.Steps, { current: 1, progressDot: customDot },
    React.createElement(Step, { title: "Finished", description: "You can hover on the dot." }),
    React.createElement(Step, { title: "In Progress", description: "You can hover on the dot." }),
    React.createElement(Step, { title: "Waiting", description: "You can hover on the dot." }),
    React.createElement(Step, { title: "Waiting", description: "You can hover on the dot." })); };
