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
exports.AntdSkeletonChildren = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var AntdSkeletonChildren = /** @class */ (function (_super) {
    __extends(AntdSkeletonChildren, _super);
    function AntdSkeletonChildren() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loading: false
        };
        _this.showSkeleton = function () {
            _this.setState({ loading: true });
            setTimeout(function () {
                _this.setState({ loading: false });
            }, 3000);
        };
        return _this;
    }
    AntdSkeletonChildren.prototype.render = function () {
        return (react_1["default"].createElement("div", { className: "article" },
            react_1["default"].createElement(antd_1.Skeleton, { loading: this.state.loading },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("h4", null, "Ant Design, a design language"),
                    react_1["default"].createElement("p", null, "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."))),
            react_1["default"].createElement(antd_1.Button, { onClick: this.showSkeleton, disabled: this.state.loading }, "Show Skeleton")));
    };
    return AntdSkeletonChildren;
}(react_1["default"].Component));
exports.AntdSkeletonChildren = AntdSkeletonChildren;
