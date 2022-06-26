import * as R from 'ramda'
import { Button, Form, Select, Input, message, Drawer} from 'antd'
import { MobXProviderContext, observer } from 'mobx-react'
import './create-group-drawer.less'
import { useContext, useState } from 'react'
import { useForm } from 'antd/lib/form/Form'
import { ExceptionOutlined, LoadingOutlined } from '@ant-design/icons'

const { TextArea } = Input
const Option = Select.Option

interface Props {
  visible: boolean
  onClose: () => any
}

interface State {
  confirmDirty: boolean
  formFields: {
    name: string
    description: string
    groupType: string
    purpose: string
    userIds: string[]
  }
}

export const CreateGroupDrawer = observer((props: Props) => {
  const [state, setState] = useState<State>({
    confirmDirty: false,
    formFields: {
      name: '',
      description: '',
      groupType: 'academy',
      purpose: 'student',
      userIds: []
    }
  })
  const [groupForm] = useForm()
  const { studentsGroupsStore } = useContext(MobXProviderContext)

  const handleCancelClick = () => {
    groupForm.resetFields()
    props.onClose()
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    groupForm.validateFields().then(async (values: any) => {
      console.log('---> values: ', JSON.stringify(values))
      const success = await studentsGroupsStore!.create(values)
      if (success) {
        message.success('Created group successfully.')
        props.onClose()
      }
    }).catch(()=>{
      message.error('Failed to create group.')
    })
  }

  const handleClose = () => {
    groupForm.resetFields()
    props.onClose()
  }

  const studentSelectFilterOption = (inputValue: string, option: any) => {
    return (
      option.props.children
        .toString()
        .toLowerCase()
        .indexOf(inputValue.toLowerCase()) >= 0
    )
  }

  const renderSubmittingState = () => {
    return (
      <div className="drawer-inner">
        <div className="title">
          <h3>Create Group</h3>
        </div>
        <div className="content">
          <div className="loading-state container">
            <LoadingOutlined spin={true} />
            <p className="exception-text">Creating</p>
          </div>
        </div>
        <div className="button-bar">
          <Button className="cancel-button" onClick={props.onClose}>
            Close
          </Button>
          <Button type="primary" disabled={true}>
            Create
          </Button>
        </div>
      </div>
    )
  }

  const renderSubmitErrorState = () => {
    return (
      <div className="drawer-inner">
        <div className="title">
          <h3>Create Group</h3>
        </div>
        <div className="content">
          <div className="error-state container">
            <ExceptionOutlined />
            <p className="exception-text">Error creating group.</p>
            <span className="action-text">
              <Button danger onClick={handleSubmit}>
                Retry
              </Button>
            </span>
          </div>
        </div>
        <div className="button-bar">
          <Button className="cancel-button" onClick={props.onClose}>
            Close
          </Button>
          <Button type="primary" disabled={true}>
            Submit
          </Button>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    if (studentsGroupsStore!.creating) {
      return renderSubmittingState()
    }

    if (studentsGroupsStore!.createError) {
      return renderSubmitErrorState()
    }

    const form = (() => {
      return (
        <Form form={groupForm} initialValues={
          {userIds: state.formFields.userIds,
            description: state.formFields.description}}>
          <Form.Item name="name" rules={ [{ required: true, message: 'Name is required' }]}>
          <Input placeholder="Group Name" />
          </Form.Item>
          <Form.Item name="userIds" rules={ [
                {
                  required: true,
                  message: 'At least one student must be selected'
                }
              ]}>        
              <Select
                mode="multiple"
                placeholder="Select Students"
                filterOption={studentSelectFilterOption}
              >
                {R.values(studentsGroupsStore!.students).map(
                  (s: any) => (
                    <Option key={s.uuid} value={s.uuid}>
                      {s.firstname + ', ' + s.lastname} ({s.username})
                    </Option>
                  )
                )}
              </Select>          
          </Form.Item>
          <Form.Item name="description" rules={ [{ required: true, message: 'Description is required' }]}>
            <TextArea rows={2} placeholder="Group Description" />
          </Form.Item>
        </Form>
      )
    })()

    return (
      <div className="drawer-inner">
        <div className="title">
          <h3>Create Group</h3>
        </div>
        <div className="content">{form}</div>
        <div className="button-bar">
          <Button className="cancel-button" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button
            type="primary"
            disabled={studentsGroupsStore!.loading}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Drawer
      className="create-group-drawer"
      width={450}
      placement="right"
      onClose={handleClose}
      maskClosable={false}
      closable={false}
      visible={props.visible}
    >
      {renderContent()}
    </Drawer>
  )
})