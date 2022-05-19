import { AntdComponents } from "../antd-components"
import { AntdTimelineBasic } from "./basic"
import { AntdTimelineCustom } from "./custom"
import { AntdTimelinePending } from "./pending"

const components = [
{feature: "basic", component: <AntdTimelineBasic/>},
{feature: "custom", component: <AntdTimelineCustom/>},
{feature: "pending", component: <AntdTimelinePending/>},]

export const AntdTimeline = () => {
  return <AntdComponents main="timeline" components={components}/>
}