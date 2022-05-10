import { AntdComponents } from "../antd-components"
import { AntdAlertAction } from "./action"
import { AntdAlertBanner } from "./banner"
import { AntdAlertBasic } from "./basic"
import { AntdAlertonClosable } from "./closable"
import { AntdAlertCloseText } from "./close-text"
import { AntdAlertCustomIcon } from "./custom-icon"
import { AntdAlertDescription } from "./description"
import { AntdAlertErrorBoundary } from "./error-boundary"
import { AntdAlertIcon } from "./icon"
import { AntdAlertLoopBanner } from "./loop-banner"
import { AntdAlertSmoothClosed } from "./smooth-closed"
import { AntdAlertStyle } from "./style"


const components = [{feature: "action", component: <AntdAlertAction/>},
{feature: "banner", component: <AntdAlertBanner/>},
{feature: "basic", component: <AntdAlertBasic/>},
{feature: "closable", component: <AntdAlertonClosable/>},
{feature: "closeText", component: <AntdAlertCloseText/>},
{feature: "customIcon", component: <AntdAlertCustomIcon/>},
{feature: "description", component: <AntdAlertDescription/>},
{feature: "errorBoundary", component: <AntdAlertErrorBoundary/>},
{feature: "icon", component: <AntdAlertIcon/>},
{feature: "loopBanner", component: <AntdAlertLoopBanner/>},
{feature: "smoothClosed", component: <AntdAlertSmoothClosed/>},
{feature: "style", component: <AntdAlertStyle/>}]

export const AntdAlert= () => {
  return <AntdComponents main="Alert" components={components}/>
}