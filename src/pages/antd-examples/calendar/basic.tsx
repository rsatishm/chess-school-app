import { Calendar } from 'antd';
import { CalendarMode } from 'antd/lib/calendar/generateCalendar';

function onPanelChange(value: moment.Moment, mode: CalendarMode) {
  console.log(value.format('YYYY-MM-DD'), mode);
}

export const AntdCalendarBasic = ()=><Calendar onPanelChange={onPanelChange} />