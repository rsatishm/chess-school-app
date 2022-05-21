import { AntdComponents } from "../antd-components"
import { AntdLayoutCustomTrigger } from "./custom-trigger"
import { AntdLayoutCustomTriggerDebug } from "./custom-trigger-debug"
import { AntdLayoutBasic } from "./basic"
import { AntdLayoutFixedSider } from "./fixed-sider"
import { AntdLayoutFixed } from "./fixed"
import { AntdLayoutResponsive } from "./responsive"
import { AntdLayoutSide } from "./side"
import { AntdLayoutTopSide2 } from "./top-side-2"
import { AntdLayoutTopSide } from "./top-side"
import { AntdLayoutTop } from "./top"

const components = [
{feature: "basic", component: <AntdLayoutBasic/>},
{feature: "customtriggerdebug", component: <AntdLayoutCustomTriggerDebug/>},
{feature: "customtrigger", component: <AntdLayoutCustomTrigger/>},
{feature: "fixedsider", component: <AntdLayoutFixedSider/>},
{feature: "fixed", component: <AntdLayoutFixed/>},
{feature: "responsive", component: <AntdLayoutResponsive/>},
{feature: "side", component: <AntdLayoutSide/>},
{feature: "topside2", component: <AntdLayoutTopSide2/>},
{feature: "topside", component: <AntdLayoutTopSide/>},
{feature: "top", component: <AntdLayoutTop/>},]

export const AntdLayout = () => {
  return <AntdComponents main="layout" components={components}/>
}