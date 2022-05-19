import { TimePicker } from 'antd';
import moment from 'moment';

function onChange(time: any, timeString: any) {
  console.log(time, timeString);
}

export const AntdTimePickerBasic = ()=><TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />