import { AntdComponents } from "../antd-components"
import { AntdTimePicker12Hrs } from "./12hours"
import { AntdTimePickerBasic } from "./basic"


const components = [
{feature: "basic", component: <AntdTimePickerBasic/>},
{feature: "12hrs", component: <AntdTimePicker12Hrs/>},]

export const AntdTimePicker = () => {
  return <AntdComponents main="timepicker" components={components}/>
}