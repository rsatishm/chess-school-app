import { DatePicker, Space, Radio } from 'antd';
import React from 'react';

const { RangePicker } = DatePicker;

export const AntdDatePickerPlacement = () => {
  const [placement, SetPlacement] = React.useState('topLeft');

  const placementChange = e => {
    SetPlacement(e.target.value);
  };

  return (
    <>
      <Radio.Group value={placement} onChange={placementChange}>
        <Radio.Button value="topLeft">topLeft</Radio.Button>
        <Radio.Button value="topRight">topRight</Radio.Button>
        <Radio.Button value="bottomLeft">bottomLeft</Radio.Button>
        <Radio.Button value="bottomRight">bottomRight</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <DatePicker placement={placement as any} />
      <br />
      <br />
      <RangePicker placement={placement as any} />
    </>
  );
};