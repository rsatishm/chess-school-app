import { Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './badge.css'

export const AntdAvatarBadge = ()=><>
<span className="avatar-item">
  <Badge count={13}>
    <Avatar shape="circle" icon={<UserOutlined />} />
  </Badge>
</span>
<span>
  <Badge dot>
    <Avatar shape="square" icon={<UserOutlined />} />
  </Badge>
</span>
</>