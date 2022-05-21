import React, { useState } from 'react';
import { Space, Radio, Button } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

export function AntdSpaceSize() {
  const [size, setSize] = useState('small');

  return (
    <>
      <Radio.Group value={size} onChange={e => setSize(e.target.value)}>
        <Radio value="small">Small</Radio>
        <Radio value="middle">Middle</Radio>
        <Radio value="large">Large</Radio>
      </Radio.Group>
      <br />
      <br />
      <Space size={size as SizeType}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Space>
    </>
  );
}