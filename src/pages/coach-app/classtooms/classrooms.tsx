import { Button, Card, Col, DatePicker, Descriptions, Layout, PageHeader, Row, Select, Space, Statistic } from "antd"
import { Header } from "antd/lib/layout/layout"
import moment from "moment"
import { Link } from "react-router-dom"
import './classrooms.less'

export const Classrooms = () => {

  const { RangePicker } = DatePicker;
  function onChange(dates: any, dateStrings: any) {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  }

  const dateFormatList = ['DD-MMM-YYYY', 'DD-MMM-YYYY'];

  function handleChange(value: any) {
    console.log(`selected ${value}`);
  }

  const { Option, OptGroup } = Select;
  const style: React.CSSProperties = { color: 'rgba(74, 85, 104, var(--text-opacity))' };


  return <Layout.Content className="content classrooms">
    <PageHeader
      className="site-page-header"
      title="Classrooms" extra={[
        <Button type="primary" block size="large">
          <Link to="/app/classrooms/create">
            Create
          </Link>
        </Button>
      ]}>
      <Row>
        <Col flex="auto">
          <Select defaultValue="all" style={{ width: 300 }} onChange={handleChange}>
            <OptGroup label="Filter By">
              <Option value="all">All</Option>
              <Option value="self">Self</Option>
              <Option value="coach">Coach</Option>
              <Option value="students">Students</Option>
            </OptGroup>
          </Select>
        </Col>
        <Col flex="none">
          <RangePicker
            bordered={true}
            ranges={{
              Today: [moment(), moment()],
              Yesterday: [moment().subtract(1, 'days'), moment()],
              '7D': [moment().subtract(7, 'days'), moment()],
              '1M': [moment().subtract(1, 'months'), moment()],
              '3M': [moment().subtract(3, 'months'), moment()],
              '6M': [moment().subtract(6, 'months'), moment()],
              '12M': [moment().subtract(12, 'months'), moment()],
              'This Year (Jan-Today)': [moment().startOf('year'), moment()],
            }}
            format={dateFormatList}
            onChange={onChange}
          />
        </Col>
      </Row>

      <Row gutter={64}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Classes" value={1} />
            <Descriptions>
              <Descriptions.Item label="Individual">1</Descriptions.Item>
              <Descriptions.Item label="Group">0</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Duration" value={'2h 0m'} />
            <Descriptions>
              <Descriptions.Item label="Individual">2h 0m</Descriptions.Item>
              <Descriptions.Item label="Group">0m 0m</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Active Students" value={1} />
            <Descriptions>
              <Descriptions.Item label="Individual">1</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </PageHeader>

  </Layout.Content>
}