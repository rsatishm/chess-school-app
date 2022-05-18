import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import React from 'react';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

interface State {
  size: SizeType
}

export class AntdButtonSize extends React.Component {
  state = {
    size: 'large',
  };

  handleSizeChange = (e: any) => {
    this.setState({ size: e.target.value as SizeType });
  };

  render() {
    const size : SizeType = this.state.size as SizeType;
    return (
      <>
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br />
        <br />
        <Button type="primary" size={size}>
          Primary
        </Button>
        <Button size={size}>Default</Button>
        <Button type="dashed" size={size}>
          Dashed
        </Button>
        <br />
        <Button type="link" size={size}>
          Link
        </Button>
        <br />
        <Button type="primary" icon={<DownloadOutlined />} size={size} />
        <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={size} />
        <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size} />
        <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
          Download
        </Button>
        <Button type="primary" icon={<DownloadOutlined />} size={size}>
          Download
        </Button>
      </>
    );
  }
}