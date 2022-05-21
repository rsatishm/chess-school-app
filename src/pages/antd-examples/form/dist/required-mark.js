"use strict";
exports.__esModule = true;
exports.AntdFormRequiredMark = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
exports.AntdFormRequiredMark = function () {
    var form = antd_1.Form.useForm()[0];
    var _a = react_1.useState('optional'), requiredMark = _a[0], setRequiredMarkType = _a[1];
    var onRequiredTypeChange = function (_a) {
        var requiredMarkValue = _a.requiredMarkValue;
        setRequiredMarkType(requiredMarkValue);
    };
    return (react_1["default"].createElement(antd_1.Form, { form: form, layout: "vertical", initialValues: { requiredMarkValue: requiredMark }, onValuesChange: onRequiredTypeChange, requiredMark: requiredMark },
        react_1["default"].createElement(antd_1.Form.Item, { label: "Required Mark", name: "requiredMarkValue" },
            react_1["default"].createElement(antd_1.Radio.Group, null,
                react_1["default"].createElement(antd_1.Radio.Button, { value: "optional" }, "Optional"),
                react_1["default"].createElement(antd_1.Radio.Button, { value: true }, "Required"),
                react_1["default"].createElement(antd_1.Radio.Button, { value: false }, "Hidden"))),
        react_1["default"].createElement(antd_1.Form.Item, { label: "Field A", required: true, tooltip: "This is a required field" },
            react_1["default"].createElement(antd_1.Input, { placeholder: "input placeholder" })),
        react_1["default"].createElement(antd_1.Form.Item, { label: "Field B", tooltip: { title: 'Tooltip with customize icon', icon: react_1["default"].createElement(icons_1.InfoCircleOutlined, null) } },
            react_1["default"].createElement(antd_1.Input, { placeholder: "input placeholder" })),
        react_1["default"].createElement(antd_1.Form.Item, null,
            react_1["default"].createElement(antd_1.Button, { type: "primary" }, "Submit"))));
};
