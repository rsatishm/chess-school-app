import { MobXProviderContext, observer } from 'mobx-react'
import { Form, Button, Input } from 'antd'
import { AxiosResponse } from 'axios'

import './create-academy-form.less'
import { AcademyStore } from '../../../../stores/academy'
import { UserStore } from '../../../../stores/user'
import { useForm } from 'antd/lib/form/Form'
import { useContext } from 'react'
import { ExceptionOutlined, HomeOutlined, LoadingOutlined } from '@ant-design/icons'

const { TextArea } = Input

interface Props {
  academyStore?: AcademyStore
  userStore?: UserStore
}

interface State {
  confirmDirty: boolean
  formFields: {
    name: string
    shortname: string
  }
}

export const CreateAcademyForm = ()=>{
return (
<h1>CreateAcademy</h1>
)
}

const CreateAcademyForm1 = observer(()=>{
  const [form]= useForm();
  const {academyStore, userStore} = useContext(MobXProviderContext);
  const  handleSubmit = (e: any) => {
    form.validateFields().then((values) => {
      academyStore!.create(values);
    })
    return false;
  }

  console.log("In CreateAcademy, creating")
    if (academyStore!.creating) {
      return (
        /*
        <div className="loading-state">
          <LoadingOutlined spin={true} />
          <p className="exception-text">Loading</p>
        </div>*/
        <h1>creating</h1>
      )
    }

    console.log("In CreateAcademy, createError")
    if (academyStore!.createError) {
      return (
        /*<div className="error-state">
          <ExceptionOutlined/>
          <p className="exception-text">
            {academyStore!.createError}
          </p>
          <Button danger onClick={handleSubmit}>
            Retry
          </Button>
        </div>*/
        <h1>createError</h1>
      )
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
            "https://api-core.chesslang.com/api/v2/academy/shortname-exists",
            { shortName: (value || '').toLowerCase() },
            {
              headers: {
                'X-Authorization': `Bearer ${userStore!.accessToken}`
              }
            }
          )
          .then((response: AxiosResponse) => {
            if (response.data.exists) {
              callback('Shortname exists already')
            } else {
              callback()
            }
          })
          .catch(() => {
            callback()
          })
      } else {
        callback()
      }
    }
  
    console.log("In CreateAcademy")
    /*
    return (
      <Form className="create-academy-form">
        <div className="icon-container">
          <HomeOutlined />
          <h2>Create your virtual academy</h2>
        </div>
        <Form.Item name="name"
          rules={[{ required: true, message: 'Name is required' }]}>
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item name="shortName"
          rules= {[
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
    )*/
    return <h1>CreateAcademy</h1>
  
  })
