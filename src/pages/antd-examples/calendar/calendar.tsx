import { AntdComponents } from "../antd-components"
import { AntdCalendarBasic } from "./basic"
import { AntdCalendarCard } from "./card"
import { AntdCalendarCustomizeHeader } from "./customize-header"
import { AntdCalendarSelect } from "./select"
import { AntdCalendarNoticeCalendar } from "./notice-calendar"


const components = [
{feature: "basic", component: <AntdCalendarBasic/>},
{feature: "card", component: <AntdCalendarCard/>},
{feature: "customizeheader/*", component: <AntdCalendarCustomizeHeader/>},
{feature: "noticecalendar", component: <AntdCalendarNoticeCalendar/>},
{feature: "select", component: <AntdCalendarSelect/>}]

export const AntdCalendar = () => {
  return <AntdComponents main="calendar" components={components}/>
}