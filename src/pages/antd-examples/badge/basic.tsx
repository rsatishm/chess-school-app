import { Badge, Avatar } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import './basic.css'

export const AntdBadgeBasic = ()=> <>
<Badge count={5}>
  <Avatar shape="square" size="small" />
</Badge>
<Badge count={0} showZero>
  <Avatar shape="square" size="small" />
</Badge>
<Badge count={<ClockCircleOutlined style={{ color: '#f5222d' }} />}>
  <Avatar shape="square" size="small" />
</Badge>
</>