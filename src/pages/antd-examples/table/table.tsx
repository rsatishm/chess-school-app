import { AntdComponents } from "../antd-components"
import { AntdTableAjax } from "./ajax"
import { AntdTableDragSortingHandler } from "./drag-sorting-handler"
import { AntdTableDynamicSettings } from "./dynamic-settings"
import { AntdTableEditCell } from "./edit-cell"
import { AntdTableNestedTable } from "./nested-table"
import { AntdTablePagination } from "./pagination"
import { AntdTableSummary } from "./summary"
import { AntdTableTreeData } from "./tree-data"
import { AntdTableVirtualList } from "./virtual-list"

const components = [
{feature: "ajax", component: <AntdTableAjax/>},
{feature: "dragsortinghandler", component: <AntdTableDragSortingHandler/>},
{feature: "dynamicsettings", component: <AntdTableDynamicSettings/>},
{feature: "editcell", component: <AntdTableEditCell/>},
{feature: "nestedtable", component: <AntdTableNestedTable/>},
{feature: "pagination", component: <AntdTablePagination/>},
{feature: "summary", component: <AntdTableSummary/>},
{feature: "treedata", component: <AntdTableTreeData/>},
{feature: "virtuallist", component: <AntdTableVirtualList/>}]

export const AntdTable = () => {
  return <AntdComponents main="table" components={components}/>
}