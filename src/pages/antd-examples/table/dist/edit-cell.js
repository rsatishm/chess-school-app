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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.AntdTableEditCell = void 0;
var react_1 = require("react");
var antd_1 = require("antd");
var EditableContext = react_1["default"].createContext(null);
var EditableRow = function (_a) {
    var index = _a.index, props = __rest(_a, ["index"]);
    var form = antd_1.Form.useForm()[0];
    return (react_1["default"].createElement(antd_1.Form, { form: form, component: false },
        react_1["default"].createElement(EditableContext.Provider, { value: form },
            react_1["default"].createElement("tr", __assign({}, props)))));
};
var EditableCell = function (_a) {
    var title = _a.title, editable = _a.editable, children = _a.children, dataIndex = _a.dataIndex, record = _a.record, handleSave = _a.handleSave, restProps = __rest(_a, ["title", "editable", "children", "dataIndex", "record", "handleSave"]);
    var _b = react_1.useState(false), editing = _b[0], setEditing = _b[1];
    var inputRef = react_1.useRef(null);
    var form = react_1.useContext(EditableContext);
    react_1.useEffect(function () {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);
    var toggleEdit = function () {
        var _a;
        setEditing(!editing);
        form.setFieldsValue((_a = {}, _a[dataIndex] = record[dataIndex], _a));
    };
    var save = function () { return __awaiter(void 0, void 0, void 0, function () {
        var values, errInfo_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, form.validateFields()];
                case 1:
                    values = _a.sent();
                    toggleEdit();
                    handleSave(__assign(__assign({}, record), values));
                    return [3 /*break*/, 3];
                case 2:
                    errInfo_1 = _a.sent();
                    console.log('Save failed:', errInfo_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var childNode = children;
    if (editable) {
        childNode = editing ? (react_1["default"].createElement(antd_1.Form.Item, { style: { margin: 0 }, name: dataIndex, rules: [
                {
                    required: true,
                    message: title + " is required."
                },
            ] },
            react_1["default"].createElement(antd_1.Input, { ref: inputRef, onPressEnter: save, onBlur: save }))) : (react_1["default"].createElement("div", { className: "editable-cell-value-wrap", style: { paddingRight: 24 }, onClick: toggleEdit }, children));
    }
    return react_1["default"].createElement("td", __assign({}, restProps), childNode);
};
var AntdTableEditCell = /** @class */ (function (_super) {
    __extends(AntdTableEditCell, _super);
    function AntdTableEditCell(props) {
        var _this = _super.call(this, props) || this;
        _this.handleDelete = function (key) {
            var dataSource = __spreadArrays(_this.state.dataSource);
            _this.setState({ dataSource: dataSource.filter(function (item) { return item.key !== key; }) });
        };
        _this.handleAdd = function () {
            var _a = _this.state, count = _a.count, dataSource = _a.dataSource;
            var newData = {
                key: count,
                name: "Edward King " + count,
                age: '32',
                address: "London, Park Lane no. " + count
            };
            _this.setState({
                dataSource: __spreadArrays(dataSource, [newData]),
                count: count + 1
            });
        };
        _this.handleSave = function (row) {
            var newData = __spreadArrays(_this.state.dataSource);
            var index = newData.findIndex(function (item) { return row.key === item.key; });
            var item = newData[index];
            newData.splice(index, 1, __assign(__assign({}, item), row));
            _this.setState({ dataSource: newData });
        };
        _this.columns = [
            {
                title: 'name',
                dataIndex: 'name',
                width: '30%',
                editable: true
            },
            {
                title: 'age',
                dataIndex: 'age'
            },
            {
                title: 'address',
                dataIndex: 'address'
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: function (_, record) {
                    return _this.state.dataSource.length >= 1 ? (react_1["default"].createElement(antd_1.Popconfirm, { title: "Sure to delete?", onConfirm: function () { return _this.handleDelete(record.key); } },
                        react_1["default"].createElement("a", null, "Delete"))) : null;
                }
            },
        ];
        _this.state = {
            dataSource: [
                {
                    key: '0',
                    name: 'Edward King 0',
                    age: '32',
                    address: 'London, Park Lane no. 0'
                },
                {
                    key: '1',
                    name: 'Edward King 1',
                    age: '32',
                    address: 'London, Park Lane no. 1'
                },
            ],
            count: 2
        };
        return _this;
    }
    AntdTableEditCell.prototype.render = function () {
        var _this = this;
        var dataSource = this.state.dataSource;
        var components = {
            body: {
                row: EditableRow,
                cell: EditableCell
            }
        };
        var columns = this.columns.map(function (col) {
            if (!col.editable) {
                return col;
            }
            return __assign(__assign({}, col), { onCell: function (record) { return ({
                    record: record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: _this.handleSave
                }); } });
        });
        return (react_1["default"].createElement("div", null,
            react_1["default"].createElement(antd_1.Button, { onClick: this.handleAdd, type: "primary", style: { marginBottom: 16 } }, "Add a row"),
            react_1["default"].createElement(antd_1.Table, { components: components, rowClassName: function () { return 'editable-row'; }, bordered: true, dataSource: dataSource, columns: columns })));
    };
    return AntdTableEditCell;
}(react_1["default"].Component));
exports.AntdTableEditCell = AntdTableEditCell;
