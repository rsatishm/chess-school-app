"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.AntdGridPlayground = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var gutters = {};
var vgutters = {};
var colCounts = {};
[8, 16, 24, 32, 40, 48].forEach(function (value, i) {
    gutters[i] = value;
});
[8, 16, 24, 32, 40, 48].forEach(function (value, i) {
    vgutters[i] = value;
});
[2, 3, 4, 6, 8, 12].forEach(function (value, i) {
    colCounts[i] = value;
});
var AntdGridPlayground = /** @class */ (function (_super) {
    __extends(AntdGridPlayground, _super);
    function AntdGridPlayground() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            gutterKey: 1,
            vgutterKey: 1,
            colCountKey: 2
        };
        _this.onGutterChange = function (gutterKey) {
            _this.setState({ gutterKey: gutterKey });
        };
        _this.onVGutterChange = function (vgutterKey) {
            _this.setState({ vgutterKey: vgutterKey });
        };
        _this.onColCountChange = function (colCountKey) {
            _this.setState({ colCountKey: colCountKey });
        };
        return _this;
    }
    AntdGridPlayground.prototype.render = function () {
        var _a = this.state, gutterKey = _a.gutterKey, vgutterKey = _a.vgutterKey, colCountKey = _a.colCountKey;
        var cols = [];
        var colCount = colCounts[colCountKey];
        var colCode = '';
        for (var i = 0; i < colCount; i++) {
            cols.push(react_1["default"].createElement(antd_1.Col, { key: i.toString(), span: 24 / colCount },
                react_1["default"].createElement("div", null, "Column")));
            colCode += "  <Col span={" + 24 / colCount + "} />\n";
        }
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("span", null, "Horizontal Gutter (px): "),
            react_1["default"].createElement("div", { style: { width: '50%' } },
                react_1["default"].createElement(antd_1.Slider, { min: 0, max: Object.keys(gutters).length - 1, value: gutterKey, onChange: this.onGutterChange, marks: gutters, step: null, tipFormatter: function (value) { return gutters[value]; } })),
            react_1["default"].createElement("span", null, "Vertical Gutter (px): "),
            react_1["default"].createElement("div", { style: { width: '50%' } },
                react_1["default"].createElement(antd_1.Slider, { min: 0, max: Object.keys(vgutters).length - 1, value: vgutterKey, onChange: this.onVGutterChange, marks: vgutters, step: null, tipFormatter: function (value) { return vgutters[value]; } })),
            react_1["default"].createElement("span", null, "Column Count:"),
            react_1["default"].createElement("div", { style: { width: '50%', marginBottom: 48 } },
                react_1["default"].createElement(antd_1.Slider, { min: 0, max: Object.keys(colCounts).length - 1, value: colCountKey, onChange: this.onColCountChange, marks: colCounts, step: null, tipFormatter: function (value) { return colCounts[value]; } })),
            react_1["default"].createElement(antd_1.Row, { gutter: [gutters[gutterKey], vgutters[vgutterKey]] },
                cols,
                cols),
            "Another Row:",
            react_1["default"].createElement(antd_1.Row, { gutter: [gutters[gutterKey], vgutters[vgutterKey]] }, cols),
            react_1["default"].createElement("pre", { className: "demo-code" }, "<Row gutter={[" + gutters[gutterKey] + ", " + vgutters[vgutterKey] + "]}>\n" + colCode + "\n" + colCode + "</Row>"),
            react_1["default"].createElement("pre", { className: "demo-code" }, "<Row gutter={[" + gutters[gutterKey] + ", " + vgutters[vgutterKey] + "]}>\n" + colCode + "</Row>")));
    };
    return AntdGridPlayground;
}(react_1["default"].Component));
exports.AntdGridPlayground = AntdGridPlayground;
