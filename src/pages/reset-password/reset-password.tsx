import * as React from 'react'
import { Layout, Form, Input, Button } from 'antd'
import { observer, inject, MobXProviderContext } from 'mobx-react'

import './reset-password.less'
import { ResetPasswordStore } from '../../stores/reset-password'
import { Footer } from '../footer'
import { Header } from '../header'
import { MixpanelStore } from '../../stores/mixpanel'
import axios from 'axios'
import { userStore } from './../../stores/user'
import { useForm } from 'antd/es/form/Form'
import { CheckCircleOutlined } from '@ant-design/icons'


interface ResetPasswordState {
  confirmDirty: boolean
  formFields: {
    email: string
  }
}

export const ResetPassword = observer(() => {
  const { resetPasswordStore, mixpanelStore } = React.useContext(MobXProviderContext)
  const [state, setState] = React.useState<ResetPasswordState>({
    confirmDirty: false,
    formFields: resetPasswordStore
  })
  const updateState = (newState: Partial<ResetPasswordState>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  const [form] = useForm()
  const backingFormRef = React.useRef<HTMLFormElement>(null)
  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFields().then((values: any) => {
      updateState(
        {
          formFields: { ...values }
        }
      )
    })
  }

  React.useEffect(() => {
    // send reset password request
    resetPassword()

    mixpanelStore!.getMixpanel() &&
      mixpanelStore!.getMixpanel()
        .track('resetPassword', { email: state.formFields.email })
  }, [state.formFields])

  const resetPassword = async () => {
    console.log('Sending reset password request')
    try {
      const response = await userStore.getApiCoreAxiosClient()!.post(
        `identity/account/generate-reset-password-link`,
        {
          email: state.formFields.email
        }
      )

      resetPasswordStore!.complete = true
      resetPasswordStore!.error = ''
    } catch (error: any) {
      console.log(error)
      resetPasswordStore.email = state.formFields.email
      if (error.response && error.response.status === 400) {
        resetPasswordStore.complete = false
        resetPasswordStore.error = 'Invalid email'
      } else {
        resetPasswordStore.complete = false
        resetPasswordStore.error =
          'Server error. Please try again later'
      }
    }
  }
  if (resetPasswordStore.complete) {
    return (
      <Layout className="reset-password page">
        <Layout className="header">
          <div className="wrapper">
            <div className="logo" />
          </div>
        </Layout>
        <Layout className="content">
          <div className="wrapper">
            <h2 className="title">Reset Password</h2>
            <div className="message-box">
              <CheckCircleOutlined className="check-icon"/>
              <h3>Check your inbox for further instructions</h3>
            </div>
          </div>
        </Layout>
        <Footer />
      </Layout>
    )
  }

  return (
    <Layout className="reset-password page">
      <Header />
      <Layout className="content">
        <div className="wrapper">
          <h2 className="title">Reset Password</h2>
          <form
            className="backing-form"
            ref={backingFormRef}
            action="/reset-password"
            method="POST"
          >
            <input
              name="email"
              type="hidden"
              value={state.formFields.email}
            />
          </form>
          <Form form={form} className="reset-password-form" onFinish={handleSubmit}>
            {resetPasswordStore.error && (
              <p className="error-message">
                {resetPasswordStore.error}
              </p>
            )}
            <Form.Item
              name='email'
              initialValue={resetPasswordStore.email}
              extra="Enter the email with which the account was created"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'A valid email address is required'
                }
              ]}>
              <Input
                placeholder="E-mail"
                autoComplete="email"
                size="large"
              />
            </Form.Item>
            <Form.Item className="submit-button-container">
              <Button size="large" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Layout>
      <Footer />
    </Layout>
  )
})