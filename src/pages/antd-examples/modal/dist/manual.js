"use strict";
exports.__esModule = true;
exports.AntdModalManual = void 0;
var antd_1 = require("antd");
function countDown() {
    var secondsToGo = 5;
    var modal = antd_1.Modal.success({
        title: 'This is a notification message',
        content: "This modal will be destroyed after " + secondsToGo + " second."
    });
    var timer = setInterval(function () {
        secondsToGo -= 1;
        modal.update({
            content: "This modal will be destroyed after " + secondsToGo + " second."
        });
    }, 1000);
    setTimeout(function () {
        clearInterval(timer);
        modal.destroy();
    }, secondsToGo * 1000);
}
exports.AntdModalManual = function () { return React.createElement(antd_1.Button, { onClick: countDown }, "Open modal to close in 5s"); };
