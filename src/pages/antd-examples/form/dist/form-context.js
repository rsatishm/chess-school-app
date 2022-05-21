"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AntdFormContext = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
};
var tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
};
// reset form fields when modal is form, closed
var useResetFormOnCloseModal = function (_a) {
    var form = _a.form, visible = _a.visible;
    var prevVisibleRef = react_1.useRef();
    react_1.useEffect(function () {
        prevVisibleRef.current = visible;
    }, [visible]);
    var prevVisible = prevVisibleRef.current;
    react_1.useEffect(function () {
        if (!visible && prevVisible) {
            form.resetFields();
        }
    }, [visible]);
};
var ModalForm = function (_a) {
    var visible = _a.visible, onCancel = _a.onCancel;
    var form = antd_1.Form.useForm()[0];
    useResetFormOnCloseModal({
        form: form,
        visible: visible
    });
    var onOk = function () {
        form.submit();
    };
    return (react_1["default"].createElement(antd_1.Modal, { title: "Basic Drawer", visible: visible, onOk: onOk, onCancel: onCancel },
        react_1["default"].createElement(antd_1.Form, { form: form, layout: "vertical", name: "userForm" },
            react_1["default"].createElement(antd_1.Form.Item, { name: "name", label: "User Name", rules: [{ required: true }] },
                react_1["default"].createElement(antd_1.Input, null)),
            react_1["default"].createElement(antd_1.Form.Item, { name: "age", label: "User Age", rules: [{ required: true }] },
                react_1["default"].createElement(antd_1.InputNumber, null)))));
};
exports.AntdFormContext = function () {
    var _a = react_1.useState(false), visible = _a[0], setVisible = _a[1];
    var showUserModal = function () {
        setVisible(true);
    };
    var hideUserModal = function () {
        setVisible(false);
    };
    var onFinish = function (values) {
        console.log('Finish:', values);
    };
    return (react_1["default"].createElement(antd_1.Form.Provider, { onFormFinish: function (name, _a) {
            var values = _a.values, forms = _a.forms;
            if (name === 'userForm') {
                var basicForm = forms.basicForm;
                var users = basicForm.getFieldValue('users') || [];
                basicForm.setFieldsValue({ users: __spreadArrays(users, [values]) });
                setVisible(false);
            }
        } },
        react_1["default"].createElement(antd_1.Form, __assign({}, layout, { name: "basicForm", onFinish: onFinish }),
            react_1["default"].createElement(antd_1.Form.Item, { name: "group", label: "Group Name", rules: [{ required: true }] },
                react_1["default"].createElement(antd_1.Input, null)),
            react_1["default"].createElement(antd_1.Form.Item, { label: "User List", shouldUpdate: function (prevValues, curValues) { return prevValues.users !== curValues.users; } }, function (_a) {
                var getFieldValue = _a.getFieldValue;
                var users = getFieldValue('users') || [];
                return users.length ? (react_1["default"].createElement("ul", null, users.map(function (user, index) { return (react_1["default"].createElement("li", { key: index, className: "user" },
                    react_1["default"].createElement(antd_1.Avatar, { icon: react_1["default"].createElement(icons_1.UserOutlined, null) }),
                    user.name,
                    " - ",
                    user.age)); }))) : (react_1["default"].createElement(antd_1.Typography.Text, { className: "ant-form-text", type: "secondary" },
                    "( ",
                    react_1["default"].createElement(icons_1.SmileOutlined, null),
                    " No user yet. )"));
            }),
            react_1["default"].createElement(antd_1.Form.Item, __assign({}, tailLayout),
                react_1["default"].createElement(antd_1.Button, { htmlType: "submit", type: "primary" }, "Submit"),
                react_1["default"].createElement(antd_1.Button, { htmlType: "button", style: { margin: '0 8px' }, onClick: showUserModal }, "Add User"))),
        react_1["default"].createElement(ModalForm, { visible: visible, onCancel: hideUserModal })));
};
