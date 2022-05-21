"use strict";
exports.__esModule = true;
exports.AntdSelectCustomTagRender = void 0;
var antd_1 = require("antd");
var options = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }];
function tagRender(props) {
    var label = props.label, value = props.value, closable = props.closable, onClose = props.onClose;
    var onPreventMouseDown = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    return (React.createElement(antd_1.Tag, { color: value, onMouseDown: onPreventMouseDown, closable: closable, onClose: onClose, style: { marginRight: 3 } }, label));
}
exports.AntdSelectCustomTagRender = function () { return React.createElement(antd_1.Select, { mode: "multiple", showArrow: true, tagRender: tagRender, defaultValue: ['gold', 'cyan'], style: { width: '100%' }, options: options }); };
