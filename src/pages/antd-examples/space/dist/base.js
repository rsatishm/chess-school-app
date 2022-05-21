"use strict";
exports.__esModule = true;
exports.AntdSpaceBase = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
function AntdSpaceBase() {
    return (React.createElement(antd_1.Space, null,
        "Space",
        React.createElement(antd_1.Button, { type: "primary" }, "Button"),
        React.createElement(antd_1.Upload, null,
            React.createElement(antd_1.Button, null,
                React.createElement(icons_1.UploadOutlined, null),
                " Click to Upload")),
        React.createElement(antd_1.Popconfirm, { title: "Are you sure delete this task?", okText: "Yes", cancelText: "No" },
            React.createElement(antd_1.Button, null, "Confirm"))));
}
exports.AntdSpaceBase = AntdSpaceBase;
