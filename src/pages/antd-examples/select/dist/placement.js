"use strict";
exports.__esModule = true;
exports.AntdSelectPlacement = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var Option = antd_1.Select.Option;
exports.AntdSelectPlacement = function () {
    var _a = react_1["default"].useState('topLeft'), placement = _a[0], SetPlacement = _a[1];
    var placementChange = function (e) {
        SetPlacement(e.target.value);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Radio.Group, { value: placement, onChange: placementChange },
            react_1["default"].createElement(antd_1.Radio.Button, { value: "topLeft" }, "topLeft"),
            react_1["default"].createElement(antd_1.Radio.Button, { value: "topRight" }, "topRight"),
            react_1["default"].createElement(antd_1.Radio.Button, { value: "bottomLeft" }, "bottomLeft"),
            react_1["default"].createElement(antd_1.Radio.Button, { value: "bottomRight" }, "bottomRight")),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement("br", null),
        react_1["default"].createElement(antd_1.Select, { defaultValue: "HangZhou", style: { width: 120 }, dropdownMatchSelectWidth: false, placement: placement },
            react_1["default"].createElement(Option, { value: "HangZhou" }, "HangZhou #310000"),
            react_1["default"].createElement(Option, { value: "NingBo" }, "NingBo #315000"),
            react_1["default"].createElement(Option, { value: "WenZhou" }, "WenZhou #325000"))));
};
