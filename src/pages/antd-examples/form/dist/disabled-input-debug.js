"use strict";
exports.__esModule = true;
exports.AntdFormDisabledInputDebug = void 0;
var antd_1 = require("antd");
exports.AntdFormDisabledInputDebug = function () { return React.createElement(antd_1.Form, null,
    React.createElement(antd_1.Form.Item, { label: "Normal0" },
        React.createElement(antd_1.Input, { placeholder: "unavailable choice", value: "Buggy!" })),
    React.createElement(antd_1.Form.Item, { label: "Fail0", validateStatus: "error", help: "Buggy!" },
        React.createElement(antd_1.Input, { placeholder: "unavailable choice", value: "Buggy!" })),
    React.createElement(antd_1.Form.Item, { label: "FailDisabled0", validateStatus: "error", help: "Buggy!" },
        React.createElement(antd_1.Input, { placeholder: "unavailable choice", disabled: true, value: "Buggy!" })),
    React.createElement(antd_1.Form.Item, { label: "Normal1" },
        React.createElement(antd_1.Input, { placeholder: "unavailable choice", value: "Buggy!" })),
    React.createElement(antd_1.Form.Item, { label: "Fail1", validateStatus: "error", help: "Buggy!" },
        React.createElement(antd_1.Input, { placeholder: "unavailable choice", value: "Buggy!" })),
    React.createElement(antd_1.Form.Item, { label: "FailDisabled1", validateStatus: "error", help: "Buggy!" },
        React.createElement(antd_1.Input, { placeholder: "unavailable choice", disabled: true, value: "Buggy!" })),
    React.createElement(antd_1.Form.Item, { label: "Normal2" },
        React.createElement(antd_1.Input, { placeholder: "unavailable choice", addonBefore: "Buggy!" })),
    React.createElement(antd_1.Form.Item, { label: "Fail2", validateStatus: "error", help: "Buggy!" },
        React.createElement(antd_1.Input, { placeholder: "unavailable choice", addonBefore: "Buggy!" })),
    React.createElement(antd_1.Form.Item, { label: "FailDisabled2", validateStatus: "error", help: "Buggy!" },
        React.createElement(antd_1.Input, { placeholder: "unavailable choice", disabled: true, addonBefore: "Buggy!" })),
    React.createElement(antd_1.Form.Item, { label: "Normal3" },
        React.createElement(antd_1.Input, { placeholder: "unavailable choice", prefix: "\u4EBA\u6C11\u5E01", value: "50" })),
    React.createElement(antd_1.Form.Item, { label: "Fail3", validateStatus: "error", help: "Buggy!" },
        React.createElement(antd_1.Input, { placeholder: "unavailable choice", prefix: "\u4EBA\u6C11\u5E01", value: "50" })),
    React.createElement(antd_1.Form.Item, { label: "FailDisabled3", validateStatus: "error", help: "Buggy!" },
        React.createElement(antd_1.Input, { placeholder: "unavailable choice", disabled: true, prefix: "\u4EBA\u6C11\u5E01", value: "50" }))); };
