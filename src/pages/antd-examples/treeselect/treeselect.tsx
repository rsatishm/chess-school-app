import { AntdComponents } from "../antd-components"
import { AntdTreeSelectBasic } from "./basic"

const components = [
{feature: "basic", component: <AntdTreeSelectBasic/>},]

export const AntdTreeSelect = () => {
  return <AntdComponents main="treeselect" components={components}/>
}