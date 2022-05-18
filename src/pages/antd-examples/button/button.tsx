import { AntdComponents } from "../antd-components"
import { AntdButtonBasic } from "./basic"
import { AntdButtonBlock } from "./block"
import { AntdButtonDanger } from "./danger"
import { AntdButtonDisabled } from "./disabled"
import { AntdButtonGhost } from "./ghost"
import { AntdButtonIcon } from "./icon"
import { AntdButtonLegacyGroup } from "./legacy-group"
import { AntdButtonLoading } from "./loading"

const components = [
{feature: "basic", component: <AntdButtonBasic/>},
{feature: "block", component: <AntdButtonBlock/>},
{feature: "danger", component: <AntdButtonDanger/>},
{feature: "disabled", component: <AntdButtonDisabled/>},
{feature: "ghost", component: <AntdButtonGhost/>},
{feature: "icon", component: <AntdButtonIcon/>},
{feature: "legacygroup", component: <AntdButtonLegacyGroup/>},
{feature: "loading", component: <AntdButtonLoading/>}]

export const AntdButton = () => {
  return <AntdComponents main="button" components={components}/>
}