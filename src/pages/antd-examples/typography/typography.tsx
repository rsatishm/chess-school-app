import { AntdComponents } from "../antd-components"
import { AntdTypographyBasic } from "./basic"


const components = [
{feature: "basic", component: <AntdTypographyBasic/>},]

export const AntdTypography = () => {
  return <AntdComponents main="typography" components={components}/>
}