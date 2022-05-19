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
exports.AntdTableDragSortingHandler = void 0;
var antd_1 = require("antd");
var react_sortable_hoc_1 = require("react-sortable-hoc");
var icons_1 = require("@ant-design/icons");
var array_move_1 = require("array-move");
var react_1 = require("react");
var DragHandle = react_sortable_hoc_1.SortableHandle(function () { return react_1["default"].createElement(icons_1.MenuOutlined, { style: { cursor: 'grab', color: '#999' } }); });
var columns = [
    {
        title: 'Sort',
        dataIndex: 'sort',
        width: 30,
        className: 'drag-visible',
        render: function () { return react_1["default"].createElement(DragHandle, null); }
    },
    {
        title: 'Name',
        dataIndex: 'name',
        className: 'drag-visible'
    },
    {
        title: 'Age',
        dataIndex: 'age'
    },
    {
        title: 'Address',
        dataIndex: 'address'
    },
];
var data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        index: 0
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        index: 1
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        index: 2
    },
];
var SortableItem = react_sortable_hoc_1.SortableElement(function (props) { return react_1["default"].createElement("tr", __assign({}, props)); });
var SortableBody = react_sortable_hoc_1.SortableContainer(function (props) { return react_1["default"].createElement("tbody", __assign({}, props)); });
var AntdTableDragSortingHandler = /** @class */ (function (_super) {
    __extends(AntdTableDragSortingHandler, _super);
    function AntdTableDragSortingHandler() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dataSource: data
        };
        _this.onSortEnd = function (s) {
            var oldIndex = s.oldIndex, newIndex = s.newIndex;
            var dataSource = _this.state.dataSource;
            if (oldIndex !== newIndex) {
                var newData = array_move_1.arrayMoveImmutable([].concat(dataSource), oldIndex, newIndex).filter(function (el) { return !!el; });
                console.log('Sorted items: ', newData);
                _this.setState({ dataSource: newData });
            }
        };
        _this.DraggableContainer = function (props) { return (react_1["default"].createElement(SortableBody, __assign({ useDragHandle: true, disableAutoscroll: true, helperClass: "row-dragging", onSortEnd: _this.onSortEnd }, props))); };
        _this.DraggableBodyRow = function (data) {
            var className = data.className, style = data.style, restProps = __rest(data, ["className", "style"]);
            var dataSource = _this.state.dataSource;
            // function findIndex base on Table rowKey props and should always be a right array index
            var index = dataSource.findIndex(function (x) { return x.index === restProps['data-row-key']; });
            return react_1["default"].createElement(SortableItem, __assign({ index: index }, restProps));
        };
        return _this;
    }
    AntdTableDragSortingHandler.prototype.render = function () {
        var dataSource = this.state.dataSource;
        return (react_1["default"].createElement(antd_1.Table, { pagination: false, dataSource: dataSource, columns: columns, rowKey: "index", components: {
                body: {
                    wrapper: this.DraggableContainer,
                    row: this.DraggableBodyRow
                }
            } }));
    };
    return AntdTableDragSortingHandler;
}(react_1["default"].Component));
exports.AntdTableDragSortingHandler = AntdTableDragSortingHandler;
