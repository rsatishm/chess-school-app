import { Modal } from 'antd'
import { toJS } from 'mobx'

interface Props {
  visible: boolean
  handleOk: any
  handleCancel: any
  invitationDetails: any
}

const AcceptInviteModal = (props: Props)=>{
  const handleOk = () => {
    return props.handleOk(toJS(props.invitationDetails))
  }
  return (
    <div>
      <Modal
        title="Accept Invitation"
        visible={props.visible}
        onOk={handleOk}
        onCancel={props.handleCancel}
      >
        <p>{JSON.stringify(props.invitationDetails)}</p>
      </Modal>
    </div>
  )
}

export default AcceptInviteModal
