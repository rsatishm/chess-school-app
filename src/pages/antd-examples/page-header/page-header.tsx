import { Col, Layout, List, Row } from "antd"
import { Link, Route, Routes } from "react-router-dom"
import { AntdPageHeaderActions } from "./actions";
import { AntdPageHeaderBasic } from "./basic";
import { AntPageHeaderdBreadcrumb } from "./breadcrumb";
import { AntdPageHeaderContent } from "./content";
import { AntdPageHeaderGhost } from "./ghost";
import { AntdPageHeaderResponsive } from "./responsive";

export const AntdPageHeader = () => {
  const PageHeader = () => { return <>
    <List
      itemLayout="vertical"
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Link to={item.to}>{item.title}</Link>
        </List.Item>)} />
        </>
  }
  const data = [
    {
      to: '/app/antd/pageheader/actions',
      title: 'Actions'
    },
    {
      to: '/app/antd/pageheader/basic',
      title: 'Basic'
    },
    {
      to: '/app/antd/pageheader/breadcrumb',
      title: 'Breadcrumb'
    },
    {
      to: '/app/antd/pageheader/content',
      title: 'Content'
    },
    {
      to: '/app/antd/pageheader/ghost',
      title: 'Ghost'
    },
    {
      to: '/app/antd/pageheader/responsive',
      title: 'Responsive'
    }
  ];
  console.log("Page Header")
  return <Layout>
      <h1>Antd PageHeader</h1>
      <Routes>
        <Route path="/*" element={<PageHeader/>}/>
        <Route
          path="/actions"
          element={<AntdPageHeaderActions />}
        />
        <Route
          path="/basic"
          element={<AntdPageHeaderBasic />}
        />
        <Route
          path="/breadcrumb"
          element={<AntPageHeaderdBreadcrumb />}
        /> 
        <Route
          path="/content"
          element={<AntdPageHeaderContent />}
        />
       <Route
          path="/ghost"
          element={<AntdPageHeaderGhost />}
        />    
        <Route
          path="/responsive"
          element={<AntdPageHeaderResponsive />}
        />     
      </Routes>
    </Layout>
}