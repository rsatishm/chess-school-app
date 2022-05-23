"use strict";
exports.__esModule = true;
exports.AntdImagePreviewGroupVisible = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
exports.AntdImagePreviewGroupVisible = function () {
    var _a = react_1.useState(false), visible = _a[0], setVisible = _a[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Image, { preview: { visible: false }, width: 200, src: "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp", onClick: function () { return setVisible(true); } }),
        react_1["default"].createElement("div", { style: { display: 'none' } },
            react_1["default"].createElement(antd_1.Image.PreviewGroup, { preview: { visible: visible, onVisibleChange: function (vis) { return setVisible(vis); } } },
                react_1["default"].createElement(antd_1.Image, { src: "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" }),
                react_1["default"].createElement(antd_1.Image, { src: "https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" }),
                react_1["default"].createElement(antd_1.Image, { src: "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" })))));
};
