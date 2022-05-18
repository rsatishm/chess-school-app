import { AntdComponents } from "../antd-components"
import { AntdBreadcrumbBasic } from "./basic"
import { AntdBreadcrumbOverlay } from "./overlay"
import { AntdBreadcrumbReactRouter } from "./react-router"
import { AntdBreadcrumbSeparator } from "./separator"
import { AntdBreadcrumbSeparatorComp } from "./separator-component"
import { AntdBreadcrumbWithIcon } from "./withIcon"


const components = [
{feature: "basic", component: <AntdBreadcrumbBasic/>},
{feature: "overlay", component: <AntdBreadcrumbOverlay/>},
{feature: "reactrouter/*", component: <AntdBreadcrumbReactRouter/>},
{feature: "separatorcomponent", component: <AntdBreadcrumbSeparatorComp/>},
{feature: "separator", component: <AntdBreadcrumbSeparator/>},
{feature: "icon", component: <AntdBreadcrumbWithIcon/>}]

export const AntdBreadcrumb = () => {
  return <AntdComponents main="breadcrumb" components={components}/>
}