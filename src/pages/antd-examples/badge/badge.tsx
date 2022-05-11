import { AntdComponents } from "../antd-components"
import { AntdBadgeBasic } from "./basic"
import { AntdBadgeChange } from "./change"
import { AntdBadgeColorful } from "./colorful"
import { AntdBadgeDot } from "./dot"
import { AntdBadgeLink } from "./link"
import { AntdBadgeMix } from "./mix"
import { AntdBadgeNoWrapper } from "./no-wrapper"
import { AntdBadgeOffset } from "./offset"
import { AntdBadgeOverflow } from "./overflow"
import { AntdBadgeRibbon } from "./ribbbon"
import { AntdBadgeRibbonDebug } from "./ribbon-debug"
import { AntdBadgeSize } from "./size"
import { AntdBadgeStatus } from "./status"
import { AntdBadgeTitle } from "./title"

const components = [
{feature: "basic", component: <AntdBadgeBasic/>},
{feature: "change", component: <AntdBadgeChange/>},
{feature: "colorful", component: <AntdBadgeColorful/>},
{feature: "dot", component: <AntdBadgeDot/>},
{feature: "link", component: <AntdBadgeLink/>},
{feature: "mix", component: <AntdBadgeMix/>},
{feature: "noWrappper", component: <AntdBadgeNoWrapper/>},
{feature: "offset", component: <AntdBadgeOffset/>},
{feature: "overflow", component: <AntdBadgeOverflow/>},
{feature: "ribbon", component: <AntdBadgeRibbon/>},
{feature: "ribbonDebug", component: <AntdBadgeRibbonDebug/>},
{feature: "size", component: <AntdBadgeSize/>},
{feature: "status", component: <AntdBadgeStatus/>},
{feature: "title", component: <AntdBadgeTitle/>}]

export const AntdBadge = () => {
  return <AntdComponents main="badge" components={components}/>
}