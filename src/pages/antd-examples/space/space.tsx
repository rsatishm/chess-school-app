import { AntdComponents } from "../antd-components"
import { AntdSpaceAlign } from "./align"
import { AntdSpaceBase } from "./base"
import { AntdSpaceCustomize } from "./customize"
import { AntdSpaceDebug } from "./debug"
import { AntdSpaceGapInLine } from "./gap-in-line"
import { AntdSpaceSize } from "./size"
import { AntdSpaceSplit } from "./split"
import { AntdSpaceVertical } from "./vertical"
import { AntdSpaceWrap } from "./wrap"

const components = [
{feature: "align", component: <AntdSpaceAlign/>},
{feature: "base", component: <AntdSpaceBase/>},
{feature: "customize", component: <AntdSpaceCustomize/>},
{feature: "debug", component: <AntdSpaceDebug/>},
{feature: "gameinline", component: <AntdSpaceGapInLine/>},
{feature: "size", component: <AntdSpaceSize/>},
{feature: "split", component: <AntdSpaceSplit/>},
{feature: "vertical", component: <AntdSpaceVertical/>},
{feature: "wrap", component: <AntdSpaceWrap/>},]

export const AntdSpace = () => {
  return <AntdComponents main="space" components={components}/>
}