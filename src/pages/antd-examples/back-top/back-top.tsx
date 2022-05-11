import { AntdComponents } from "../antd-components"
import { AntdBackTopBasic } from "./basic"
import { AntdBackTopCustom } from "./custom"

const components = [{feature: "basic", component: <AntdBackTopBasic/>},
{feature: "custom", component: <AntdBackTopCustom/>}]

export const AntdBackTop= () => {
  return <AntdComponents main="backtop" components={components}/>
}