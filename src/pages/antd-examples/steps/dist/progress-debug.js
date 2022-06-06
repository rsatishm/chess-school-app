"use strict";
exports.__esModule = true;
exports.AntdStepsProgressDebug = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var Step = antd_1.Steps.Step;
function AntdStepsProgressDebug() {
    var _a = react_1["default"].useState(0), percent = _a[0], setPercentage = _a[1];
    var _b = react_1["default"].useState(1), current = _b[0], setCurrent = _b[1];
    var _c = react_1["default"].useState('process'), status = _c[0], setStatus = _c[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Button, { onClick: function () { return setPercentage(undefined); } }, "Percentage to undefined"),
        react_1["default"].createElement(antd_1.Button, { onClick: function () { return setPercentage((percent + 10) % 100); } }, "Percentage +"),
        react_1["default"].createElement(antd_1.Button, { onClick: function () {
                setCurrent((current + 1) % 3);
                setPercentage(0);
            } }, "Current +"),
        react_1["default"].createElement(antd_1.Button, { onClick: function () { return setStatus('wait'); } }, "Status Wait"),
        react_1["default"].createElement(antd_1.Button, { onClick: function () { return setStatus('process'); } }, "Status Process"),
        react_1["default"].createElement(antd_1.Button, { onClick: function () { return setStatus('finish'); } }, "Status Finish"),
        react_1["default"].createElement(antd_1.Button, { onClick: function () { return setStatus('error'); } }, "Status Error"),
        react_1["default"].createElement(antd_1.Steps, { current: current, percent: percent, status: status },
            react_1["default"].createElement(Step, { title: "Finished", description: "This is a description." }),
            react_1["default"].createElement(Step, { title: "In Progress", subTitle: "Left 00:00:08", description: "This is a description." }),
            react_1["default"].createElement(Step, { title: "Waiting", description: "This is a description." })),
        react_1["default"].createElement(antd_1.Steps, { current: current, percent: percent, status: status, size: "small" },
            react_1["default"].createElement(Step, { title: "Finished", description: "This is a description." }),
            react_1["default"].createElement(Step, { title: "In Progress", subTitle: "Left 00:00:08", description: "This is a description." }),
            react_1["default"].createElement(Step, { title: "Waiting", description: "This is a description." })),
        react_1["default"].createElement(antd_1.Steps, { current: current, percent: percent, status: status, direction: "vertical" },
            react_1["default"].createElement(Step, { title: "Finished", description: "This is a description." }),
            react_1["default"].createElement(Step, { title: "In Progress", subTitle: "Left 00:00:08", description: "This is a description." }),
            react_1["default"].createElement(Step, { title: "Waiting", description: "This is a description." })),
        react_1["default"].createElement(antd_1.Steps, { current: current, percent: percent, status: status, size: "small", direction: "vertical" },
            react_1["default"].createElement(Step, { title: "Finished", description: "This is a description." }),
            react_1["default"].createElement(Step, { title: "In Progress", subTitle: "Left 00:00:08", description: "This is a description." }),
            react_1["default"].createElement(Step, { title: "Waiting", description: "This is a description." }))));
}
exports.AntdStepsProgressDebug = AntdStepsProgressDebug;
