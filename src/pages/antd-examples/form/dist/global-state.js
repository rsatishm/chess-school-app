"use strict";
exports.__esModule = true;
exports.AntdFormGlobalState = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var CustomizedForm = function (_a) {
    var onChange = _a.onChange, fields = _a.fields;
    return (react_1["default"].createElement(antd_1.Form, { name: "global_state", layout: "inline", fields: fields, onFieldsChange: function (_, allFields) {
            onChange(allFields);
        } },
        react_1["default"].createElement(antd_1.Form.Item, { name: "username", label: "Username", rules: [{ required: true, message: 'Username is required!' }] },
            react_1["default"].createElement(antd_1.Input, null))));
};
exports.AntdFormGlobalState = function () {
    var _a = react_1.useState([{ name: ['username'], value: 'Ant Design' }]), fields = _a[0], setFields = _a[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(CustomizedForm, { fields: fields, onChange: function (newFields) {
                setFields(newFields);
            } }),
        react_1["default"].createElement("pre", { className: "language-bash" }, JSON.stringify(fields, null, 2))));
};
