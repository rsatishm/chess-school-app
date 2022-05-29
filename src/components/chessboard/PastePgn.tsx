import TextArea from "antd/lib/input/TextArea"
import Modal from "antd/lib/modal/Modal"
import { props } from "ramda"
import { useState } from "react"

interface Props {
  visible: boolean
  onChange?: (pgn: string) => any
  handleCancel: () => void,
  handleOk: (pgn: string) => void
}

interface State {
  pgn: string | null
}

export const PastePgn = (props: Props) => {

  const [state, setState] = useState<State>()

  const updateState = (newState: State) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  let pgn: string
  const handlePGNTextChange = (e: any) => {
    //const pgn = e.target.value
    //updateState({pgn})
    pgn = e.target.value
    console.log("PGN: " + pgn)
  }

  const handlePgnOk = () => {
    props.handleOk(pgn)
  }

  const handlePgnCancel = () => {
    props.handleCancel()
  }


  return <Modal
    title="Paste PGN game"
    visible={props.visible}
    style={{ top: 25 }}
    width={500}
    maskClosable={false}
    onCancel={props.handleCancel}
    onOk={handlePgnOk}
  >
    <TextArea placeholder="Paste PGN game"
      autoSize={{ minRows: 15 }}
      onChange={handlePGNTextChange}
    ></TextArea>

  </Modal>


}