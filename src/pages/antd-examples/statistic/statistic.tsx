import { AntdComponents } from "../antd-components"
import { AntdStatisticBasic } from "./basic"
import { AntdStatisticCard } from "./card"
import { AntdStatisticCountDown } from "./countdown"
import { AntdStatisticUnit } from "./unit"


const components = [
{feature: "basic", component: <AntdStatisticBasic/>},
{feature: "card", component: <AntdStatisticCard/>},
{feature: "countdown", component: <AntdStatisticCountDown/>},
{feature: "unit", component: <AntdStatisticUnit/>},]

export const AntdStatistic = () => {
  return <AntdComponents main="statistic" components={components}/>
}