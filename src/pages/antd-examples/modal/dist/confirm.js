"use strict";
exports.__esModule = true;
exports.AntdModalConfirm = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var confirm = antd_1.Modal.confirm;
function showConfirm() {
    confirm({
        title: 'Do you Want to delete these items?',
        icon: React.createElement(icons_1.ExclamationCircleOutlined, null),
        content: 'Some descriptions',
        onOk: function () {
            console.log('OK');
        },
        onCancel: function () {
            console.log('Cancel');
        }
    });
}
function showPromiseConfirm() {
    confirm({
        title: 'Do you want to delete these items?',
        icon: React.createElement(icons_1.ExclamationCircleOutlined, null),
        content: 'When clicked the OK button, this dialog will be closed after 1 second',
        onOk: function () {
            return new Promise(function (resolve, reject) {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            })["catch"](function () { return console.log('Oops errors!'); });
        },
        onCancel: function () { }
    });
}
function showDeleteConfirm() {
    confirm({
        title: 'Are you sure delete this task?',
        icon: React.createElement(icons_1.ExclamationCircleOutlined, null),
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: function () {
            console.log('OK');
        },
        onCancel: function () {
            console.log('Cancel');
        }
    });
}
function showPropsConfirm() {
    confirm({
        title: 'Are you sure delete this task?',
        icon: React.createElement(icons_1.ExclamationCircleOutlined, null),
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        okButtonProps: {
            disabled: true
        },
        cancelText: 'No',
        onOk: function () {
            console.log('OK');
        },
        onCancel: function () {
            console.log('Cancel');
        }
    });
}
exports.AntdModalConfirm = function () { return React.createElement(antd_1.Space, { wrap: true },
    React.createElement(antd_1.Button, { onClick: showConfirm }, "Confirm"),
    React.createElement(antd_1.Button, { onClick: showPromiseConfirm }, "With promise"),
    React.createElement(antd_1.Button, { onClick: showDeleteConfirm, type: "dashed" }, "Delete"),
    React.createElement(antd_1.Button, { onClick: showPropsConfirm, type: "dashed" }, "With extra props")); };
