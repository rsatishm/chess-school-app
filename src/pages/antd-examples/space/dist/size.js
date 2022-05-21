"use strict";
exports.__esModule = true;
exports.AntdSpaceSize = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
function AntdSpaceSize() {
    var _a = react_1.useState('small'), size = _a[0], setSize = _a[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Radio.Group, { value: size, onChange: function (e) { return setSize(e.target.value); } },
            react_1["default"].createElement(antd_1.Radio, { value: "small" }, "Small"),
            react_1["default"].createElement(antd_1.Radio, { value: "middle" }, "Middle"),
            react_1["default"].createElement(antd_1.Radio, { value: "large" }, "Large")),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement(antd_1.Space, { size: size },
            react_1["default"].createElement(antd_1.Button, { type: "primary" }, "Primary"),
            react_1["default"].createElement(antd_1.Button, null, "Default"),
            react_1["default"].createElement(antd_1.Button, { type: "dashed" }, "Dashed"),
            react_1["default"].createElement(antd_1.Button, { type: "link" }, "Link"))));
}
exports.AntdSpaceSize = AntdSpaceSize;
