import { DatePicker, Space } from 'antd';

const error : any = "error"
const warning : any = "warning"

export const AntdDatePickerStatus: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <DatePicker status="error" style={{ width: '100%' }} />
    <DatePicker status="warning" style={{ width: '100%' }} />
    <DatePicker.RangePicker style={{ width: '100%' }} />
    <DatePicker.RangePicker style={{ width: '100%' }} />
  </Space>
);
