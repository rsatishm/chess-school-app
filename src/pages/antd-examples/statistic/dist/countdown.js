"use strict";
exports.__esModule = true;
exports.AntdStatisticCountDown = void 0;
var antd_1 = require("antd");
var Countdown = antd_1.Statistic.Countdown;
var deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
function onFinish() {
    console.log('finished!');
}
function onChange(val) {
    if (4.95 * 1000 < val && val < 5 * 1000) {
        console.log('changed!');
    }
}
exports.AntdStatisticCountDown = function () { return React.createElement(antd_1.Row, { gutter: 16 },
    React.createElement(antd_1.Col, { span: 12 },
        React.createElement(Countdown, { title: "Countdown", value: deadline, onFinish: onFinish })),
    React.createElement(antd_1.Col, { span: 12 },
        React.createElement(Countdown, { title: "Million Seconds", value: deadline, format: "HH:mm:ss:SSS" })),
    React.createElement(antd_1.Col, { span: 24, style: { marginTop: 32 } },
        React.createElement(Countdown, { title: "Day Level", value: deadline, format: "D \u5929 H \u65F6 m \u5206 s \u79D2" })),
    React.createElement(antd_1.Col, { span: 12 },
        React.createElement(Countdown, { title: "Countdown", value: Date.now() + 10 * 1000, onChange: onChange }))); };
