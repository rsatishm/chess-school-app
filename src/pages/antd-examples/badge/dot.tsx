import { Badge } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';

export const AntdBadgeDot = ()=><>
<Badge dot>
  <NotificationOutlined style={{ fontSize: 16 }} />
</Badge>
<Badge dot>
  <a href="#">Link something</a>
</Badge>
</>