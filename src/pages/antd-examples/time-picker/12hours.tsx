import { TimePicker } from 'antd';

function onChange(time: any, timeString: any) {
  console.log(time, timeString);
}

export const AntdTimePicker12Hrs = ()=><>
<TimePicker use12Hours onChange={onChange} />
<TimePicker use12Hours format="h:mm:ss A" onChange={onChange} style={{ width: 140 }} />
<TimePicker use12Hours format="h:mm a" onChange={onChange} />
</>