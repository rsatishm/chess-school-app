import { MobXProviderContext, observer } from 'mobx-react'
import { Form, Button, Input } from 'antd'

import './create-academy-form.less'
import { useContext, useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { ExceptionOutlined, HomeOutlined, LoadingOutlined } from '@ant-design/icons'

const { TextArea } = Input

interface Props {
  onCreate: ()=>void
}

interface State {
  confirmDirty: boolean
  formFields: {
    name: string
    shortName: string
  }
}

export const CreateAcademyForm = observer(()=>{
  const {academyStore, userStore} = useContext(MobXProviderContext)
  const [state, setState] = useState<State>({
    confirmDirty: false,
    formFields: {
      name: '',
      shortName: ''
    }
  })
  const [form] = useForm()

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log("validate form fields")
    form.validateFields().then(async (values: any) => {
      console.log("Create academy for " + JSON.stringify(values))
      academyStore!.create(values)
    })
  }

  const validateShortname = (_: any, value: string, callback: Function) => {
    if (value && value.indexOf(' ') >= 0) {
      callback('Short name should not contain spaces')
      return
    }

    if (value) {
      userStore
        .getApiCoreAxiosClient()!
        .post(
          "academy/shortname-exists",
          { shortName: (value || '').toLowerCase() },
          {
            headers: {
              'X-Authorization': `Bearer ${userStore!.accessToken}`
            }
          }
        )
        .then((response: any) => {
          if (response.data.exists) {
            callback('Shortname exists already')
          } else {
            callback()
          }
        })
        .catch((e: any) => {
          callback()
        })
    } else {
      callback()
    }
  }

  if (academyStore!.creating) {
    return (
      <div className="loading-state">
        <LoadingOutlined spin={true} />
        <p className="exception-text">Loading</p>
      </div>
    )
  }

  if (academyStore!.createError) {
    return (
      <div className="error-state">
        <ExceptionOutlined/>
        <p className="exception-text">
          {academyStore!.createError}
        </p>
        <Button danger onClick={handleSubmit}>
          Retry
        </Button>
      </div>
    )
  }

  return (
    <Form form={form} className="create-academy-form">
      <div className="icon-container">
        <HomeOutlined/>
        <h2>Create your virtual academy</h2>
      </div>
      <Form.Item name="name" rules= {[{ required: true, message: 'Name is required' }]}>
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item name="shortName" rules={ [
            {
              required: true,
              message: 'Short name is required, no spaces'
            },
            {
              whitespace: false,
              message: 'Spaces not allowed'
            },
            {
              validator: validateShortname
            }
          ]}>
        <Input placeholder="Short Name" />
      </Form.Item>
      <div className="button-container">
        <Button type="primary" onClick={handleSubmit}>
          Create
        </Button>
      </div>
    </Form>
  )
})