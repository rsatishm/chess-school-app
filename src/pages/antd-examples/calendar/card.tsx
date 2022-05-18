import { Calendar } from 'antd';
import { CalendarMode } from 'antd/lib/calendar/generateCalendar';

function onPanelChange(value: moment.Moment, mode: CalendarMode) {
  console.log(value, mode);
}

export const AntdCalendarCard = ()=><div className="site-calendar-demo-card">
<Calendar fullscreen={false} onPanelChange={onPanelChange} />
</div>