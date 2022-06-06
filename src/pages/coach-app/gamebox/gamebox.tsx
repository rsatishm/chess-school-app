import * as React from 'react'
import { Layout, Menu } from 'antd'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import './gamebox.less'

import { MyDatabases } from './my-databases/my-databases'
import { SharedWithMe } from './shared-with-me/shared-with-me'

const { Content } = Layout

export const Gamebox = ()=>{
  const navigate = useNavigate()
  const location = useLocation()

  const handleMenuClick = (link: string) => () => {
    navigate(link)
  }

  const getSelectedItem = () => {
    if (location.pathname.indexOf('/my') >= 0) {
      return 'my'
    }

    if (location.pathname.indexOf('/shared-with-me') >= 0) {
      return 'shared-with-me'
    }

    return ''
  }
  return (
    <Content className="gamebox content">
      <Menu mode="horizontal" selectedKeys={[getSelectedItem()]}>
        <Menu.Item key="my" onClick={handleMenuClick('my')}>
          My Databases
        </Menu.Item>
        <Menu.Item
          key="shared-with-me"
          onClick={handleMenuClick('shared-with-me')}
        >
          Shared With Me
        </Menu.Item>
      </Menu>
      <Routes>
        <Route
          path={'my'}
          element={MyDatabases}
        />
        <Route
          path={'shared-with-me'}
          element={SharedWithMe}
        />
      </Routes>
    </Content>
  )
}
