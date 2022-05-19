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
var react_1 = require("react");
var antd_1 = require("antd");
var react_dnd_1 = require("react-dnd");
var react_dnd_html5_backend_1 = require("react-dnd-html5-backend");
var immutability_helper_1 = require("immutability-helper");
var type = 'DraggableBodyRow';
var DraggableBodyRow = function (_a) {
    var index = _a.index, moveRow = _a.moveRow, className = _a.className, style = _a.style, restProps = __rest(_a, ["index", "moveRow", "className", "style"]);
    var ref = react_1.useRef();
    var _b = react_dnd_1.useDrop({
        accept: type,
        collect: function (monitor) {
            var dragIndex = monitor.getItem().index;
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward'
            };
        },
        drop: function (item) {
            moveRow(item.index, index);
        }
    }), _c = _b[0], isOver = _c.isOver, dropClassName = _c.dropClassName, drop = _b[1];
    var _d = react_dnd_1.useDrag({
        type: type,
        item: { index: index },
        collect: function (monitor) { return ({
            isDragging: monitor.isDragging()
        }); }
    }), drag = _d[1];
    drop(drag(ref));
    return (react_1["default"].createElement("tr", __assign({ ref: ref, className: "" + className + (isOver ? dropClassName : ''), style: __assign({ cursor: 'move' }, style) }, restProps)));
};
var columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
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
];
var DragSortingTable = function () {
    var _a = react_1.useState([
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
    ]), data = _a[0], setData = _a[1];
    var components = {
        body: {
            row: DraggableBodyRow
        }
    };
    var moveRow = react_1.useCallback(function (dragIndex, hoverIndex) {
        var dragRow = data[dragIndex];
        setData(immutability_helper_1["default"](data, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragRow],
            ]
        }));
    }, [data]);
    return (react_1["default"].createElement(react_dnd_1.DndProvider, { backend: react_dnd_html5_backend_1.HTML5Backend },
        react_1["default"].createElement(antd_1.Table, { columns: columns, dataSource: data, components: components, onRow: function (record, index) { return ({
                index: index,
                moveRow: moveRow
            }); } })));
};
