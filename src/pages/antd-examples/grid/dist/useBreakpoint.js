"use strict";
exports.__esModule = true;
exports.AntdGridUseBreakpoint = void 0;
var antd_1 = require("antd");
var useBreakpoint = antd_1.Grid.useBreakpoint;
function AntdGridUseBreakpoint() {
    var screens = useBreakpoint();
    return (React.createElement(React.Fragment, null,
        "Current break point:",
        ' ',
        Object.entries(screens)
            .filter(function (screen) { return !!screen[1]; })
            .map(function (screen) { return (React.createElement(antd_1.Tag, { color: "blue", key: screen[0] }, screen[0])); })));
}
exports.AntdGridUseBreakpoint = AntdGridUseBreakpoint;
