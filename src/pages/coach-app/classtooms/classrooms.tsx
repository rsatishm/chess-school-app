import { Button, Col, Descriptions, Layout, PageHeader, Row, Statistic } from "antd"
import { Header } from "antd/lib/layout/layout"
import { Link } from "react-router-dom"
import './classrooms.less'

export const Classrooms = () => {
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
      </PageHeader>

  </Layout.Content>
}