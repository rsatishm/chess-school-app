import { AntdComponents } from "../antd-components"
import { AntdAvatarBadge } from "./badge"
import { AntdAvatarBasic } from "./basic"
import { AntdAvatarDynamic } from "./dynamic"
import { AntdAvatarFallback } from "./fallback"
import { AntdAvatarGroup } from "./group"
import { AntdAvatarResponsive } from "./responsive"
import { AntdAvatarToggleDebug } from "./toggle-debug"
import { AntdAvatarType } from "./type"

const components = [{feature: "badge", component: <AntdAvatarBadge/>},
{feature: "basic", component: <AntdAvatarBasic/>},
{feature: "dynamic", component: <AntdAvatarDynamic/>},
{feature: "fallback", component: <AntdAvatarFallback/>},
{feature: "group", component: <AntdAvatarGroup/>},
{feature: "responsive", component: <AntdAvatarResponsive/>},
{feature: "toggleDebug", component: <AntdAvatarToggleDebug/>},
{feature: "type", component: <AntdAvatarType/>}]

export const AntdAvatar = () => {
  return <AntdComponents main="avatar" components={components}/>
}