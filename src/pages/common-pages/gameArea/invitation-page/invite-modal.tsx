import React, { Component, useState } from 'react'
import { Modal, Select, Row, Col } from 'antd'

interface Props {
  visible: boolean
  handleOk: any
  handleCancel: any
}

interface State {
  time: number
  increment: number
  color: string
}

const InviteModal = (props: Props)=>{
  const [state, setState] = useState({
    time: 15,
    increment: 0,
    color: 'black'
  })

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
        return { ...prevState, ...newState }
    })
}

  const handleTimeChange = (time: number) => {
    updateState({
      time
    })
  }

  const handleColorChange = (color: string) => {
    updateState({
      color
    })
  }

  const handleOk = () => {
    props.handleOk(state.color, state.time, state.increment)
  }

  const handleTimeIncrement = (increment: number) => {
    updateState({ increment })
  }

  return (
    <div>
      <Modal
        title="Send Invitation"
        visible={props.visible}
        onOk={handleOk}
        onCancel={props.handleCancel}
      >
        <Row align="middle">
          <Col span={6}>
            <p style={{ textAlign: 'center', margin: '0' }}>Your color</p>
          </Col>
          <Col span={6}>
            <Select
              value={state.color}
              placeholder="Select color"
              style={{ width: 120 }}
              onChange={handleColorChange}
            >
              <Select.Option value="white">white</Select.Option>
              <Select.Option value="black">black</Select.Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row align="middle">
          <Col span={6}>
            <p style={{ textAlign: 'center', margin: '0' }}>Time Control</p>
          </Col>
          <Col span={6}>
            <Select
              value={state.time}
              placeholder="Select time control"
              style={{ width: 120 }}
              onChange={handleTimeChange}
            >
              <Select.Option value={1}>1 minute</Select.Option>
              <Select.Option value={3}>3 minutes</Select.Option>
              <Select.Option value={5}>5 minutes</Select.Option>
              <Select.Option value={10}>10 minutes</Select.Option>
              <Select.Option value={15}>15 minutes</Select.Option>
              <Select.Option value={20}>20 minutes</Select.Option>
              <Select.Option value={30}>30 minutes</Select.Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row align="middle">
          <Col span={6}>
            <p style={{ textAlign: 'center', margin: '0' }}>Time Increment</p>
          </Col>
          <Col span={6}>
            <Select
              value={state.increment}
              placeholder="Select time increment"
              style={{ width: 120 }}
              onChange={handleTimeIncrement}
              defaultValue={0}
            >
              <Select.Option value={0}>None</Select.Option>
              <Select.Option value={1}>1 second</Select.Option>
              <Select.Option value={2}>2 seconds</Select.Option>
              <Select.Option value={3}>3 seconds</Select.Option>
              <Select.Option value={5}>5 seconds</Select.Option>
              <Select.Option value={10}>10 seconds</Select.Option>
              <Select.Option value={15}>15 seconds</Select.Option>
              <Select.Option value={20}>20 seconds</Select.Option>
              <Select.Option value={30}>30 seconds</Select.Option>
            </Select>
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default InviteModal
