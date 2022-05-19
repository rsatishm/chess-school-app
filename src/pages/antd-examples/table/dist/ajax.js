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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.AntdTableAjax = void 0;
var antd_1 = require("antd");
var qs_1 = require("qs");
var react_1 = require("react");
var columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: function (name) { return name.first + " " + name.last; },
        width: '20%'
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
            { text: 'Male', value: 'male' },
            { text: 'Female', value: 'female' },
        ],
        width: '20%'
    },
    {
        title: 'Email',
        dataIndex: 'email'
    },
];
var getRandomuserParams = function (params) { return (__assign({ results: params.pagination.pageSize, page: params.pagination.current }, params)); };
var AntdTableAjax = /** @class */ (function (_super) {
    __extends(AntdTableAjax, _super);
    function AntdTableAjax() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            data: [],
            pagination: {
                current: 1,
                pageSize: 10
            },
            loading: false
        };
        _this.handleTableChange = function (pagination, filters, sorter) {
            _this.fetch(__assign({ sortField: sorter.field, sortOrder: sorter.order, pagination: pagination }, filters));
        };
        _this.fetch = function (params) {
            if (params === void 0) { params = {}; }
            _this.setState({ loading: true });
            fetch("https://randomuser.me/api?" + qs_1["default"].stringify(getRandomuserParams(params)))
                .then(function (res) { return res.json(); })
                .then(function (data) {
                console.log(data);
                _this.setState({
                    loading: false,
                    data: data.results,
                    pagination: __assign(__assign({}, params.pagination), { total: 200 })
                });
            });
        };
        return _this;
    }
    AntdTableAjax.prototype.componentDidMount = function () {
        var pagination = this.state.pagination;
        this.fetch({ pagination: pagination });
    };
    AntdTableAjax.prototype.render = function () {
        var _a = this.state, data = _a.data, pagination = _a.pagination, loading = _a.loading;
        return (react_1["default"].createElement(antd_1.Table, { columns: columns, rowKey: function (record) { return record.login.uuid; }, dataSource: data, pagination: pagination, loading: loading, onChange: this.handleTableChange }));
    };
    return AntdTableAjax;
}(react_1["default"].Component));
exports.AntdTableAjax = AntdTableAjax;
