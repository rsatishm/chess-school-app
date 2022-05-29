import * as React from 'react'
import * as R from 'ramda'
import { Form, Input, Checkbox, Button, Alert } from 'antd'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import './integration.less'
import { States } from '../../../../components/states/states'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { LockFilled } from '@ant-design/icons'


interface State {
  useSubdomain: boolean
  confirmDirty: boolean
  formFields: {
    rootdomain: string
    subdomain: string
  }
}

export const Integration = () => {
  const { academyStore, studentsGroupsStore } = React.useContext(MobXProviderContext)
  const [state, setState] = useState<State>({
    useSubdomain: (academyStore!.academy.subdomain || '').length > 0,
    confirmDirty: false,
    formFields: {
      rootdomain: academyStore!.academy.rootdomain,
      subdomain: academyStore!.academy.subdomain
    }
  })
  const [form] = useForm()
  React.useEffect(() => {
    studentsGroupsStore!.load()
  })
  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFields().then(async (values: any) => {
      let data = {
        ...values
      }
      academyStore!.edit(
        academyStore!.academy.uuid,
        data
      )
    })
  }

  const handleRetry = () => {
    academyStore!.load()
    studentsGroupsStore!.load()
  }

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }

  const handleUseSubdomainToggle = () => {
    updateState({
      useSubdomain: !state.useSubdomain
    })
  }

  if (
    academyStore!.loading ||
    studentsGroupsStore!.loading
  ) {
    return (
      <div className="integration inner">
        <States type="loading" />
      </div>
    )
  }

  if (
    academyStore!.error ||
    studentsGroupsStore!.error
  ) {
    return (
      <div className="integration inner">
        <States
          type="error"
          exceptionText={
            academyStore!.error || academyStore!.error
          }
          onClick={handleRetry}
        />
      </div>
    )
  }

  if (R.keys(studentsGroupsStore!.students).length <= 1) {
    return (
      <div className="integration inner">
        <div className="locked-message">
          <LockFilled type="lock" />
          <h3>Enable this feature by subscribing</h3>
          <h3>
            to one of our paids plans in the{' '}
            <Link to="/app/academy/payment">payment</Link> page.
          </h3>
        </div>
      </div>
    )
  }

  if (academyStore!.editing) {
    return (
      <div className="integration inner">
        <States type="loading" />
      </div>
    )
  }

  if (academyStore!.editError) {
    return (
      <div className="integration inner">
        <States
          type="error"
          exceptionText={academyStore!.editError}
          onClick={handleSubmit}
        />
      </div>
    )
  }

  const rootdomain =
    form.getFieldValue('rootdomain') ||
    academyStore!.academy.rootdomain ||
    ''
  const subdomain =
    form.getFieldValue('subdomain') ||
    academyStore!.academy.subdomain ||
    ''

  return (
    <div className="integration inner">
      <div className="container">
        <div className="status">
          {academyStore!.academy.integrationStatus ===
            'AWAITING-DOMAIN' && (
              <Alert
                message="Integration Status: Awaiting Domain Settings"
                type="warning"
              />
            )}
          {academyStore!.academy.integrationStatus === 'DONE' && (
            <Alert message="Integration Status: Done" type="success" />
          )}
        </div>
        <Form form={form} initialValues={{
          subdomain: academyStore!.academy.subdomain
        }}>
          <h3>Setup to access Chesslang from your custom domain</h3>
          <Form.Item extra="Example: mychessacademy.com (without www)"
            rules={[{ required: true, message: 'Root domain is required' }]}>
            <Input placeholder="Your root domain" />
          </Form.Item>
          <Form.Item className="subdomain-checkbox">
            <Checkbox
              checked={state.useSubdomain}
              onChange={handleUseSubdomainToggle}
            >
              I want to use subdomain like{' '}
              <span className="subdomain">coaching</span>.myacademy.com
            </Checkbox>
          </Form.Item>
          <Form.Item extra="Example: coaching">
            <Input
              disabled={!state.useSubdomain}
              placeholder="Subdomain"
            />
          </Form.Item>
        </Form>
        {rootdomain && (
          <div className="domain-settings">
            <h3>Domain Control Settings</h3>
            <span className="instructions">
              create the following <span className="bold">CNAME records</span>{' '}
              in your domain control
            </span>
            <table>
              <thead>
                <tr>
                  <th>Point</th>
                  <th>To</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {state.useSubdomain && subdomain
                      ? `${subdomain}.${rootdomain}`
                      : `${rootdomain}`}
                  </td>
                  <td>app.chesslang.com</td>
                </tr>
                <tr>
                  <td>
                    _acme-challenge.
                    {state.useSubdomain && subdomain
                      ? `${subdomain}.${rootdomain}`
                      : `${rootdomain}`}
                  </td>
                  <td>
                    {state.useSubdomain && subdomain
                      ? `${subdomain}.${rootdomain}.app.chesslang.com`
                      : `${rootdomain}.app.chesslang.com`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={!rootdomain}
        >
          Request
        </Button>
      </div>
    </div>
  )
}