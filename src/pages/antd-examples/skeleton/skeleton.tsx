import { AntdComponents } from "../antd-components"
import { AntdSkeletonActive } from "./active"
import { AntdSkeletonBasic } from "./basic"
import { AntdSkeletonChildren } from "./children"
import { AntdSkeletonComplex } from "./complex"
import { AntdSkleletonElement } from "./element"
import { AntdSkeletonList } from "./list"

const components = [
{feature: "active", component: <AntdSkeletonActive/>},
{feature: "basic", component: <AntdSkeletonBasic/>},
{feature: "children", component: <AntdSkeletonChildren/>},
{feature: "complex", component: <AntdSkeletonComplex/>},
{feature: "element", component: <AntdSkleletonElement/>},
{feature: "list", component: <AntdSkeletonList/>},]

export const AntdSkeleton = () => {
  return <AntdComponents main="skeleton" components={components}/>
}