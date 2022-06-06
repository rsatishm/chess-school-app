import * as React from 'react'
import { Layout, Menu } from 'antd'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { PublicProblembases } from './public-problembases/public-problembases'
import { ProblembaseView } from './problembase-view/problembase-view'
import { MyProblembases } from './my-problembases/my-problembases'

const { Content } = Layout

export const Problembase = ()=>{
  const navigate = useNavigate()
  const location = useLocation()
  React.useEffect(()=>{
    document
    .querySelector('meta[name="viewport"]')!
    .setAttribute('content', 'width=device-width, initial-scale=1.0')
    return ()=>document.querySelector('meta[name="viewport"]')!.setAttribute('content', '')
  })
  const handleMenuClick = (link: string) => () => {
    navigate(link)
  }

  const getSelectedItem = () => {
    if (location.pathname.indexOf('/my') >= 0) {
      return 'my'
    }

    if (location.pathname.indexOf('/public') >= 0) {
      return 'public'
    }

    return ''
  }

  return (
    <Content className="problembase content">
      <Menu mode="horizontal" selectedKeys={[getSelectedItem()]}>
        <Menu.Item key="my" onClick={handleMenuClick('my')}>
          My Problembases
        </Menu.Item>
        <Menu.Item key="public" onClick={handleMenuClick('public')}>
          Public Problembases
        </Menu.Item>
      </Menu>
      <Routes>
        <Route
          path={'my'}
          element={<MyProblembases/>}
        />
        <Route
          path={'my/:uuid'}
          element={<ProblembaseView/>}
        />
        <Route
          path={'public'}
          element={<PublicProblembases/>}
        />
        <Route
          path={'public/:uuid'}
          element={<ProblembaseView/>}
        />
      </Routes>
    </Content>
  )
}