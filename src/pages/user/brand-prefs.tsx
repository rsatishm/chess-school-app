import * as React from 'react'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import { PreferencesStore } from '../../stores/preferences'
import { useContext, useState } from 'react'
import { useForm } from 'antd/lib/form/Form'
import { LoadingOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'


interface State {
  formFields: {
    color: string
  }
}

export const BrandPrefsComp = observer(()=>{
  const {preferencesStore} = useContext(MobXProviderContext)
  const [form] = useForm()
  const [state, setState] = useState<State>({
    formFields: {
      color: ''
    }
  })
  
  const handleBrandColorPrimary = (color: string) => () => {
   preferencesStore!.save({
      ...preferencesStore!.preferences,
      'com.chesslang.brandColorPrimary': color
    })
  }
  
  const getStyle = (color: string) => {
    let base = 'h-8 rounded-full w-8 mx-2 my-2 inline'
    if (preferencesStore!.primaryColorRaw == color) {
      return base + ' border-solid border-teal-200 border-4 h-10 w-10 mt-1'
    } else {
      return base
    }
  }

  const isHexColor = (hex: string) => {
    if (hex[0] == '#') {
      hex = hex.slice(1)
    }
    console.log(hex)
    return hex.length === 6 && !isNaN(Number('0x' + hex))
  }

  const processHex = (hex: string) => {
    if (hex[0] != '#') {
      return '#' + hex
    } else {
      return hex
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFields().then(async (values) => {
      if (isHexColor(values.color)) {
        preferencesStore!.save({
          ...preferencesStore!.preferences,
          'com.chesslang.brandColorPrimary': processHex(values.color)
        })
      }
    })
  }

    if (
      preferencesStore!.loading &&
      !preferencesStore!.hasData
    ) {
      return (
        <div>
          <h2>Brand Preference</h2>
          <LoadingOutlined spin={true} />
        </div>
      )
    }

    return (
      <div className="mt-4">
        <h2 className="my-2 text-base">Brand Preference</h2>
        <div className="w-full flex mt-1">
          <div className="w-1/4">
            <p className="">Current Primary (Preview)</p>
          </div>
          <div className="w-1/3">
            <p className="">Light Primary</p>
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-1/4">
            <div
              className="h-12 w-full"
              style={{
                backgroundColor: preferencesStore!.primaryColorRaw
              }}
            />
          </div>
          <div className="w-1/3">
            <div
              className="h-12 w-full"
              style={{
                backgroundColor: preferencesStore!.primaryLightColor
              }}
            />
          </div>
        </div>
        <p className="mt-3 w-full">Choose a different color:</p>
        <div className="w-full flex mt-1">
          {PreferencesStore.BRAND_COLOR_CHOICES.map(color => {
            return (
              <div
                className={getStyle(color)}
                key={color}
                style={{ backgroundColor: color }}
                onClick={handleBrandColorPrimary(color)}
              />
            )
          })}
        </div>
        <p className="mt-2 w-full">Or input a color in hex code</p>
        <div className="w-full flex mt-1">
          <Form form={form}>
            <Form.Item
            rules={[{ required: false, message: 'optional.' }]}
            initialValue={preferencesStore!.primaryColorRaw}
            >
              <Input type="text" placeholder="Color" />
            </Form.Item>
          </Form>
          <Button className="ml-2" type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    )
})