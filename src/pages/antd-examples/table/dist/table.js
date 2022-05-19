"use strict";
exports.__esModule = true;
exports.AntdTable = void 0;
var antd_components_1 = require("../antd-components");
var ajax_1 = require("./ajax");
var drag_sorting_handler_1 = require("./drag-sorting-handler");
var dynamic_settings_1 = require("./dynamic-settings");
var edit_cell_1 = require("./edit-cell");
var nested_table_1 = require("./nested-table");
var pagination_1 = require("./pagination");
var summary_1 = require("./summary");
var tree_data_1 = require("./tree-data");
var virtual_list_1 = require("./virtual-list");
var components = [
    { feature: "ajax", component: React.createElement(ajax_1.AntdTableAjax, null) },
    { feature: "dragsortinghandler", component: React.createElement(drag_sorting_handler_1.AntdTableDragSortingHandler, null) },
    { feature: "dynamicsettings", component: React.createElement(dynamic_settings_1.AntdTableDynamicSettings, null) },
    { feature: "editcell", component: React.createElement(edit_cell_1.AntdTableEditCell, null) },
    { feature: "nestedtable", component: React.createElement(nested_table_1.AntdTableNestedTable, null) },
    { feature: "pagination", component: React.createElement(pagination_1.AntdTablePagination, null) },
    { feature: "summary", component: React.createElement(summary_1.AntdTableSummary, null) },
    { feature: "treedata", component: React.createElement(tree_data_1.AntdTableTreeData, null) },
    { feature: "virtuallist", component: React.createElement(virtual_list_1.AntdTableVirtualList, null) }
];
exports.AntdTable = function () {
    return React.createElement(antd_components_1.AntdComponents, { main: "table", components: components });
};
