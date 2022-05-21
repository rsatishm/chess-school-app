"use strict";
exports.__esModule = true;
exports.AntdCarouselPosition = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
};
exports.AntdCarouselPosition = function () {
    var _a = react_1["default"].useState('top'), dotPosition = _a[0], setDotPosition = _a[1];
    var handlePositionChange = function (_a) {
        var value = _a.target.value;
        setDotPosition(value);
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Radio.Group, { onChange: handlePositionChange, value: dotPosition, style: { marginBottom: 8 } },
            react_1["default"].createElement(antd_1.Radio.Button, { value: "top" }, "Top"),
            react_1["default"].createElement(antd_1.Radio.Button, { value: "bottom" }, "Bottom"),
            react_1["default"].createElement(antd_1.Radio.Button, { value: "left" }, "Left"),
            react_1["default"].createElement(antd_1.Radio.Button, { value: "right" }, "Right")),
        react_1["default"].createElement(antd_1.Carousel, { dotPosition: dotPosition },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("h3", { style: contentStyle }, "1")),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("h3", { style: contentStyle }, "2")),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("h3", { style: contentStyle }, "3")),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("h3", { style: contentStyle }, "4")))));
};
