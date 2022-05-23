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
exports.AntdSkleletonElement = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var AntdSkleletonElement = /** @class */ (function (_super) {
    __extends(AntdSkleletonElement, _super);
    function AntdSkleletonElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            active: false,
            block: false,
            size: 'default',
            buttonShape: 'default',
            avatarShape: 'circle'
        };
        _this.handleActiveChange = function (checked) {
            _this.setState({ active: checked });
        };
        _this.handleBlockChange = function (checked) {
            _this.setState({ block: checked });
        };
        _this.handleSizeChange = function (e) {
            _this.setState({ size: e.target.value });
        };
        _this.handleShapeChange = function (prop) { return function (e) {
            var _a;
            _this.setState((_a = {}, _a[prop] = e.target.value, _a));
        }; };
        return _this;
    }
    AntdSkleletonElement.prototype.render = function () {
        var _a = this.state, active = _a.active, size = _a.size, buttonShape = _a.buttonShape, avatarShape = _a.avatarShape, block = _a.block;
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(antd_1.Space, null,
                react_1["default"].createElement(antd_1.Skeleton.Button, { active: active, size: size, shape: buttonShape, block: block }),
                react_1["default"].createElement(antd_1.Skeleton.Avatar, { active: active, size: size, shape: avatarShape }),
                react_1["default"].createElement(antd_1.Skeleton.Input, { active: active, size: size })),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement(antd_1.Skeleton.Button, { active: active, size: size, shape: buttonShape, block: block }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement(antd_1.Skeleton.Input, { active: active, size: size, block: block }),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement("br", null),
            react_1["default"].createElement(antd_1.Skeleton.Image, null),
            react_1["default"].createElement(antd_1.Divider, null),
            react_1["default"].createElement(antd_1.Form, { layout: "inline", style: { margin: '16px 0' } },
                react_1["default"].createElement(antd_1.Form.Item, { label: "Active" },
                    react_1["default"].createElement(antd_1.Switch, { checked: active, onChange: this.handleActiveChange })),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Button and Input Block" },
                    react_1["default"].createElement(antd_1.Switch, { checked: block, onChange: this.handleBlockChange })),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Size" },
                    react_1["default"].createElement(antd_1.Radio.Group, { value: size, onChange: this.handleSizeChange },
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "default" }, "Default"),
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "large" }, "Large"),
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "small" }, "Small"))),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Button Shape" },
                    react_1["default"].createElement(antd_1.Radio.Group, { value: buttonShape, onChange: this.handleShapeChange('buttonShape') },
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "default" }, "Default"),
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "round" }, "Round"),
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "circle" }, "Circle"))),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Avatar Shape" },
                    react_1["default"].createElement(antd_1.Radio.Group, { value: avatarShape, onChange: this.handleShapeChange('avatarShape') },
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "square" }, "Square"),
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "circle" }, "Circle"))))));
    };
    return AntdSkleletonElement;
}(react_1["default"].Component));
exports.AntdSkleletonElement = AntdSkleletonElement;
