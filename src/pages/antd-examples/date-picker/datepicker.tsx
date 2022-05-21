import { AntdComponents } from "../antd-components"
import { AntdDatePickerBasic } from "./basic"
import { AntdDatePickerBordered } from "./bordered"
import { AntdDatePickerDateRender } from "./date-render"
import { AntdDatePickerDisabled } from "./disabled"
import { AntdDatePickerDisabledDate } from "./disabled-date"
import { AntdDatePickerExtraFooter } from "./extra-footer"
import { AntdDatePickerFormat } from "./format"
import { AntdDatePickerMode } from "./mode"
import { AntdDatePickerPlacement } from "./placement"
import { AntdDatePickerPresettedRanges } from "./presetted-ranges"
import { AntdDatePickerRangePicker } from "./range-picker"
import { AntdDatePickerSelectInRange } from "./select-in-range"
import { AntdDatePickerSize } from "./size"
import { AntdDatePickerStartEnd } from "./start-end"
import { AntdDatePickerStatus } from "./status"
import { AntdDatePickerSuffix } from "./suffix"
import { AntdDatePickerSwitchable } from "./switchable"
import { AntdDatePickerTime } from "./time"

const components = [
{feature: "basic", component: <AntdDatePickerBasic/>},
{feature: "bordered", component: <AntdDatePickerBordered/>},
{feature: "daterender", component: <AntdDatePickerDateRender/>},
{feature: "disableddate", component: <AntdDatePickerDisabledDate/>},
{feature: "disabled", component: <AntdDatePickerDisabled/>},
{feature: "extrafooter", component: <AntdDatePickerExtraFooter/>},
{feature: "format", component: <AntdDatePickerFormat/>},
{feature: "mode", component: <AntdDatePickerMode/>},
{feature: "placement", component: <AntdDatePickerPlacement/>},
{feature: "presettedranges", component: <AntdDatePickerPresettedRanges/>},
{feature: "rangepicker", component: <AntdDatePickerRangePicker/>},
{feature: "selectinrange", component: <AntdDatePickerSelectInRange/>},
{feature: "size", component: <AntdDatePickerSize/>},
{feature: "startend", component: <AntdDatePickerStartEnd/>},
{feature: "status", component: <AntdDatePickerStatus/>},
{feature: "suffix", component: <AntdDatePickerSuffix/>},
{feature: "switchable", component: <AntdDatePickerSwitchable/>},
{feature: "time", component: <AntdDatePickerTime/>},]

export const AntdDatePicker = () => {
  return <AntdComponents main="datepicker" components={components}/>
}