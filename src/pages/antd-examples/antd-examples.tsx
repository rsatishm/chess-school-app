import { Col, Layout, List, Row } from "antd"
import { Link, Route, Routes } from "react-router-dom"
import { AntdPageHeaderActions } from "./page-header/actions";
import { AntdPageHeaderBasic } from "./page-header/basic";
import { AntdPageHeader } from "./page-header/page-header";

export const AntdExamples = ()=>{
    const data = [
        {
          to: '/app/antd/pageheader',
          title: 'Page Header'
        },
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