import { AntdComponents } from "../antd-components"
import { AntdTreeBasic } from "./basic"
import { AntdTreeBasicControlled } from "./basic-controlled"
import { AntdTreeBigData } from "./big-data"
import { AntdTreeCustomizedIcon } from "./customized-icon"
import { AntdTreeDirectory } from "./directory"
import { AntdTreeLine } from "./line"
import { AntdTreeSwitcherIcon } from "./switcher-icon"
import { AntdTreeVirtualScroll } from "./virtual-scroll"

const components = [
{feature: "basiccontrolled", component: <AntdTreeBasicControlled/>},
{feature: "basic", component: <AntdTreeBasic/>},
{feature: "bigdata", component: <AntdTreeBigData/>},
{feature: "customizedicon", component: <AntdTreeCustomizedIcon/>},
{feature: "directory", component: <AntdTreeDirectory/>},
{feature: "line", component: <AntdTreeLine/>},
{feature: "switchericon", component: <AntdTreeSwitcherIcon/>},
{feature: "virtualscroll", component: <AntdTreeVirtualScroll/>}]

export const AntdTree = () => {
  return <AntdComponents main="tree" components={components}/>
}