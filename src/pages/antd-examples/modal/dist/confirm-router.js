"use strict";
exports.__esModule = true;
exports.AntdModalConfirmRouter = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
function destroyAll() {
    antd_1.Modal.destroyAll();
}
var confirm = antd_1.Modal.confirm;
function showConfirm() {
    for (var i = 0; i < 3; i += 1) {
        setTimeout(function () {
            confirm({
                icon: React.createElement(icons_1.ExclamationCircleOutlined, null),
                content: React.createElement(antd_1.Button, { onClick: destroyAll }, "Click to destroy all"),
                onOk: function () {
                    console.log('OK');
                },
                onCancel: function () {
                    console.log('Cancel');
                }
            });
        }, i * 500);
    }
}
exports.AntdModalConfirmRouter = function () { return React.createElement(antd_1.Button, { onClick: showConfirm }, "Confirm"); };
