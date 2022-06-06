"use strict";
exports.__esModule = true;
exports.AntdStepsStepNext = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var Step = antd_1.Steps.Step;
var steps = [
    {
        title: 'First',
        content: 'First-content'
    },
    {
        title: 'Second',
        content: 'Second-content'
    },
    {
        title: 'Last',
        content: 'Last-content'
    },
];
exports.AntdStepsStepNext = function () {
    var _a = react_1["default"].useState(0), current = _a[0], setCurrent = _a[1];
    var next = function () {
        setCurrent(current + 1);
    };
    var prev = function () {
        setCurrent(current - 1);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Steps, { current: current }, steps.map(function (item) { return (react_1["default"].createElement(Step, { key: item.title, title: item.title })); })),
        react_1["default"].createElement("div", { className: "steps-content" }, steps[current].content),
        react_1["default"].createElement("div", { className: "steps-action" },
            current < steps.length - 1 && (react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: function () { return next(); } }, "Next")),
            current === steps.length - 1 && (react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: function () { return antd_1.message.success('Processing complete!'); } }, "Done")),
            current > 0 && (react_1["default"].createElement(antd_1.Button, { style: { margin: '0 8px' }, onClick: function () { return prev(); } }, "Previous")))));
};
