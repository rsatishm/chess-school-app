import { Badge, Avatar } from 'antd';

export const AntdBadgeOverflow = ()=><>
<Badge count={99}>
  <Avatar shape="square" size="large" />
</Badge>
<Badge count={100}>
  <Avatar shape="square" size="large" />
</Badge>
<Badge count={99} overflowCount={10}>
  <Avatar shape="square" size="large" />
</Badge>
<Badge count={1000} overflowCount={999}>
  <Avatar shape="square" size="large" />
</Badge>
</>