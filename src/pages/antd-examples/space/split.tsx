import { Space, Typography, Divider } from 'antd';

export function AntdSpaceSplit() {
  return (
    <Space split={<Divider type="vertical" />}>
      <Typography.Link>Link</Typography.Link>
      <Typography.Link>Link</Typography.Link>
      <Typography.Link>Link</Typography.Link>
    </Space>
  );
}