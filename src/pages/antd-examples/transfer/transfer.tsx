import { AntdComponents } from "../antd-components"
import { AntdTransferBasic } from "./basic"

const components = [
{feature: "basic", component: <AntdTransferBasic/>},]

export const AntdTransfer = () => {
  return <AntdComponents main="transfer" components={components}/>
}