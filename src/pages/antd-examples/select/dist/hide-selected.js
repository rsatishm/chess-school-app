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
exports.AntdSelectHideSelected = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
var AntdSelectHideSelected = /** @class */ (function (_super) {
    __extends(AntdSelectHideSelected, _super);
    function AntdSelectHideSelected() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selectedItems: []
        };
        _this.handleChange = function (selectedItems) {
            _this.setState({ selectedItems: selectedItems });
        };
        return _this;
    }
    AntdSelectHideSelected.prototype.render = function () {
        var selectedItems = this.state.selectedItems;
        var filteredOptions = OPTIONS.filter(function (o) { return !selectedItems.includes(o); });
        return (react_1["default"].createElement(antd_1.Select, { mode: "multiple", placeholder: "Inserted are removed", value: selectedItems, onChange: this.handleChange, style: { width: '100%' } }, filteredOptions.map(function (item) { return (react_1["default"].createElement(antd_1.Select.Option, { key: item, value: item }, item)); })));
    };
    return AntdSelectHideSelected;
}(react_1["default"].Component));
exports.AntdSelectHideSelected = AntdSelectHideSelected;
