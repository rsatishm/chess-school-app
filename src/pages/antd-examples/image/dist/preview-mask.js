"use strict";
exports.__esModule = true;
exports.AntdImagePreviewMask = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
function AntdImagePreviewMask() {
    return (react_1["default"].createElement(antd_1.Image, { width: 96, src: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png", preview: {
            maskClassName: 'customize-mask',
            mask: (react_1["default"].createElement(antd_1.Space, { direction: "vertical", align: "center" },
                react_1["default"].createElement(icons_1.ZoomInOutlined, null),
                "\u793A\u4F8B"))
        } }));
}
exports.AntdImagePreviewMask = AntdImagePreviewMask;
