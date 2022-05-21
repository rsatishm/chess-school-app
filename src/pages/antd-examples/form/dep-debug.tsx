import { Form, Input } from 'antd';

let acc = 0;

export const AntdFormDepDebug = () => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      name="debug"
      initialValues={{
        debug1: 'debug1',
        debug2: 'debug2',
      }}
    >
      <Form.Item noStyle dependencies={['debug1']}>
        {
          () => acc++
          // return <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>;
        }
      </Form.Item>
      <Form.Item label="debug1" name="debug1">
        <Input />
      </Form.Item>
      <Form.Item label="debug2" name="debug2">
        <Input />
      </Form.Item>
    </Form>
  );
};