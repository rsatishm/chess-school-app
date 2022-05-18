import { Button, Tooltip } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

function getGroup(props?: any) {
  return (
    <div>
      <Button.Group {...props}>
        <Button type="primary">Button 1</Button>
        <Button type="primary">Button 2</Button>
        <Tooltip title="Tooltip">
          <Button type="primary" icon={<DownloadOutlined />} disabled />
        </Tooltip>
        <Tooltip title="Tooltip">
          <Button type="primary" icon={<DownloadOutlined />} />
        </Tooltip>
      </Button.Group>
    </div>
  );
}
export const AntdButtonLegacyGroup = ()=><>
{getGroup({ size: 'small' })}
<br />
{getGroup()}
<br />
{getGroup({ size: 'large' })}
</>