"use strict";
exports.__esModule = true;
exports.AntdSpaceCustomize = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
function AntdSpaceCustomize() {
    var _a = react_1.useState(8), size = _a[0], setSize = _a[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Slider, { value: size, onChange: function (value) { return setSize(value); } }),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement(antd_1.Space, { size: size },
            react_1["default"].createElement(antd_1.Button, { type: "primary" }, "Primary"),
            react_1["default"].createElement(antd_1.Button, null, "Default"),
            react_1["default"].createElement(antd_1.Button, { type: "dashed" }, "Dashed"),
            react_1["default"].createElement(antd_1.Button, { type: "link" }, "Link"))));
}
exports.AntdSpaceCustomize = AntdSpaceCustomize;
