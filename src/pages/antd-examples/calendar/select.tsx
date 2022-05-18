import { Calendar, Alert } from 'antd';
import moment from 'moment';
import React from 'react';

class App extends React.Component {
  state = {
    value: moment('2017-01-25'),
    selectedValue: moment('2017-01-25'),
  };

  onSelect = (value: moment.Moment) => {
    this.setState({
      value,
      selectedValue: value,
    });
  };

  onPanelChange = (value: moment.Moment) => {
    this.setState({ value });
  };

  render() {
    const { value, selectedValue } = this.state;
    return (
      <>
        <Alert
          message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}
        />
        <Calendar value={value} onSelect={this.onSelect} onPanelChange={this.onPanelChange} />
      </>
    );
  }
}
export const AntdCalendarSelect = ()=><App />