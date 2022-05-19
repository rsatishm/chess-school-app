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
exports.AntdTableVirtualList = void 0;
var react_1 = require("react");
var react_window_1 = require("react-window");
var rc_resize_observer_1 = require("rc-resize-observer");
var classnames_1 = require("classnames");
var antd_1 = require("antd");
function VirtualTable(props) {
    var columns = props.columns, scroll = props.scroll;
    var _a = react_1.useState(0), tableWidth = _a[0], setTableWidth = _a[1];
    var widthColumnCount = columns.filter(function (_a) {
        var width = _a.width;
        return !width;
    }).length;
    var mergedColumns = columns.map(function (column) {
        if (column.width) {
            return column;
        }
        return __assign(__assign({}, column), { width: Math.floor(tableWidth / widthColumnCount) });
    });
    var gridRef = react_1.useRef();
    var connectObject = react_1.useState(function () {
        var obj = {};
        Object.defineProperty(obj, 'scrollLeft', {
            get: function () { return null; },
            set: function (scrollLeft) {
                if (gridRef.current) {
                    gridRef.current.scrollTo({ scrollLeft: scrollLeft });
                }
            }
        });
        return obj;
    })[0];
    var resetVirtualGrid = function () {
        gridRef.current.resetAfterIndices({
            columnIndex: 0,
            shouldForceUpdate: true
        });
    };
    react_1.useEffect(function () { return resetVirtualGrid; }, [tableWidth]);
    var renderVirtualList = function (rawData, _a) {
        var scrollbarSize = _a.scrollbarSize, ref = _a.ref, onScroll = _a.onScroll;
        ref.current = connectObject;
        var totalHeight = rawData.length * 54;
        return (react_1["default"].createElement(react_window_1.VariableSizeGrid, { ref: gridRef, className: "virtual-grid", columnCount: mergedColumns.length, columnWidth: function (index) {
                var width = mergedColumns[index].width;
                return totalHeight > scroll.y && index === mergedColumns.length - 1
                    ? width - scrollbarSize - 1
                    : width;
            }, height: scroll.y, rowCount: rawData.length, rowHeight: function () { return 54; }, width: tableWidth, onScroll: function (_a) {
                var scrollLeft = _a.scrollLeft;
                onScroll({ scrollLeft: scrollLeft });
            } }, function (_a) {
            var columnIndex = _a.columnIndex, rowIndex = _a.rowIndex, style = _a.style;
            return (react_1["default"].createElement("div", { className: classnames_1["default"]('virtual-table-cell', {
                    'virtual-table-cell-last': columnIndex === mergedColumns.length - 1
                }), style: style }, rawData[rowIndex][mergedColumns[columnIndex].dataIndex]));
        }));
    };
    return (react_1["default"].createElement(rc_resize_observer_1["default"], { onResize: function (_a) {
            var width = _a.width;
            setTableWidth(width);
        } },
        react_1["default"].createElement(antd_1.Table, __assign({}, props, { className: "virtual-table", columns: mergedColumns, pagination: false, components: {
                body: renderVirtualList
            } }))));
}
// Usage
var columns = [
    { title: 'A', dataIndex: 'key', width: 150 },
    { title: 'B', dataIndex: 'key' },
    { title: 'C', dataIndex: 'key' },
    { title: 'D', dataIndex: 'key' },
    { title: 'E', dataIndex: 'key', width: 200 },
    { title: 'F', dataIndex: 'key', width: 100 },
];
var data = Array.from({ length: 100000 }, function (_, key) { return ({ key: key }); });
exports.AntdTableVirtualList = function () { return react_1["default"].createElement(VirtualTable, { columns: columns, dataSource: data, scroll: { y: 300, x: '100vw' } }); };
