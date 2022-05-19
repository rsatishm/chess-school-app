"use strict";
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
exports.AntdTableTreeData = void 0;
var antd_1 = require("antd");
var react_1 = require("react");
var columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '12%'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        width: '30%',
        key: 'address'
    },
];
var data = [
    {
        key: 1,
        name: 'John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        children: [
            {
                key: 11,
                name: 'John Brown',
                age: 42,
                address: 'New York No. 2 Lake Park'
            },
            {
                key: 12,
                name: 'John Brown jr.',
                age: 30,
                address: 'New York No. 3 Lake Park',
                children: [
                    {
                        key: 121,
                        name: 'Jimmy Brown',
                        age: 16,
                        address: 'New York No. 3 Lake Park'
                    },
                ]
            },
            {
                key: 13,
                name: 'Jim Green sr.',
                age: 72,
                address: 'London No. 1 Lake Park',
                children: [
                    {
                        key: 131,
                        name: 'Jim Green',
                        age: 42,
                        address: 'London No. 2 Lake Park',
                        children: [
                            {
                                key: 1311,
                                name: 'Jim Green jr.',
                                age: 25,
                                address: 'London No. 3 Lake Park'
                            },
                            {
                                key: 1312,
                                name: 'Jimmy Green sr.',
                                age: 18,
                                address: 'London No. 4 Lake Park'
                            },
                        ]
                    },
                ]
            },
        ]
    },
    {
        key: 2,
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
    },
];
// rowSelection objects indicates the need for row selection
var rowSelection = {
    onChange: function (selectedRowKeys, selectedRows) {
        console.log("selectedRowKeys: " + selectedRowKeys, 'selectedRows: ', selectedRows);
    },
    onSelect: function (record, selected, selectedRows) {
        console.log(record, selected, selectedRows);
    },
    onSelectAll: function (selected, selectedRows, changeRows) {
        console.log(selected, selectedRows, changeRows);
    }
};
function AntdTableTreeData() {
    var _a = react_1["default"].useState(false), checkStrictly = _a[0], setCheckStrictly = _a[1];
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(antd_1.Space, { align: "center", style: { marginBottom: 16 } },
            "CheckStrictly: ",
            react_1["default"].createElement(antd_1.Switch, { checked: checkStrictly, onChange: setCheckStrictly })),
        react_1["default"].createElement(antd_1.Table, { columns: columns, rowSelection: __assign(__assign({}, rowSelection), { checkStrictly: checkStrictly }), dataSource: data })));
}
exports.AntdTableTreeData = AntdTableTreeData;
