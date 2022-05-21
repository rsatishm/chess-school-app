"use strict";
exports.__esModule = true;
exports.AntdFormInModal = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var CollectionCreateForm = function (_a) {
    var visible = _a.visible, onCreate = _a.onCreate, onCancel = _a.onCancel;
    var form = antd_1.Form.useForm()[0];
    return (react_1["default"].createElement(antd_1.Modal, { visible: visible, title: "Create a new collection", okText: "Create", cancelText: "Cancel", onCancel: onCancel, onOk: function () {
            form
                .validateFields()
                .then(function (values) {
                form.resetFields();
                onCreate(values);
            })["catch"](function (info) {
                console.log('Validate Failed:', info);
            });
        } },
        react_1["default"].createElement(antd_1.Form, { form: form, layout: "vertical", name: "form_in_modal", initialValues: { modifier: 'public' } },
            react_1["default"].createElement(antd_1.Form.Item, { name: "title", label: "Title", rules: [{ required: true, message: 'Please input the title of collection!' }] },
                react_1["default"].createElement(antd_1.Input, null)),
            react_1["default"].createElement(antd_1.Form.Item, { name: "description", label: "Description" },
                react_1["default"].createElement(antd_1.Input, { type: "textarea" })),
            react_1["default"].createElement(antd_1.Form.Item, { name: "modifier", className: "collection-create-form_last-form-item" },
                react_1["default"].createElement(antd_1.Radio.Group, null,
                    react_1["default"].createElement(antd_1.Radio, { value: "public" }, "Public"),
                    react_1["default"].createElement(antd_1.Radio, { value: "private" }, "Private"))))));
};
exports.AntdFormInModal = function () {
    var _a = react_1.useState(false), visible = _a[0], setVisible = _a[1];
    var onCreate = function (values) {
        console.log('Received values of form: ', values);
        setVisible(false);
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: function () {
                setVisible(true);
            } }, "New Collection"),
        react_1["default"].createElement(CollectionCreateForm, { visible: visible, onCreate: onCreate, onCancel: function () {
                setVisible(false);
            } })));
};
