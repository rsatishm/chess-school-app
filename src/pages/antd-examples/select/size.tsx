import { Select, Radio } from 'antd';
import React from 'react';

const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`Selected: ${value}`);
}

export function AntdSelectSize() {
  const [size, setSize] = React.useState('default');

  const handleSizeChange = e => {
    setSize(e.target.value);
  };

  return (
    <>
      <Radio.Group value={size} onChange={handleSizeChange}>
        <Radio.Button value="large">Large</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="small">Small</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <Select size={size as any} defaultValue="a1" onChange={handleChange} style={{ width: 200 }}>
        {children}
      </Select>
      <br />
      <Select
        mode="multiple"
        size={size as any}
        placeholder="Please select"
        defaultValue={['a10', 'c12']}
        onChange={handleChange}
        style={{ width: '100%' }}
      >
        {children}
      </Select>
      <br />
      <Select
        mode="tags"
        size={size as any}
        placeholder="Please select"
        defaultValue={['a10', 'c12']}
        onChange={handleChange}
        style={{ width: '100%' }}
      >
        {children}
      </Select>
    </>
  );
}