import * as R from 'ramda'
import { message, Modal, Form, Input } from 'antd'
import { MobXProviderContext } from 'mobx-react'

import { useContext, useEffect, useState } from 'react'
import { useForm } from 'antd/lib/form/Form'
import { EditOutlined } from '@ant-design/icons'


interface State {
  modalVisible: boolean
  confirmDirty: boolean
  formFields: {
    firstname: string
    lastname: string
  }
}

export const ChangeName = () => {
  const { userStore } = useContext(MobXProviderContext)
  const [form] = useForm()
  const [state, setState] = useState<State>({
    modalVisible: false,
    confirmDirty: false,
    formFields: {
      firstname: userStore!.profile.firstname,
      lastname: userStore!.profile.lastname
    }
  })

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }

  useEffect(() => {
    userStore!.loadProfile()
      .then(() => {
        const firstname = R.trim(
          userStore!.profile.firstname.toLowerCase()
        )
        const lastname = R.trim(
          userStore!.profile.lastname.toLowerCase()
        )
        if (firstname === 'firstname' || lastname === 'lastname') {
          updateState({ modalVisible: true })
        }
      })
      .catch(() => { })
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFields().then(async (values: any) => {
      const data = {
        firstname: form.getFieldValue('firstname'),
        lastname: form.getFieldValue('lastname')
      }
      const success = await userStore!.changeName(data)

      if (success) {
        hideModal()
        message.success('Changes Saved successfully.')
      }
    })
  }

  const showModal = () => {
    updateState({ modalVisible: true })
  }

  const hideModal = () => {
    updateState({ modalVisible: false })
    useEffect(() => {
      if (!state.modalVisible) {
        form.resetFields()
        userStore!.resetChangeNameErrors()
      }
    }, [state.modalVisible])
  }

  return (
    <>
      <Modal
        title="Change Name"
        visible={state.modalVisible}
        onOk={handleSubmit}
        onCancel={hideModal}
        closable={false}
        confirmLoading={userStore!.changingName}
      >
        <Form initialValues={{
          firstname: userStore!.profile.firstname,
          lastname: userStore!.profile.lastname
        }}>
          {userStore!.changeNameError && (
            <Form.Item
              style={{ marginBottom: 8 }}
              validateStatus="error"
              help={userStore!.changeNameError}
            >
              <div />
            </Form.Item>
          )}
          <Form.Item rules={[{ required: true, message: 'First Name is required.' }]}>
            <Input
              type="text"
              placeholder="First Name"
              autoComplete="first-name"
              disabled={userStore!.changingName}
            />
          </Form.Item>
          <Form.Item rules={[{ required: true, message: 'Last Name is required.' }]}>
            <Input
              type="text"
              placeholder="Last Name"
              autoComplete="last-name"
              disabled={userStore!.changingName}
            />
          </Form.Item>
        </Form>
      </Modal>
      <EditOutlined
        style={{ cursor: 'pointer' }}
        type="edit"
        onClick={showModal}
      />
    </>
  )
}