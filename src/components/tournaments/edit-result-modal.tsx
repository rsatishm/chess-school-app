import { useState } from 'react'
import { Modal, Row, Col, Select } from 'antd'

interface Props {
  visible: boolean
  confirmLoading: boolean
  handleOk: (resultValue: string) => void
  handleCancel: () => void
}

interface State {
  value: string
}

export const EditResultModal = (props: Props) => {
  const [state, setState] = useState<State>({
    value: '1-0'
  })

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }

  const handleResultChange = (value: any) => {
    updateState({
      value
    })
  }

  const handleOk = () => {
    return props.handleOk(state.value)
  }

  return (
    <Modal
      visible={props.visible}
      title="Edit Result"
      onOk={handleOk}
      confirmLoading={props.confirmLoading}
      onCancel={props.handleCancel}
    >
      <Row align="middle">
        <Col flex={1} span={6}>
          <p style={{ textAlign: 'center', margin: '0' }}>Result</p>
        </Col>
        <Col flex={1} span={6}>
          <Select
            value={state.value}
            style={{ width: 120 }}
            onChange={handleResultChange}
          >
            <Select.Option value="1-0">1-0</Select.Option>
            <Select.Option value="0-1">0-1</Select.Option>
            <Select.Option value="0.5-0.5">0.5-0.5</Select.Option>
          </Select>
        </Col>
      </Row>
    </Modal>
  )
}