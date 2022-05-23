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
exports.AntdSkeletonList = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var react_1 = require("react");
var listData = [];
for (var i = 0; i < 3; i++) {
    listData.push({
        href: 'https://ant.design',
        title: "ant design part " + i,
        avatar: 'https://joeschmoe.io/api/v1/random',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
    });
}
var IconText = function (_a) {
    var icon = _a.icon, text = _a.text;
    return (react_1["default"].createElement("span", null,
        react_1["default"].createElement(icon, { style: { marginRight: 8 } }),
        text));
};
var AntdSkeletonList = /** @class */ (function (_super) {
    __extends(AntdSkeletonList, _super);
    function AntdSkeletonList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            loading: true
        };
        _this.onChange = function (checked) {
            _this.setState({ loading: !checked });
        };
        return _this;
    }
    AntdSkeletonList.prototype.render = function () {
        var loading = this.state.loading;
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(antd_1.Switch, { checked: !loading, onChange: this.onChange }),
            react_1["default"].createElement(antd_1.List, { itemLayout: "vertical", size: "large", dataSource: listData, renderItem: function (item) { return (react_1["default"].createElement(antd_1.List.Item, { key: item.title, actions: !loading && [
                        react_1["default"].createElement(IconText, { icon: icons_1.StarOutlined, text: "156", key: "list-vertical-star-o" }),
                        react_1["default"].createElement(IconText, { icon: icons_1.LikeOutlined, text: "156", key: "list-vertical-like-o" }),
                        react_1["default"].createElement(IconText, { icon: icons_1.MessageOutlined, text: "2", key: "list-vertical-message" }),
                    ], extra: !loading && (react_1["default"].createElement("img", { width: 272, alt: "logo", src: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" })) },
                    react_1["default"].createElement(antd_1.Skeleton, { loading: loading, active: true, avatar: true },
                        react_1["default"].createElement(antd_1.List.Item.Meta, { avatar: react_1["default"].createElement(antd_1.Avatar, { src: item.avatar }), title: react_1["default"].createElement("a", { href: item.href }, item.title), description: item.description }),
                        item.content))); } })));
    };
    return AntdSkeletonList;
}(react_1["default"].Component));
exports.AntdSkeletonList = AntdSkeletonList;
