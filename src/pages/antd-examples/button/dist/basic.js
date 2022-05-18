"use strict";
exports.__esModule = true;
exports.AntdButtonBasic = void 0;
var antd_1 = require("antd");
exports.AntdButtonBasic = function () { return React.createElement(React.Fragment, null,
    React.createElement(antd_1.Button, { type: "primary" }, "Primary Button"),
    React.createElement(antd_1.Button, null, "Default Button"),
    React.createElement(antd_1.Button, { type: "dashed" }, "Dashed Button"),
    React.createElement("br", null),
    React.createElement(antd_1.Button, { type: "text" }, "Text Button"),
    React.createElement(antd_1.Button, { type: "link" }, "Link Button")); };
