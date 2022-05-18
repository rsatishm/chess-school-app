import { Col, Layout, List, Row } from "antd"
import { Link, Route, Routes } from "react-router-dom"

export const AntdExamples = ()=>{
    const data = [
        {
          to: '/app/antd/pageheader',
          title: 'Page Header'
        },
        {
            to: '/app/antd/afflix',
            title: 'Afflix'
          },
          {
            to: '/app/antd/alert',
            title: 'Alert'
          },
          {
            to: '/app/antd/anchor',
            title: 'Anchor'
          },
          {
            to: '/app/antd/autoComplete',
            title: 'AutoComplete'
          },
          {
            to: '/app/antd/avatar',
            title: 'Avatar'
          },
          {
            to: '/app/antd/backtop',
            title: 'BackTop'
          },
          {
            to: '/app/antd/badge',
            title: 'Badge'
          },
          {
            to: '/app/antd/breadcrumb',
            title: 'Breadcrumb'
          },
          {
            to: '/app/antd/button',
            title: 'Button'
          },
          {
            to: '/app/antd/calendar',
            title: 'Calendar'
          },
          {
            to: '/app/antd/upload',
            title: 'Upload'
          },
          {
            to: '/app/antd/tree',
            title: 'Tree'
          }
      ];
    return <>
    <Layout>
<h1>Antd Examples</h1>
    <List
    itemLayout="vertical"
    dataSource={data}
    renderItem={item => (
      <List.Item>
          <Link to={item.to}>{item.title}</Link>
    </List.Item>)}/>
    </Layout>
    </>
}