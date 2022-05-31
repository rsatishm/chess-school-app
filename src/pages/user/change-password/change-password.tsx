import { message, Button, Modal, Form, Input } from 'antd'

import { MobXProviderContext } from 'mobx-react'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'antd/lib/form/Form'

interface State {
  modalVisible: boolean
  confirmDirty: boolean
  formFields: {
    currentPassword: string
    newPassword: string
    retypePassword: string
  }
}

export const ChangePassword = ()=>{
  const {userStore}= useContext(MobXProviderContext)
  const [state, setState] = useState({
    modalVisible: false,
    confirmDirty: false,
    formFields: {
      currentPassword: '',
      newPassword: '',
      retypePassword: ''
    }
  })
  const [form] = useForm()

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
        return { ...prevState, ...newState }
    })
}
useEffect(() => {
  if (!state.modalVisible) {
  form.resetFields()
  userStore!.resetChangePasswordErrors()
  }
}, [state.modalVisible])
  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFields().then(async (values) => {
      const data = {
        currentPassword: form.getFieldValue('currentPassword'),
        newPassword: form.getFieldValue('newPassword'),
        retypePassword: form.getFieldValue('retypePassword')
      }
      const success = await userStore!.changePassword(data)

      if (success) {
        hideModal()
        message.success('Changed password successfully.')
      }
    })
  }

  const showModal = () => {
    updateState({ modalVisible: true })
  }

  const hideModal = () => {
    updateState({ modalVisible: false })
  }

  const compareToFirstPassword = (_: any, value: string, callback: Function) => {
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('The two passwords need to match')
    } else {
      callback()
    }
  }

  const validateToNextPassword = (_: any, value: string, callback: Function) => {
    if (value && state.confirmDirty) {
      form.validateFields(['retypePassword']).then(()=>{
        callback()
      })
    }    
  }

  return (
    <>
      <Modal
        title="Change Password"
        visible={state.modalVisible}
        onOk={handleSubmit}
        onCancel={hideModal}
        closable={false}
        confirmLoading={userStore!.changingPassword}
      >
        <Form form={form}>
          {userStore!.changePasswordError && (
            <Form.Item
              style={{ marginBottom: 8 }}
              validateStatus="error"
              help={userStore!.changePasswordError}
            >
              <div />
            </Form.Item>
          )}
          <Form.Item rules={[
                { required: true, message: 'Current password is required.' }
              ]}>
              <Input
                type="password"
                placeholder="Current Password"
                autoComplete="current-password"
                disabled={userStore!.changingPassword}
              />
          </Form.Item>
          <Form.Item rules={[
                {
                  required: true,
                  message: 'New password is required.'
                },
                {
                  validator: validateToNextPassword
                }
              ]}>
<Input
                type="password"
                placeholder="New Password"
                autoComplete="new-password"
                disabled={userStore!.changingPassword}
              />
          </Form.Item>
          <Form.Item rules={[
                {
                  required: true,
                  message: 'You must re-type the new password.'
                },
                {
                  validator: compareToFirstPassword
                }
              ]}>
<Input
                type="password"
                placeholder="Re-Type New Password"
                autoComplete="new-password"
                disabled={userStore!.changingPassword}
              />
          </Form.Item>
        </Form>
      </Modal>
      <Button onClick={showModal}>ChangePassword</Button>
    </>
  )
}