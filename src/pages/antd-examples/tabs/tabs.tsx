import { AntdComponents } from "../antd-components"
import { AntdTabsCard } from "./card"
import { AntdTabsExtra } from "./extra"
import { AntdTabsNest } from "./nest"
import { AntdTabsPosition } from "./position"
import { AntdTabsSlide } from "./slide"


const components = [
{feature: "card", component: <AntdTabsCard/>},
{feature: "extra", component: <AntdTabsExtra/>},
{feature: "nest", component: <AntdTabsNest/>},
{feature: "position", component: <AntdTabsPosition/>},
{feature: "slide", component: <AntdTabsSlide/>}]

export const AntdTabs = () => {
  return <AntdComponents main="tabs" components={components}/>
}