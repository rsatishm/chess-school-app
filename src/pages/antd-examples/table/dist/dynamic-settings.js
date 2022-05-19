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
exports.__esModule = true;
exports.AntdTableDynamicSettings = void 0;
var antd_1 = require("antd");
var icons_1 = require("@ant-design/icons");
var react_1 = require("react");
var columns = [
    {
        title: 'Name',
        dataIndex: 'name'
    },
    {
        title: 'Age',
        dataIndex: 'age',
        sorter: function (a, b) { return a.age - b.age; }
    },
    {
        title: 'Address',
        dataIndex: 'address',
        filters: [
            {
                text: 'London',
                value: 'London'
            },
            {
                text: 'New York',
                value: 'New York'
            },
        ],
        onFilter: function (value, record) { return record.address.indexOf(value) === 0; }
    },
    {
        title: 'Action',
        key: 'action',
        sorter: true,
        render: function () { return (react_1["default"].createElement(antd_1.Space, { size: "middle" },
            react_1["default"].createElement("a", null, "Delete"),
            react_1["default"].createElement("a", { className: "ant-dropdown-link" },
                "More actions ",
                react_1["default"].createElement(icons_1.DownOutlined, null)))); }
    },
];
var data = [];
for (var i = 1; i <= 10; i++) {
    data.push({
        key: i,
        name: 'John Brown',
        age: i + "2",
        address: "New York No. " + i + " Lake Park",
        description: "My name is John Brown, I am " + i + "2 years old, living in New York No. " + i + " Lake Park."
    });
}
var expandable = { expandedRowRender: function (record) { return react_1["default"].createElement("p", null, record.description); } };
var title = function () { return 'Here is title'; };
var showHeader = true;
var footer = function () { return 'Here is footer'; };
var pagination = { position: 'bottom' };
var AntdTableDynamicSettings = /** @class */ (function (_super) {
    __extends(AntdTableDynamicSettings, _super);
    function AntdTableDynamicSettings() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            bordered: false,
            loading: false,
            pagination: pagination,
            size: 'default',
            expandable: expandable,
            title: undefined,
            showHeader: showHeader,
            footer: footer,
            rowSelection: {},
            scroll: undefined,
            hasData: true,
            tableLayout: undefined,
            top: 'none',
            bottom: 'bottomRight'
        };
        _this.handleToggle = function (prop) { return function (enable) {
            var _a;
            _this.setState((_a = {}, _a[prop] = enable, _a));
        }; };
        _this.handleSizeChange = function (e) {
            _this.setState({ size: e.target.value });
        };
        _this.handleTableLayoutChange = function (e) {
            _this.setState({ tableLayout: e.target.value });
        };
        _this.handleExpandChange = function (enable) {
            _this.setState({ expandable: enable ? expandable : undefined });
        };
        _this.handleEllipsisChange = function (enable) {
            _this.setState({ ellipsis: enable });
        };
        _this.handleTitleChange = function (enable) {
            _this.setState({ title: enable ? title : undefined });
        };
        _this.handleHeaderChange = function (enable) {
            _this.setState({ showHeader: enable ? showHeader : false });
        };
        _this.handleFooterChange = function (enable) {
            _this.setState({ footer: enable ? footer : undefined });
        };
        _this.handleRowSelectionChange = function (enable) {
            _this.setState({ rowSelection: enable ? {} : undefined });
        };
        _this.handleYScrollChange = function (enable) {
            _this.setState({ yScroll: enable });
        };
        _this.handleXScrollChange = function (e) {
            _this.setState({ xScroll: e.target.value });
        };
        _this.handleDataChange = function (hasData) {
            _this.setState({ hasData: hasData });
        };
        return _this;
    }
    AntdTableDynamicSettings.prototype.render = function () {
        var _this = this;
        var _a = this.state, xScroll = _a.xScroll, yScroll = _a.yScroll, state = __rest(_a, ["xScroll", "yScroll"]);
        var scroll = {};
        if (yScroll) {
            scroll.y = 240;
        }
        if (xScroll) {
            scroll.x = '100vw';
        }
        var tableColumns = columns.map(function (item) { return (__assign(__assign({}, item), { ellipsis: state.ellipsis })); });
        if (xScroll === 'fixed') {
            tableColumns[0].fixed = true;
            tableColumns[tableColumns.length - 1].fixed = 'right';
        }
        var pos = [this.state.top, this.state.bottom];
        var size = this.state.size;
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(antd_1.Form, { layout: "inline", className: "components-table-demo-control-bar", style: { marginBottom: 16 } },
                react_1["default"].createElement(antd_1.Form.Item, { label: "Bordered" },
                    react_1["default"].createElement(antd_1.Switch, { checked: state.bordered, onChange: this.handleToggle('bordered') })),
                react_1["default"].createElement(antd_1.Form.Item, { label: "loading" },
                    react_1["default"].createElement(antd_1.Switch, { checked: state.loading, onChange: this.handleToggle('loading') })),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Title" },
                    react_1["default"].createElement(antd_1.Switch, { checked: !!state.title, onChange: this.handleTitleChange })),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Column Header" },
                    react_1["default"].createElement(antd_1.Switch, { checked: !!state.showHeader, onChange: this.handleHeaderChange })),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Footer" },
                    react_1["default"].createElement(antd_1.Switch, { checked: !!state.footer, onChange: this.handleFooterChange })),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Expandable" },
                    react_1["default"].createElement(antd_1.Switch, { checked: !!state.expandable, onChange: this.handleExpandChange })),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Checkbox" },
                    react_1["default"].createElement(antd_1.Switch, { checked: !!state.rowSelection, onChange: this.handleRowSelectionChange })),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Fixed Header" },
                    react_1["default"].createElement(antd_1.Switch, { checked: !!yScroll, onChange: this.handleYScrollChange })),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Has Data" },
                    react_1["default"].createElement(antd_1.Switch, { checked: !!state.hasData, onChange: this.handleDataChange })),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Ellipsis" },
                    react_1["default"].createElement(antd_1.Switch, { checked: !!state.ellipsis, onChange: this.handleEllipsisChange })),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Size" },
                    react_1["default"].createElement(antd_1.Radio.Group, { value: state.size, onChange: this.handleSizeChange },
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "default" }, "Default"),
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "middle" }, "Middle"),
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "small" }, "Small"))),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Table Scroll" },
                    react_1["default"].createElement(antd_1.Radio.Group, { value: xScroll, onChange: this.handleXScrollChange },
                        react_1["default"].createElement(antd_1.Radio.Button, { value: undefined }, "Unset"),
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "scroll" }, "Scroll"),
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "fixed" }, "Fixed Columns"))),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Table Layout" },
                    react_1["default"].createElement(antd_1.Radio.Group, { value: state.tableLayout, onChange: this.handleTableLayoutChange },
                        react_1["default"].createElement(antd_1.Radio.Button, { value: undefined }, "Unset"),
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "fixed" }, "Fixed"))),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Pagination Top" },
                    react_1["default"].createElement(antd_1.Radio.Group, { value: this.state.top, onChange: function (e) {
                            _this.setState({ top: e.target.value });
                        } },
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "topLeft" }, "TopLeft"),
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "topCenter" }, "TopCenter"),
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "topRight" }, "TopRight"),
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "none" }, "None"))),
                react_1["default"].createElement(antd_1.Form.Item, { label: "Pagination Bottom" },
                    react_1["default"].createElement(antd_1.Radio.Group, { value: this.state.bottom, onChange: function (e) {
                            _this.setState({ bottom: e.target.value });
                        } },
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "bottomLeft" }, "BottomLeft"),
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "bottomCenter" }, "BottomCenter"),
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "bottomRight" }, "BottomRight"),
                        react_1["default"].createElement(antd_1.Radio.Button, { value: "none" }, "None")))),
            react_1["default"].createElement(antd_1.Table, __assign({}, this.state, { size: size, pagination: { position: pos }, columns: tableColumns, dataSource: state.hasData ? data : null, scroll: scroll }))));
    };
    return AntdTableDynamicSettings;
}(react_1["default"].Component));
exports.AntdTableDynamicSettings = AntdTableDynamicSettings;
