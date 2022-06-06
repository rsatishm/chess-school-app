import { useState } from 'react'
import { Modal, Row, Col, InputNumber } from 'antd'
import { ConfiguredChessboard } from '../chessboard/configured-chessboard'

interface Props {
  visible: boolean
  confirmLoading: boolean
  handleOk: (blackTime: number, whiteTime: number) => void
  handleCancel: () => void
  fen: string
}

interface State {
  blackTime?: any
  whiteTime?: any
}

export const RestartGameModal = (props: Props)=>{
  const [state, setState] = useState<State>({
    blackTime: 10,
    whiteTime: 10
  })

  const handleOk = () => {
    return props.handleOk(state.blackTime, state.whiteTime)
  }

  const updateState = (newState: State) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }

  const handleTimeChange = (color: string) => (value: any) => {
    if (color == 'black') {
      updateState({
        blackTime: value
      })
    } else {
      updateState({
        whiteTime: value
      })
    }
  }
  return (
    <Modal
      visible={props.visible}
      title="Restart Game"
      onOk={handleOk}
      confirmLoading={props.confirmLoading}
      onCancel={props.handleCancel}
    >
      <Row justify="center" align="middle">
        <Col flex={1}>
          <ConfiguredChessboard
            fen={props.fen}
            width={250}
            height={250}
            interactionMode="NONE"
          />
        </Col>
      </Row>
      <br />
      <Row justify="center" align="middle">
        <Col flex={1} span={6}>
          <p style={{ textAlign: 'center', margin: '0' }}>White Time</p>
        </Col>

        <Col flex={1} span={6}>
          <InputNumber
            value={state.whiteTime}
            min={1}
            max={100}
            onChange={handleTimeChange('white')}
          />
        </Col>
      </Row>
      <br />
      <Row justify="center" align="middle">
        <Col flex={1} span={6}>
          <p style={{ textAlign: 'center', margin: '0' }}>Black Time</p>
        </Col>

        <Col flex={1} span={6}>
          <InputNumber
            value={state.blackTime}
            min={1}
            max={100}
            onChange={handleTimeChange('black')}
          />
        </Col>
      </Row>
    </Modal>
  )
}