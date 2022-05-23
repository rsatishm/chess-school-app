"use strict";
exports.__esModule = true;
exports.AntdImageControlledPreview = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
function AntdImageControlledPreview() {
    var _a = react_1.useState(false), visible = _a[0], setVisible = _a[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: function () { return setVisible(true); } }, "show image preview"),
        react_1["default"].createElement(antd_1.Image, { width: 200, style: { display: 'none' }, src: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200", preview: {
                visible: visible,
                src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                onVisibleChange: function (value) {
                    setVisible(value);
                }
            } })));
}
exports.AntdImageControlledPreview = AntdImageControlledPreview;
