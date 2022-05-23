import { Skeleton, Space, Divider, Switch, Form, Radio, Button, Input } from 'antd';
import React from 'react';

export class AntdSkleletonElement extends React.Component {
  state = {
    active: false,
    block: false,
    size: 'default',
    buttonShape: 'default',
    avatarShape: 'circle',
  };

  handleActiveChange = checked => {
    this.setState({ active: checked });
  };

  handleBlockChange = checked => {
    this.setState({ block: checked });
  };

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  handleShapeChange = prop => e => {
    this.setState({ [prop]: e.target.value });
  };

  render() {
    const { active, size, buttonShape, avatarShape, block } = this.state;
    return (
      <>
        <Space>
          <Skeleton.Button active={active} size={size as any} shape={buttonShape as any} block={block} />
          <Skeleton.Avatar active={active} size={size as any} shape={avatarShape as any} />
          <Skeleton.Input active={active} size={size as any} />
        </Space>
        <br />
        <br />
        <Skeleton.Button active={active} size={size as any} shape={buttonShape as any} block={block} />
        <br />
        <br />
        <Skeleton.Input active={active} size={size as any} block={block} />
        <br />
        <br />
        <Skeleton.Image />
        <Divider />
        <Form layout="inline" style={{ margin: '16px 0' }}>
          <Form.Item label="Active">
            <Switch checked={active} onChange={this.handleActiveChange} />
          </Form.Item>
          <Form.Item label="Button and Input Block">
            <Switch checked={block} onChange={this.handleBlockChange} />
          </Form.Item>
          <Form.Item label="Size">
            <Radio.Group value={size} onChange={this.handleSizeChange}>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="large">Large</Radio.Button>
              <Radio.Button value="small">Small</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Button Shape">
            <Radio.Group value={buttonShape} onChange={this.handleShapeChange('buttonShape')}>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="round">Round</Radio.Button>
              <Radio.Button value="circle">Circle</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Avatar Shape">
            <Radio.Group value={avatarShape} onChange={this.handleShapeChange('avatarShape')}>
              <Radio.Button value="square">Square</Radio.Button>
              <Radio.Button value="circle">Circle</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
      </>
    );
  }
}