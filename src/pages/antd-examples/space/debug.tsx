import { Space, Button, Popconfirm } from 'antd';

export const AntdSpaceDebug=()=><Space>
<>
  Button
  <Button>Button</Button>
</>
Button
<Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
  <Button>Delete</Button>
</Popconfirm>
<Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
  <Button disabled>Delete</Button>
</Popconfirm>
{null}
{false}
{1}
Button
{null}
{undefined}
</Space>