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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.AntdModalDark = void 0;
var antd_1 = require("antd");
var moment_1 = require("moment");
var difference_1 = require("lodash/difference");
var icons_1 = require("@ant-design/icons");
var react_1 = require("react");
var Panel = antd_1.Collapse.Panel;
var TreeNode = antd_1.Tree.TreeNode;
var TabPane = antd_1.Tabs.TabPane;
var Meta = antd_1.Card.Meta;
var Link = antd_1.Anchor.Link;
var Text = antd_1.Typography.Text;
var text = "\n  A dog is a type of domesticated animal.\n  Known for its loyalty and faithfulness,\n  it can be found as a welcome guest in many households across the world.\n";
var mockData = [];
for (var i = 0; i < 20; i++) {
    mockData.push({
        key: i.toString(),
        title: "content" + (i + 1),
        description: "description of content" + (i + 1),
        disabled: i % 3 < 1
    });
}
var oriTargetKeys = mockData.filter(function (item) { return +item.key % 3 > 1; }).map(function (item) { return item.key; });
var data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park'
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park'
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park'
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park'
    },
];
var columnsTable = [
    {
        title: 'Name',
        dataIndex: 'name'
    },
    {
        title: 'Borrow',
        dataIndex: 'borrow'
    },
    {
        title: 'Repayment',
        dataIndex: 'repayment'
    },
];
var dataTable = [
    {
        key: '1',
        name: 'John Brown',
        borrow: 10,
        repayment: 33
    },
    {
        key: '2',
        name: 'Jim Green',
        borrow: 100,
        repayment: 0
    },
    {
        key: '3',
        name: 'Joe Black',
        borrow: 10,
        repayment: 10
    },
    {
        key: '4',
        name: 'Jim Red',
        borrow: 75,
        repayment: 45
    },
];
function handleMenuClick(e) {
    console.log('click', e);
}
var menu = (react_1["default"].createElement(antd_1.Menu, { onClick: handleMenuClick },
    react_1["default"].createElement(antd_1.Menu.Item, { key: "1" }, "1st item"),
    react_1["default"].createElement(antd_1.Menu.Item, { key: "2" }, "2nd item"),
    react_1["default"].createElement(antd_1.Menu.Item, { key: "3" }, "3rd item")));
