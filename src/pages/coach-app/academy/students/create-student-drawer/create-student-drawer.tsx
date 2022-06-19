import * as R from 'ramda'
import { Button, Form, Select, Input, message, Drawer} from 'antd'
import { MobXProviderContext, observer } from 'mobx-react'
import './create-student-drawer.less'
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

export const CreateStudentDrawer = observer((props: Props) => {
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
      console.log('---> values: ', values)
      const success = await studentsGroupsStore!.addStudent(values)
      if (success) {
        message.success('Added student successfully.')
        handleClose()
      }
    }).catch(()=>{
      message.error('Failed add student.')
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
          <h3>Add Student</h3>
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
          <h3>Add Student</h3>
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

    const validateUsername = (_: any, value: string, callback: Function) => {
        if (value && value.indexOf(' ') !== -1) {
          callback('Username should not contain spaces')
          return
        }
        callback()
      }
    

    const form = (() => {
      return (
        <Form form={groupForm} initialValues={
          {userIds: state.formFields.userIds,
            description: state.formFields.description}}>
          <Form.Item name="username" rules={[
                  {
                    required: true,
                    message: 'Username is required, no spaces',
                    whitespace: false
                  },
                  {
                    validator: validateUsername
                  }
                ]}>
            
                <Input
                  size="large"
                  placeholder="Username"
                  autoComplete="username"
                />
              
            </Form.Item>
            <Form.Item name='firstname' initialValue={'Firstname'}>
          <Input placeholder="First Name" />
          </Form.Item>  
          <Form.Item name='lastname' initialValue={'Lastname'}>
          <Input placeholder="First Name" />
          </Form.Item>             
            <Form.Item name="email">
              <Input
                  size="large"
                  placeholder="E-Mail"
                  type="email"
                  autoComplete="email"
                />
            </Form.Item>          
        </Form>
      )
    })()

    return (
      <div className="drawer-inner">
        <div className="title">
          <h3>Add Student</h3>
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
      className="create-student-drawer"
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