"use strict";
exports.__esModule = true;
exports.AntdStesStepsInSteps = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var Step = antd_1.Steps.Step;
exports.AntdStesStepsInSteps = function () {
    var _a = react_1.useState('default'), size = _a[0], setSize = _a[1];
    var horizontalSteps = (react_1["default"].createElement(antd_1.Card, null,
        react_1["default"].createElement(antd_1.Steps, { size: size },
            react_1["default"].createElement(Step, { title: "Finished", description: "This is a description." }),
            react_1["default"].createElement(Step, { title: "In Progress", description: "This is a description." }),
            react_1["default"].createElement(Step, { title: "Waiting", description: "This is a description." }))));
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Radio.Group, { style: { marginBottom: 16 }, value: size, onChange: function (e) { return setSize(e.target.value); } },
            react_1["default"].createElement(antd_1.Radio, { value: "small" }, "Small"),
            react_1["default"].createElement(antd_1.Radio, { value: "default" }, "Default")),
        react_1["default"].createElement(antd_1.Steps, { size: size, direction: "vertical" },
            react_1["default"].createElement(Step, { title: "Finished", description: horizontalSteps }),
            react_1["default"].createElement(Step, { title: "In Progress", description: "This is a description." }),
            react_1["default"].createElement(Step, { title: "Waiting", description: "This is a description." }))));
};
