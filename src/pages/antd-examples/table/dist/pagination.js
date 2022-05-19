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
exports.AntdTablePagination = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var topOptions = [
    { label: 'topLeft', value: 'topLeft' },
    { label: 'topCenter', value: 'topCenter' },
    { label: 'topRight', value: 'topRight' },
    { label: 'none', value: 'none' },
];
var bottomOptions = [
    { label: 'bottomLeft', value: 'bottomLeft' },
    { label: 'bottomCenter', value: 'bottomCenter' },
    { label: 'bottomRight', value: 'bottomRight' },
    { label: 'none', value: 'none' },
];
var columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: function (text) { return react_1["default"].createElement("a", null, text); }
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: function (tags) { return (react_1["default"].createElement("span", null, tags.map(function (tag) {
            var color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
                color = 'volcano';
            }
            return (react_1["default"].createElement(antd_1.Tag, { color: color, key: tag }, tag.toUpperCase()));
        }))); }
    },
    {
        title: 'Action',
        key: 'action',
        render: function (text, record) { return (react_1["default"].createElement(antd_1.Space, { size: "middle" },
            react_1["default"].createElement("a", null,
                "Invite ",
                record.name),
            react_1["default"].createElement("a", null, "Delete"))); }
    },
];
var data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher']
    },
];
var AntdTablePagination = /** @class */ (function (_super) {
    __extends(AntdTablePagination, _super);
    function AntdTablePagination() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            top: 'topLeft',
            bottom: 'bottomRight'
        };
        return _this;
    }
    AntdTablePagination.prototype.render = function () {
        var _this = this;
        var pos = [this.state.top, this.state.bottom];
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(antd_1.Radio.Group, { style: { marginBottom: 10 }, options: topOptions, value: this.state.top, onChange: function (e) {
                        _this.setState({ top: e.target.value });
                    } })),
            react_1["default"].createElement(antd_1.Radio.Group, { style: { marginBottom: 10 }, options: bottomOptions, value: this.state.bottom, onChange: function (e) {
                    _this.setState({ bottom: e.target.value });
                } }),
            react_1["default"].createElement(antd_1.Table, { columns: columns, pagination: { position: pos }, dataSource: data })));
    };
    return AntdTablePagination;
}(react_1["default"].Component));
exports.AntdTablePagination = AntdTablePagination;
