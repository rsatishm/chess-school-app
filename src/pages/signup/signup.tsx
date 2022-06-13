import * as React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Form, Input, Button, Radio, DatePicker } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react'

import './signup.less'
import { SignupStore, useSignupStore } from '../../stores/signup'

interface SignupState {
  confirmDirty: boolean
  formFields: SignupStore
}

export const Signup = observer(() => {
	const [form] = Form.useForm();
  const signupStore : SignupStore = useSignupStore();
  const [state, setState] = React.useState<SignupState>({
    confirmDirty: false,
    formFields: signupStore
  });

  const signup = () => {
    console.log('Sending sign up request')
    try {
      signupStore!.complete = true
      signupStore!.error = ''
    } catch (error) {
      console.log(error)
      signupStore.complete = false
      signupStore.error = 'Server error. Please try again later'
    }
  }

  const handleSubmit = () => {
    //e.preventDefault();
    form.validateFields().then((values: any) => {
      setState((prevState)=>{
        return {
          ...prevState,
          formFields: { ...state.formFields, ...values }
        }}
      );
      signupStore!.signup(values)
    })
    return false;
  }

  const backingFormRef = React.createRef<HTMLFormElement>()

  if (signupStore.complete) {
    return (
      <Layout className="page signup">
        <Layout.Header />
        <Layout className="content">
          <div className="wrapper">
            <h1 className="title">Sign Up</h1>
            <div className="message-box">
              <CheckCircleOutlined className='check-icon'/>
              <h3>Congrats!</h3>
              <h3>Check your inbox for further instructions</h3>
            </div>
          </div>
        </Layout>
      </Layout>
    )
  }

  const validateUsername = (_: any, value: string, callback: Function) => {
    if (value && value.indexOf(' ') !== -1) {
      callback('Username should not contain spaces')
      return
    }
    callback()
  }

  const validateEmail = (_: any, value: string, callback: Function) => {
    if (value && value.indexOf('@') === -1) {
      callback()
      return
    }
    callback()
  }

  const compareToFirstPassword = (_: any, value: string, callback: Function) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('The two passwords need to match')
    } else {
      callback()
    }
  }

  const validateToNextPassword = (_: any, value: string, callback: Function) => {
    if (value && state.confirmDirty) {
      //form.validateFields(['retypePassword'], { force: true }, () => null)
    }
    callback()
  }

  const handleConfirmBlur = (e: any) => {
    const value = e.target.value
    setState((prevState)=> {
      return {...prevState, confirmDirty: state.confirmDirty || !!value }})
  }

  return (
    <Layout className="page signup">
      <Layout.Header />
      <Layout className="content">
        <div className="wrapper">
          <h2 className="title">Sign Up</h2>
          <p className="message">
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <p className="muted-message">All fields are required.</p>
          <Form form={form} className="signup-form" onFinish={handleSubmit}>
            <Form.Item name="username" rules={[
                  {
                    required: true,
                    message: 'Username is required, no spaces',
                    whitespace: false
                  },
                  {
                    validator: validateUsername
                  }
                ]}
                initialValue={signupStore.username}>
            
                <Input
                  size="large"
                  placeholder="Username"
                  autoComplete="username"
                />
              
            </Form.Item>
            <Form.Item name="email" 
            initialValue={signupStore.email}
                rules={ [
                  {
                    required: true,
                    type: 'email',
                    message: 'A valid email address is required'
                  },
                  {
                    validator: validateEmail
                  }
                ]}>
              <Input
                  size="large"
                  placeholder="E-Mail"
                  type="email"
                  autoComplete="email"
                />
            </Form.Item>
            <Form.Item name="phoneNumber"
            initialValue={signupStore.phone}
            rules={[
              {
                required: false,
                message: 'Phone number is required, no spaces',
                whitespace: false
              }
            ]}>
                <Input
                  size="large"
                  placeholder="Phone Number"
                  autoComplete="Phone Number"
                />
            </Form.Item>
            <Form.Item 
            name="password"
            initialValue= {signupStore.password}
            rules={ [
              {
                required: true,
                message: 'Password is required'
              },
              {
                validator: validateToNextPassword
              }
            ]}>
                <Input
                  size="large"
                  placeholder="Password"
                  type="password"
                  autoComplete="new-password"
                />
            </Form.Item>
            <Form.Item 
            initialValue= {signupStore.retypePassword}
            rules={[
              {
                required: true,
                message: 'Password confirmation is required'
              },
              {
                validator: compareToFirstPassword
              }
            ]}>
                <Input
                  size="large"
                  placeholder="Re-Type Password"
                  type="password"
                  autoComplete="new-password"
                  onBlur={handleConfirmBlur}
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
    </Layout>)

});
