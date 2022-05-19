import { Tabs, Radio } from 'antd';
import { TabsPosition } from 'antd/lib/tabs';
import { and } from 'ramda';
import React from 'react';

const { TabPane } = Tabs;

interface State {
  mode: TabsPosition | undefined
}

export class AntdTabsSlide extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      mode: 'top',
    };
  }

  handleModeChange = (e: any) => {
    const mode = e.target.value;
    this.setState({ mode });
  };

  render() {
    const { mode } = this.state;
    return (
      <div>
        <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
          <Radio.Button value="top">Horizontal</Radio.Button>
          <Radio.Button value="left">Vertical</Radio.Button>
        </Radio.Group>
        <Tabs defaultActiveKey="1" tabPosition={mode} style={{ height: 220 }}>
          {[...Array.from({ length: 30 }, (v, i) => i)].map(i => (
            <TabPane tab={`Tab-${i}`} key={i} disabled={i === 28}>
              Content of tab {i}
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}