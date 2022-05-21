"use strict";
exports.__esModule = true;
exports.AntdSpaceSplit = void 0;
var antd_1 = require("antd");
function AntdSpaceSplit() {
    return (React.createElement(antd_1.Space, { split: React.createElement(antd_1.Divider, { type: "vertical" }) },
        React.createElement(antd_1.Typography.Link, null, "Link"),
        React.createElement(antd_1.Typography.Link, null, "Link"),
        React.createElement(antd_1.Typography.Link, null, "Link")));
}
exports.AntdSpaceSplit = AntdSpaceSplit;
