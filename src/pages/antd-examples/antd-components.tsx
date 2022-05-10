import { Col, Layout, List, Row } from "antd"
import { Link, Route, Routes } from "react-router-dom"

interface Props {
main: string,
components: {component: React.ReactNode, feature: string}[]
}

export const AntdComponents: React.FC<Props> = props => {
  const Main = () => { return <>
    <List
      itemLayout="vertical"
      dataSource={props.components}
      renderItem={component => (
        <List.Item key={props.main+ component.feature}>
          <Link key={props.main+ component.feature +  'link'} to={'/app/antd/' + props.main + '/' + component.feature}>{component.feature.charAt(0).toUpperCase() + component.feature.slice(1)}</Link>
        </List.Item>)} />
        </>
  }
  return <Layout>
      <h1>Antd {props.main}</h1>
      <Routes>
        <Route path="/*" element={<Main/>}/>
        {props.components.map((component)=>{
          return <Route key={props.main+ component.feature + 'cmp'}
          path={'/'+ component.feature}
          element={component.component}
        />
        })}        
      </Routes>
    </Layout>
}