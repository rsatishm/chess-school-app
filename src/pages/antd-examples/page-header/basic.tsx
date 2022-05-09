import { PageHeader } from "antd"
import './basic.css'

export const AntdPageHeaderBasic = ()=>{
return <PageHeader
    className="site-page-header"
    onBack={() => window.history.back()}
    title="Title"
    subTitle="This is a subtitle"
  />}