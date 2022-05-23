import { AntdComponents } from "../antd-components"
import { AntdModalAsync } from "./async"
import { AntdModalBasic } from "./basic"
import { AntdModalButtonProps } from "./button-props"
import { AntdModalConfirm } from "./confirm"
import { AntdModalConfirmRouter } from "./confirm-router"
import { AntdModalDark } from "./dark"
import { AntdModalFooter } from "./footer"
import { AntdModalHooks } from "./hooks"
import { AntdModalInfo } from "./info"
import { AntdModalLocale } from "./locale"
import { AntdModalManual } from "./manual"
import { AntdModalRender } from "./modal-render"
import { AntdModalPosition } from "./position"
import { AntdModalWidth } from "./width"


const components = [
{feature: "async", component: <AntdModalAsync/>},
{feature: "basic", component: <AntdModalBasic/>},
{feature: "buttonprops", component: <AntdModalButtonProps/>},
{feature: "confirmrouter", component: <AntdModalConfirmRouter/>},
{feature: "confirm", component: <AntdModalConfirm/>},
{feature: "dark", component: <AntdModalDark/>},
{feature: "footer", component: <AntdModalFooter/>},
{feature: "hooks", component: <AntdModalHooks/>},
{feature: "info", component: <AntdModalInfo/>},
{feature: "locale", component: <AntdModalLocale/>},
{feature: "manual", component: <AntdModalManual/>},
{feature: "modalrender", component: <AntdModalRender/>},
{feature: "position", component: <AntdModalPosition/>},
{feature: "width", component: <AntdModalWidth/>},]

export const AntdModal = () => {
  return <AntdComponents main="modal" components={components}/>
}