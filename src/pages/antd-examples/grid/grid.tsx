import { AntdComponents } from "../antd-components"
import { AntdGridBasic } from "./basic"
import { AntdGridFlex } from "./flex"
import { AntdGridFlexAlign } from "./flex-align"
import { AntdGridFlexOrder } from "./flex-order"
import { AntdGridFlexStretch } from "./flex-stretch"
import { AntdGridGutter } from "./gutter"
import { AntdGridOffset } from "./offset"
import { AntdGridPlayground } from "./playground"
import { AntdGridResponsive } from "./responsive"
import { AntdGridResponsiveMore } from "./responsive-more"
import { AntdGridSort } from "./sort"
import { AntdGridUseBreakpoint } from "./useBreakpoint"

const components = [
{feature: "basic", component: <AntdGridBasic/>},
{feature: "flexalign", component: <AntdGridFlexAlign/>},
{feature: "flexorder", component: <AntdGridFlexOrder/>},
{feature: "flexstretch", component: <AntdGridFlexStretch/>},
{feature: "flex", component: <AntdGridFlex/>},
{feature: "gutter", component: <AntdGridGutter/>},
{feature: "offset", component: <AntdGridOffset/>},
{feature: "playground", component: <AntdGridPlayground/>},
{feature: "responsivemore", component: <AntdGridResponsiveMore/>},
{feature: "responsive", component: <AntdGridResponsive/>},
{feature: "sort", component: <AntdGridSort/>},
{feature: "usebreakpoint", component: <AntdGridUseBreakpoint/>},]

export const AntdGrid = () => {
  return <AntdComponents main="grid" components={components}/>
}