var expandedRowRender = function () {
    var columnsExpand = [
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Status',
            key: 'state',
            render: function () { return (react_1["default"].createElement("span", null,
                react_1["default"].createElement(antd_1.Badge, { status: "success" }),
                "Finished")); }
        },
        { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
        {
            title: 'Action',
            dataIndex: 'operation',
            key: 'operation',
            render: function () { return (react_1["default"].createElement("span", { className: "table-operation" },
                react_1["default"].createElement("a", null, "Pause"),
                react_1["default"].createElement("a", null, "Stop"),
                react_1["default"].createElement(antd_1.Dropdown, { overlay: menu },
                    react_1["default"].createElement("a", null,
                        "More ",
                        react_1["default"].createElement(icons_1.DownOutlined, null))))); }
        },
    ];
    var dataExpand = [];
    /*
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }*/
    return react_1["default"].createElement(antd_1.Table, { columns: columnsExpand, dataSource: dataExpand, pagination: false });
};
var columnsNest = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    { title: 'Version', dataIndex: 'version', key: 'version' },
    { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', key: 'operation', render: function () { return react_1["default"].createElement("a", null, "Publish"); } },
];
var dataNest = [];
for (var i = 0; i < 3; ++i) {
    dataNest.push({
        key: i,
        name: 'Screem',
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00'
    });
}
var columnsFixed = [
    {
        title: 'Full Name',
        width: 100,
        dataIndex: 'name',
        key: 'name',
        fixed: 'left'
    },
    {
        title: 'Age',
        width: 100,
        dataIndex: 'age',
        key: 'age',
        fixed: 'left'
    },
    { title: 'Column 1', dataIndex: 'address', key: '1' },
    { title: 'Column 2', dataIndex: 'address', key: '2' },
    { title: 'Column 3', dataIndex: 'address', key: '3' },
    { title: 'Column 4', dataIndex: 'address', key: '4' },
    { title: 'Column 5', dataIndex: 'address', key: '5' },
    { title: 'Column 6', dataIndex: 'address', key: '6' },
    { title: 'Column 7', dataIndex: 'address', key: '7' },
    { title: 'Column 8', dataIndex: 'address', key: '8' },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: function () { return react_1["default"].createElement("a", null, "action"); }
    },
];
var dataFixed = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York Park'
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 40,
        address: 'London Park'
    },
];
var TableTransfer = function (_a) {
    var leftColumns = _a.leftColumns, rightColumns = _a.rightColumns, restProps = __rest(_a, ["leftColumns", "rightColumns"]);
    return (react_1["default"].createElement(antd_1.Transfer, __assign({}, restProps, { showSelectAll: false }), function (_a) {
        var direction = _a.direction, filteredItems = _a.filteredItems, onItemSelectAll = _a.onItemSelectAll, onItemSelect = _a.onItemSelect, listSelectedKeys = _a.selectedKeys, listDisabled = _a.disabled;
        var columns = direction === 'left' ? leftColumns : rightColumns;
        var rowSelection = {
            getCheckboxProps: function (item) { return ({ disabled: listDisabled || item.disabled }); },
            onSelectAll: function (selected, selectedRows) {
                var treeSelectedKeys = selectedRows
                    .filter(function (item) { return !item.disabled; })
                    .map(function (_a) {
                    var key = _a.key;
                    return key;
                });
                var diffKeys = selected
                    ? difference_1["default"](treeSelectedKeys, listSelectedKeys)
                    : difference_1["default"](listSelectedKeys, treeSelectedKeys);
                onItemSelectAll(diffKeys, selected);
            },
            onSelect: function (_a, selected) {
                var key = _a.key;
                onItemSelect(key, selected);
            },
            selectedRowKeys: listSelectedKeys
        };
        return (react_1["default"].createElement(antd_1.Table, { id: "components-transfer-table", rowSelection: rowSelection, columns: columns, dataSource: filteredItems, size: "small", style: { pointerEvents: listDisabled ? 'none' : null }, onRow: function (_a) {
                var key = _a.key, itemDisabled = _a.disabled;
                return ({
                    onClick: function () {
                        if (itemDisabled || listDisabled)
                            return;
                        onItemSelect(key, !listSelectedKeys.includes(key));
                    }
                });
            } }));
    }));
};
var AntdModalDark = /** @class */ (function (_super) {
    __extends(AntdModalDark, _super);
    function AntdModalDark() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            visible: false,
            targetKeys: oriTargetKeys,
            selectedKeys: [],
            disabled: false,
            showSearch: false
        };
        _this.handleDisable = function (disabled) {
            _this.setState({
                disabled: disabled
            });
        };
        _this.handleTableTransferChange = function (nextTargetKeys) {
            _this.setState({ targetKeys: nextTargetKeys });
        };
        _this.triggerDisable = function (disabled) {
            _this.setState({ disabled: disabled });
        };
        _this.triggerShowSearch = function (showSearch) {
            _this.setState({ showSearch: showSearch });
        };
        _this.handleTransferChange = function (nextTargetKeys) {
            _this.setState({ targetKeys: nextTargetKeys });
        };
        _this.handleTransferSelectChange = function (sourceSelectedKeys, targetSelectedKeys) {
            _this.setState({ selectedKeys: __spreadArrays(sourceSelectedKeys, targetSelectedKeys) });
        };
        _this.showModal = function () {
            _this.setState({
                visible: true
            });
        };
        _this.handleOk = function (e) {
            console.log(e);
            _this.setState({
                visible: false
            });
        };
        _this.handleCancel = function (e) {
            console.log(e);
            _this.setState({
                visible: false
            });
        };
        return _this;
    }
    AntdModalDark.prototype.render = function () {
        var _a = this.state, disabled = _a.disabled, selectedKeys = _a.selectedKeys, targetKeys = _a.targetKeys, showSearch = _a.showSearch;
        var columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                filters: [
                    { text: 'Joe', value: 'Joe' },
                    { text: 'Jim', value: 'Jim' },
                ],
                filteredValue: null,
                onFilter: function (value, record) { return record.name.includes(value); },
                sorter: function (a, b) { return a.name.length - b.name.length; },
                sortOrder: true,
                ellipsis: true
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                sorter: false,
                sortOrder: true,
                ellipsis: true
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
                filters: [
                    { text: 'London', value: 'London' },
                    { text: 'New York', value: 'New York' },
                ],
                filteredValue: null,
                onFilter: function (value, record) { return record.address.includes(value); },
                sorter: false,
                sortOrder: true,
                ellipsis: true
            },
        ];
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(antd_1.Button, { type: "primary", onClick: this.showModal }, "Open Modal"),
            react_1["default"].createElement(antd_1.Modal, { title: "Basic Modal", visible: this.state.visible, onOk: this.handleOk, onCancel: this.handleCancel },
                react_1["default"].createElement(antd_1.Switch, { unCheckedChildren: "disabled", checkedChildren: "disabled", checked: disabled, onChange: this.handleDisable, style: { marginBottom: 16 } }),
                react_1["default"].createElement(antd_1.Card, { title: "Card Title" },
                    react_1["default"].createElement(antd_1.Card.Grid, null, "Content"),
                    react_1["default"].createElement(antd_1.Card.Grid, { hoverable: false }, "Content"),
                    react_1["default"].createElement(antd_1.Card.Grid, null, "Content"),
                    react_1["default"].createElement(antd_1.Card.Grid, null, "Content"),
                    react_1["default"].createElement(antd_1.Card.Grid, null, "Content"),
                    react_1["default"].createElement(antd_1.Card.Grid, null, "Content"),
                    react_1["default"].createElement(antd_1.Card.Grid, null, "Content")),
                react_1["default"].createElement(antd_1.Collapse, null,
                    react_1["default"].createElement(Panel, { header: "This is panel header 1", key: "1" },
                        react_1["default"].createElement(antd_1.Collapse, { defaultActiveKey: "1" },
                            react_1["default"].createElement(Panel, { header: "This is panel nest panel", key: "1" },
                                react_1["default"].createElement("p", null, text)))),
                    react_1["default"].createElement(Panel, { header: "This is panel header 2", key: "2" },
                        react_1["default"].createElement("p", null, text)),
                    react_1["default"].createElement(Panel, { header: "This is panel header 3", key: "3" },
                        react_1["default"].createElement("p", null, text))),
                react_1["default"].createElement(antd_1.Transfer, { dataSource: mockData, titles: ['Source', 'Target'], targetKeys: targetKeys, selectedKeys: selectedKeys, onChange: this.handleTransferChange, onSelectChange: this.handleTransferSelectChange, render: function (item) { return item.title; }, disabled: disabled }),
                react_1["default"].createElement(TableTransfer, { dataSource: mockData, targetKeys: targetKeys, disabled: disabled, showSearch: showSearch, onChange: this.handleTableTransferChange, filterOption: function (inputValue, item) {
                        return item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1;
                    }, leftColumns: [
                        {
                            dataIndex: 'title',
                            title: 'Name'
                        },
                        {
                            dataIndex: 'description',
                            title: 'Description'
                        },
                    ], rightColumns: [
                        {
                            dataIndex: 'title',
                            title: 'Name'
                        },
                    ] }),
                react_1["default"].createElement(antd_1.Switch, { unCheckedChildren: "disabled", checkedChildren: "disabled", checked: disabled, onChange: this.triggerDisable, style: { marginTop: 16 } }),
                react_1["default"].createElement(antd_1.Switch, { unCheckedChildren: "showSearch", checkedChildren: "showSearch", checked: showSearch, onChange: this.triggerShowSearch, style: { marginTop: 16 } }),
                react_1["default"].createElement(antd_1.Anchor, null,
                    react_1["default"].createElement(Link, { href: "#components-anchor-demo-basic", title: "Basic demo" }),
                    react_1["default"].createElement(Link, { href: "#components-anchor-demo-static", title: "Static demo" }),
                    react_1["default"].createElement(Link, { href: "#components-anchor-demo-basic", title: "Basic demo with Target", target: "_blank" }),
                    react_1["default"].createElement(Link, { href: "#API", title: "API" },
                        react_1["default"].createElement(Link, { href: "#Anchor-Props", title: "Anchor Props" }),
                        react_1["default"].createElement(Link, { href: "#Link-Props", title: "Link Props" }))),
                react_1["default"].createElement(antd_1.Tabs, { type: "card" },
                    react_1["default"].createElement(TabPane, { tab: "Tab 1", key: "1" }, "Content of Tab Pane 1"),
                    react_1["default"].createElement(TabPane, { tab: "Tab 2", key: "2" }, "Content of Tab Pane 2"),
                    react_1["default"].createElement(TabPane, { tab: "Tab 3", key: "3" }, "Content of Tab Pane 3")),
                react_1["default"].createElement(antd_1.Timeline, null,
                    react_1["default"].createElement(antd_1.Timeline.Item, null, "Create a services site 2015-09-01"),
                    react_1["default"].createElement(antd_1.Timeline.Item, null, "Solve initial network problems 2015-09-01"),
                    react_1["default"].createElement(antd_1.Timeline.Item, { dot: react_1["default"].createElement(icons_1.ClockCircleOutlined, { style: { fontSize: '16px' } }), color: "red" }, "Technical testing 2015-09-01"),
                    react_1["default"].createElement(antd_1.Timeline.Item, null, "Network problems being solved 2015-09-01")),
                react_1["default"].createElement(antd_1.Calendar, null),
                react_1["default"].createElement(antd_1.Tree, { showLine: true, switcherIcon: react_1["default"].createElement(icons_1.DownOutlined, null), defaultExpandedKeys: ['0-0-0'] },
                    react_1["default"].createElement(TreeNode, { title: "parent 1", key: "0-0" },
                        react_1["default"].createElement(TreeNode, { title: "parent 1-0", key: "0-0-0" },
                            react_1["default"].createElement(TreeNode, { title: "leaf", key: "0-0-0-0" }),
                            react_1["default"].createElement(TreeNode, { title: "leaf", key: "0-0-0-1" }),
                            react_1["default"].createElement(TreeNode, { title: "leaf", key: "0-0-0-2" })),
                        react_1["default"].createElement(TreeNode, { title: "parent 1-1", key: "0-0-1" },
                            react_1["default"].createElement(TreeNode, { title: "leaf", key: "0-0-1-0" })),
                        react_1["default"].createElement(TreeNode, { title: "parent 1-2", key: "0-0-2" },
                            react_1["default"].createElement(TreeNode, { title: "leaf", key: "0-0-2-0" }),
                            react_1["default"].createElement(TreeNode, { title: "leaf", key: "0-0-2-1" })))),
                react_1["default"].createElement(antd_1.Table, { columns: columns, dataSource: data, footer: function () { return 'Footer'; } }),
                react_1["default"].createElement(antd_1.Table, { columns: columnsTable, dataSource: dataTable, pagination: false, id: "table-demo-summary", bordered: true, summary: function (pageData) {
                        var totalBorrow = 0;
                        var totalRepayment = 0;
                        pageData.forEach(function (_a) {
                            var borrow = _a.borrow, repayment = _a.repayment;
                            totalBorrow += borrow;
                            totalRepayment += repayment;
                        });
                        return (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement("tr", null,
                                react_1["default"].createElement("th", null, "Total"),
                                react_1["default"].createElement("td", null,
                                    react_1["default"].createElement(Text, { type: "danger" }, totalBorrow)),
                                react_1["default"].createElement("td", null,
                                    react_1["default"].createElement(Text, null, totalRepayment))),
                            react_1["default"].createElement("tr", null,
                                react_1["default"].createElement("th", null, "Balance"),
                                react_1["default"].createElement("td", { colSpan: 2 },
                                    react_1["default"].createElement(Text, { type: "danger" }, totalBorrow - totalRepayment)))));
                    } }),
                react_1["default"].createElement("br", null),
                react_1["default"].createElement(antd_1.Table, { columns: columnsNest, expandable: { expandedRowRender: expandedRowRender }, dataSource: dataNest }),
                react_1["default"].createElement(antd_1.Table, { columns: columnsFixed, dataSource: dataFixed, scroll: { x: 1300, y: 100 } }),
                react_1["default"].createElement(antd_1.Card, { hoverable: true, style: { width: 240 }, cover: react_1["default"].createElement("img", { alt: "example", src: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" }) },
                    react_1["default"].createElement(Meta, { title: "Europe Street beat", description: "www.instagram.com" })),
                react_1["default"].createElement(antd_1.Slider, { defaultValue: 30 }),
                react_1["default"].createElement(antd_1.DatePicker, { defaultValue: moment_1["default"]('2015/01/01', 'YYYY/MM/DD'), format: "YYYY/MM/DD" }),
                react_1["default"].createElement(antd_1.Badge, { count: 5 },
                    react_1["default"].createElement("a", { href: "#", className: "head-example" })))));
    };
    return AntdModalDark;
}(react_1["default"].Component));
exports.AntdModalDark = AntdModalDark;
