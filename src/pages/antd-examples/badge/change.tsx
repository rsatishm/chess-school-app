import { Badge, Button, Switch, Divider, Avatar } from 'antd';
import { MinusOutlined, PlusOutlined, QuestionOutlined } from '@ant-design/icons';
import React from 'react';

const ButtonGroup = Button.Group;

export class AntdBadgeChange extends React.Component {
  state = {
    count: 5,
    show: true,
  };

  increase = () => {
    const count = this.state.count + 1;
    this.setState({ count });
  };

  decline = () => {
    let count = this.state.count - 1;
    if (count < 0) {
      count = 0;
    }
    this.setState({ count });
  };

  random = () => {
    const count = Math.floor(Math.random() * 100);
    this.setState({ count });
  };

  onChange = (show: boolean) => {
    this.setState({ show });
  };

  render() {
    return (
      <>
        <Badge count={this.state.count}>
          <Avatar shape="square" size="large" />
        </Badge>
        <ButtonGroup>
          <Button onClick={this.decline}>
            <MinusOutlined />
          </Button>
          <Button onClick={this.increase}>
            <PlusOutlined />
          </Button>
          <Button onClick={this.random}>
            <QuestionOutlined />
          </Button>
        </ButtonGroup>
        <Divider />
        <Badge dot={this.state.show}>
          <Avatar shape="square" size="large" />
        </Badge>
        <Switch onChange={this.onChange} checked={this.state.show} />
      </>
    );
  }
}