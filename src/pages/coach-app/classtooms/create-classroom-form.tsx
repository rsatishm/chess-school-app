import { Button, Col, Divider, Form, Image, InputNumber, Layout, Row, Select, Space, Switch } from "antd"
import Input from "antd/lib/input/Input"
import Title from "antd/lib/typography/Title";
import { useNavigate } from "react-router-dom";
import { Jitsi } from "../../../components/jitsi/Jitsi"
import liveLessons from '../../../images/Live-lessons.png'

const { Option, OptGroup } = Select;

export const CreateClassroom = () => {
    const navigate = useNavigate()
    const onFinish = () => {
        console.log("Start classroom")
        navigate("/app/classrooms/start") 
    }


    return <>
    <Layout className="student app page">
    <Layout.Content className="content">
        <Row>
            <Col>
                <Title level={4}>Create Classroom</Title>
            </Col>
        </Row>
        <Space>
            <Row justify="space-around" align="middle">
                <Col span={6} offset={6}>
                    <Form
                        name="create_classroom"
                        layout="vertical"
                        onFinish={onFinish}
                        initialValues={{
                        }}>

                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: "'name' is required" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="type"
                            label="Type"
                        >
                            <Select defaultValue={'jitsi'}>
                                <Option value="jitsi">Jitsi (New Video)</Option>
                                <Option value="onetoone">One to One</Option>
                                <Option value="onetomany">One to Many</Option>
                                <Option value="soom">Zoom</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="opentoall" label="Open to all">
                            <Switch />
                        </Form.Item>

                        <Form.Item
                            name="students_groups"
                            label="Students / Groups"
                            rules={[{ required: true, message: 'At least one student/group must be selected', type: 'array' }]}
                        >
                            <Select mode="multiple" placeholder="Students and Groups">
                                <OptGroup label="Students">
                                    <Option value="ram">Ram</Option>
                                    <Option value="arun">Arun</Option>
                                </OptGroup>
                                <OptGroup label="Groups">
                                    <Option value="group1">Group1</Option>
                                    <Option value="group2">Group2</Option>
                                </OptGroup>
                            </Select>
                        </Form.Item>

                        <Form.Item name="opentoall" label="Notify via mail">
                            <Switch />
                        </Form.Item>

                        <Form.Item name="opentoall" label="Scheduled">
                            <Switch />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Start
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col className="feature-content" span={8} offset={4}>
                    <img className="auto-center" src={liveLessons}/>
                 </Col>
            </Row></Space></Layout.Content></Layout></>
}