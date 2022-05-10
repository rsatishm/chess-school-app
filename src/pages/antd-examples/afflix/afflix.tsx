import { AntdComponents } from "../antd-components"
import { AntdAffixBasic } from "./basic"
import { AntdAffixDebug } from "./debug"
import { AntdAffixOnChange } from "./on-change"
import { AntdAffixTarget } from "./target"

const components = [{feature: "basic", component: <AntdAffixBasic/>},
{feature: "debug", component: <AntdAffixDebug/>},
{feature: "onChange", component: <AntdAffixOnChange/>},
{feature: "target", component: <AntdAffixTarget/>}]

export const AntdAfflix= () => {
  return <AntdComponents main="afflix" components={components}/>
}