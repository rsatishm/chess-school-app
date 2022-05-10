import { AntdComponents } from "../antd-components"
import { AntdAnchorBasic } from "./basic"
import { AntdAnchorCustomizeHighlight } from "./customizeHighlight"
import { AntdAnchorOnChange } from "./onChange"
import { AntdAnchorOnClick } from "./onClick"
import { AntdAnchorStatic } from "./static"
import { AntdAnchorTargetOffset } from "./targetOffset"


const components = [{feature: "basic", component: <AntdAnchorBasic/>},
{feature: "customizeHighlight", component: <AntdAnchorCustomizeHighlight/>},
{feature: "onChange", component: <AntdAnchorOnChange/>},
{feature: "onCick", component: <AntdAnchorOnClick/>},
{feature: "static", component: <AntdAnchorStatic/>},
{feature: "targetOffset", component: <AntdAnchorTargetOffset/>}]

export const AntdAnchor = () => {
  return <AntdComponents main="anchor" components={components}/>
}