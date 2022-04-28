import React, { Component, forwardRef, Ref, useImperativeHandle } from 'react'
import {
  Modal,
  Form,
  AutoComplete,
  Input,
  Tooltip,
  Row,
  Col,
  Radio,
  DatePicker,
  InputNumber,
  Select,
  Button
} from 'antd'
import { FormInstance, useForm } from 'antd/lib/form/Form'
import  FormComponentProps from 'antd/lib/form/Form';

type formCmpProps = typeof FormComponentProps
interface Props {
  visible: boolean
  recentEvents: string[]
  onCancel?: () => void
  onCreate?: () => void
  onBack?: () => void
}
interface State {}

export const SaveGameForm = forwardRef((props: Props, ref: Ref<FormInstance<any>>)=>{
  const { visible, onCancel, onCreate } = props
  const [form] = useForm()
  const formRef = React.createRef<FormInstance<any>>()
  useImperativeHandle(ref, () => (formRef.current!))
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 }
  }
  return (
    <Modal
      visible={visible}
      title={
        <div>
          <Row justify="center" align="middle">
            <Col span={8}>
              <Button
                icon="arrow-left"
                size="small"
                onClick={props.onBack}
              ></Button>
            </Col>
            <Col style={{ textAlign: 'center' }} span={8}>
              Save Game
            </Col>
            <Col span={8}></Col>
          </Row>
        </div>
      }
      okText="Save"
      onCancel={onCancel}
      onOk={onCreate}
    >
      <Form ref={formRef} form={form} layout="horizontal" {...formItemLayout}>
        <Form.Item name="event" label="Event" style={{ height: 'min-content' }}  rules={[
                                    {
                                        required: true
                                    }
                                ]}>
            <AutoComplete
              dataSource={props.recentEvents}
              filterOption={(inputValue, option) =>
                option!.props
                  .children!.toString()
                  .toUpperCase()
                  .indexOf(inputValue.toUpperCase()) !== -1
              }
            ></AutoComplete>
        </Form.Item>
        <Form.Item name="white" label="White" rules={ [
              {
                required: true
              }
            ]}>
          <Input />
        </Form.Item>
        <Form.Item label="Black" rules={ [
              {
                required: true
              }
            ]}>
          <Input />
        </Form.Item>
        <Form.Item name="white_elo" label="White ELO" rules={[]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Black ELO" rules={[]}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Result" rules={ [
              {
                required: true
              }
            ]}>
            <Select>
              <Select.Option value="1-0">White won ( 1-0 )</Select.Option>
              <Select.Option value="0-1">Black won ( 0-1 )</Select.Option>
              <Select.Option value="1/2-1/2">
                draw ( 1/2-1/2 )
              </Select.Option>
              <Select.Option value="*">other ( * )</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item name="round" label="Round" rules={ [
              {
                required: true
              }
            ]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={ [
              {
                required: true
              }
            ]}>
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  )
})
