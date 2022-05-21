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
exports.AntdDescriptionsSize = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var AntdDescriptionsSize = /** @class */ (function (_super) {
    __extends(AntdDescriptionsSize, _super);
    function AntdDescriptionsSize() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            size: 'default'
        };
        _this.onChange = function (e) {
            console.log('size checked', e.target.value);
            _this.setState({
                size: e.target.value
            });
        };
        return _this;
    }
    AntdDescriptionsSize.prototype.render = function () {
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(antd_1.Radio.Group, { onChange: this.onChange, value: this.state.size },
                react_1["default"].createElement(antd_1.Radio, { value: "default" }, "default"),
                react_1["default"].createElement(antd_1.Radio, { value: "middle" }, "middle"),
                react_1["default"].createElement(antd_1.Radio, { value: "small" }, "small")),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement(antd_1.Descriptions, { bordered: true, title: "Custom Size", size: this.state.size, extra: react_1["default"].createElement(antd_1.Button, { type: "primary" }, "Edit") },
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Product" }, "Cloud Database"),
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Billing" }, "Prepaid"),
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "time" }, "18:00:00"),
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Amount" }, "$80.00"),
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Discount" }, "$20.00"),
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Official" }, "$60.00"),
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Config Info" },
                    "Data disk type: MongoDB",
                    react_1["default"].createElement("br", null),
                    "Database version: 3.4",
                    react_1["default"].createElement("br", null),
                    "Package: dds.mongo.mid",
                    react_1["default"].createElement("br", null),
                    "Storage space: 10 GB",
                    react_1["default"].createElement("br", null),
                    "Replication factor: 3",
                    react_1["default"].createElement("br", null),
                    "Region: East China 1",
                    react_1["default"].createElement("br", null))),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement(antd_1.Descriptions, { title: "Custom Size", size: this.state.size, extra: react_1["default"].createElement(antd_1.Button, { type: "primary" }, "Edit") },
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Product" }, "Cloud Database"),
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Billing" }, "Prepaid"),
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "time" }, "18:00:00"),
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Amount" }, "$80.00"),
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Discount" }, "$20.00"),
                react_1["default"].createElement(antd_1.Descriptions.Item, { label: "Official" }, "$60.00"))));
    };
    return AntdDescriptionsSize;
}(react_1["default"].Component));
exports.AntdDescriptionsSize = AntdDescriptionsSize;
