import { PageHeader } from "antd"

export const AntdPageHeaderBasic = ()=>{
return <PageHeader
    className="site-page-header"
    onBack={() => window.history.back()}
    title="Title"
    subTitle="This is a subtitle"
  />}