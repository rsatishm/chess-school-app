import * as React from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { MobXProviderContext, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import './website.less'
import { States } from '../../../../components/states/states'
import { RichTextEditor } from '../../../../components/rich-text-editor/rich-text-editor'
import { useForm } from 'antd/es/form/Form'


interface State {
  confirmDirty: boolean
  aboutUs: string
  formFields: {
    name: string
    tagline: string
    facebookLink: string
    twitterLink: string
    linkedInLink: string
    youtubeLink: string
    homepageContent: string
    aboutUs: string
    addressAndContact: string
  }
}

export const Website = observer(()=>{
  const {academyStore} = React.useContext(MobXProviderContext)
  const [state, setState] = React.useState({
    confirmDirty: false,
    aboutUs: '',
    formFields: {
      name: academyStore!.academy.name,
      tagline: academyStore!.academy.tagline,
      facebookLink: academyStore!.academy.facebookLink,
      twitterLink: academyStore!.academy.twitterLink,
      youtubeLink: academyStore!.academy.youtubeLink,
      linkedInLink: academyStore!.academy.linkedInLink,
      homepageContent: academyStore!.academy.homepageContent,
      aboutUs: academyStore!.academy.aboutUs,
      addressAndContact: academyStore!.academy.addressAndContact
    }
  })
  React.useEffect(()=>{
    academyStore!.load()
  })
  const [form] = useForm()
  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFields().then(async (values: any) => {
      let data = {
        ...values
      }
      academyStore!.edit(
        academyStore!.academy.uuid, data
      )
    })
  }
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  const handleAboutUsChange = (htmlContent: string) => {
    updateState({ aboutUs: htmlContent })
  }

  if (academyStore!.loading) {
    return (
      <div className="integration inner">
        <States type="loading" />
      </div>
    )
  }

  if (academyStore!.error) {
    return (
      <div className="integration inner">
        <States
          type="error"
          exceptionText={academyStore!.error}
          onClick={academyStore!.load}
        />
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

  return (
    <div className="website inner">
      <div className="container">
        <div className="status">
          {!rootdomain && (
            <Alert
              message={
                <span>
                  Integration is mandatory for website. Go to{' '}
                  <Link to="/app/academy/integration">integration page.</Link>
                </span>
              }
              type="error"
            />
          )}
        </div>
        <Form initialValues={{
          name: academyStore!.academy.name,
          tagline: academyStore!.academy.tagline,
          facebookLink: academyStore!.academy.facebookLink,
          twitterLink: academyStore!.academy.twitterLink,
          linkedInLink: academyStore!.academy.linkedInLink,
          youtubeLink: academyStore!.academy.youtubeLink,
          homepageContent: academyStore!.academy.homepageContent,
          aboutUs: academyStore!.academy.aboutUs,
          addressAndContact: academyStore!.academy.addressAndContact
        }}>
          <h3>Items to display on the homepage</h3>
          <Form.Item rules={[
                { required: true, message: 'Academy name is required' }
              ]}>
            <Input placeholder="Academy Name" />                
          </Form.Item>
          <Form.Item>
            <Input placeholder="Tagline" />
          </Form.Item>
          <Form.Item>
          <Input placeholder="Facebook Link" />
          </Form.Item>
          <Form.Item>
          <Input placeholder="Twitter Link" />
          </Form.Item>
          <Form.Item>
          <Input placeholder="LinkedIn Link" />
          </Form.Item>
          <Form.Item>
          <Input placeholder="Youtube Link" />
          </Form.Item>
          <Form.Item>
          <RichTextEditor minHeight={125} />
          </Form.Item>
          <Form.Item label="About Us">
          <RichTextEditor minHeight={125} />
          </Form.Item>
          <Form.Item label="Address and Contact">
          <RichTextEditor minHeight={125} />
          </Form.Item>
        </Form>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  )
})