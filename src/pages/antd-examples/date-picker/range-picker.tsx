import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

export const AntdDatePickerRangePicker = ()=><Space direction="vertical" size={12}>
<RangePicker />
<RangePicker showTime />
<RangePicker picker="week" />
<RangePicker picker="month" />
<RangePicker picker="quarter" />
<RangePicker picker="year" />
</Space>