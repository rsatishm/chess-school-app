import * as React from 'react'
import * as R from 'ramda'
import { Button, Form, Select, Input, message, Drawer } from 'antd'
import { MobXProviderContext } from 'mobx-react'
import './edit-group-drawer.less'
import { useContext, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { ExceptionOutlined, LoadingOutlined } from '@ant-design/icons'

const { TextArea } = Input
const Option = Select.Option

interface Props {
  visible: boolean
  onClose: () => any
  groupDetail: any
}

interface State {
  confirmDirty?: boolean
  formFields?: {
    name: string
    description: string
    groupType: string
    purpose: string
    userIds: string[]
  }
}

export const EditGroupDrawer = (props: Props) => {
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

  const updateState = (newState: State) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }

  const [form] = useForm()

  React.useEffect(() => {
    if (props.visible) {
      updateState({
        formFields: {
          name: props.groupDetail.name,
          description: props.groupDetail.description,
          groupType: 'academy',
          purpose: 'student',
          userIds: props.groupDetail.userIds
        }
      })
    }
  }, [props.groupDetail.name, props.groupDetail.description, props.groupDetail.userIds])

  const { studentsGroupsStore } = useContext(MobXProviderContext)

  const handleCancelClick = () => {
    form.resetFields()
    props.onClose()
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFields().then(async (values: any) => {
      const success = await studentsGroupsStore!.edit(
        props.groupDetail.uuid,
        values)
      message.success('Edited group successfully.')
      props.onClose()
    }
    ).catch(() => {
      message.error('Failed to edit group.')
    })
  }

  const handleClose = () => {
    form.resetFields()
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
          <h3>Edit Group</h3>
        </div>
        <div className="content">
          <div className="loading-state container">
            <LoadingOutlined spin={true} />
            <p className="exception-text">Submitting</p>
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

  const renderSubmitErrorState = () => {
    return (
      <div className="drawer-inner">
        <div className="title">
          <h3>Edit Group</h3>
        </div>
        <div className="content">
          <div className="error-state container">
            <ExceptionOutlined />
            <p className="exception-text">Error submitting group.</p>
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
    if (studentsGroupsStore!.editing) {
      return renderSubmittingState()
    }

    if (studentsGroupsStore!.editError) {
      return renderSubmitErrorState()
    }

    const groupForm = (() => {
      return (
        <Form form={form} initialValues={{
          name: state.formFields!.name,
          userIds: state.formFields!.userIds,
          description: state.formFields!.description
        }}>
          <Form.Item rules={[{ required: true, message: 'Name is required' }]}>
            <Input placeholder="Group Name" />
          </Form.Item>
          <Form.Item rules={[
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
          <Form.Item rules={[{ required: true, message: 'Description is required' }]}>
            <TextArea rows={2} placeholder="Group Description" />)
          </Form.Item>
        </Form>
      )
    })()

    return (
      <div className="drawer-inner">
        <div className="title">
          <h3>Edit Group</h3>
        </div>
        <div className="content">{groupForm}</div>
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
      className="edit-group-drawer"
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
}