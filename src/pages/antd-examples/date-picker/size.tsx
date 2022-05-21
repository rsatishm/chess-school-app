import { DatePicker, Radio, Space } from 'antd';
import React from 'react';

const { RangePicker } = DatePicker;

export class AntdDatePickerSize extends React.Component {
  state = {
    size: 'default',
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  render() {
    const { size } = this.state;
    return (
      <Space direction="vertical" size={12}>
        <Radio.Group value={size} onChange={this.handleSizeChange}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <DatePicker size={size as any} />
        <DatePicker size={size as any} picker="month" />
        <RangePicker size={size as any} />
        <DatePicker size={size as any} picker="week" />
      </Space>
    );
  }
}
