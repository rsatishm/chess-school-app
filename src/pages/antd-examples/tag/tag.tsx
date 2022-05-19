import { AntdComponents } from "../antd-components"
import { AntdTagAnimation } from "./animation"
import { AntdTagBasic } from "./basic"
import { AntdTagCustomize } from "./customize"


const components = [
{feature: "animation", component: <AntdTagAnimation/>},
{feature: "basic", component: <AntdTagBasic/>},
{feature: "customize", component: <AntdTagCustomize/>}]

export const AntdTag = () => {
  return <AntdComponents main="tag" components={components}/>
}