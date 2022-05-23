"use strict";
exports.__esModule = true;
exports.AntdImagePlaceholder = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
function AntdImagePlaceholder() {
    var _a = react_1["default"].useState(), random = _a[0], setRandom = _a[1];
    return (react_1["default"].createElement(antd_1.Space, { size: 12 },
        react_1["default"].createElement(antd_1.Image, { width: 200, src: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?" + random, placeholder: react_1["default"].createElement(antd_1.Image, { preview: false, src: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200", width: 200 }) }),
        react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: function () {
                setRandom(Date.now());
            } }, "Reload")));
}
exports.AntdImagePlaceholder = AntdImagePlaceholder;
