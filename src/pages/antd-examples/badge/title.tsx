import { Badge, Avatar } from 'antd';

export const AntdBadgeTitle = ()=><>
<Badge count={5} title="Custom hover text">
  <Avatar shape="square" size="large" />
</Badge>
<Badge count={-5} title="Negative">
  <Avatar shape="square" size="large" />
</Badge>
</>