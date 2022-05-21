import { AntdComponents } from "../antd-components"
import { AntdDescriptionsBasic } from "./basic"
import { AntdDescriptionsBorder } from "./border"
import { AntdDescriptionsResponsive } from "./responsive"
import { AntdDescriptionsSize } from "./size"
import { AntdDescriptionsStyle } from "./style"
import { AntdDescriptionsText } from "./text"
import { AntdDescriptionsVertical } from "./vertical"
import { AntdDescriptionsVerticalBorder } from "./vertical-border"


const components = [
{feature: "basic", component: <AntdDescriptionsBasic/>},
{feature: "border", component: <AntdDescriptionsBorder/>},
{feature: "responsive", component: <AntdDescriptionsResponsive/>},
{feature: "size", component: <AntdDescriptionsSize/>},
{feature: "style", component: <AntdDescriptionsStyle/>},
{feature: "text", component: <AntdDescriptionsText/>},
{feature: "verticalborder", component: <AntdDescriptionsVerticalBorder/>},
{feature: "vertical", component: <AntdDescriptionsVertical/>}]

export const AntdDescriptions = () => {
  return <AntdComponents main="descriptions" components={components}/>
}