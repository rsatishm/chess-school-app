"use strict";
exports.__esModule = true;
exports.AntdModalInfo = void 0;
var antd_1 = require("antd");
function info() {
    antd_1.Modal.info({
        title: 'This is a notification message',
        content: (React.createElement("div", null,
            React.createElement("p", null, "some messages...some messages..."),
            React.createElement("p", null, "some messages...some messages..."))),
        onOk: function () { }
    });
}
function success() {
    antd_1.Modal.success({
        content: 'some messages...some messages...'
    });
}
function error() {
    antd_1.Modal.error({
        title: 'This is an error message',
        content: 'some messages...some messages...'
    });
}
function warning() {
    antd_1.Modal.warning({
        title: 'This is a warning message',
        content: 'some messages...some messages...'
    });
}
exports.AntdModalInfo = function () { return React.createElement(antd_1.Space, { wrap: true },
    React.createElement(antd_1.Button, { onClick: info }, "Info"),
    React.createElement(antd_1.Button, { onClick: success }, "Success"),
    React.createElement(antd_1.Button, { onClick: error }, "Error"),
    React.createElement(antd_1.Button, { onClick: warning }, "Warning")); };
