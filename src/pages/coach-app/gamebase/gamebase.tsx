import * as React from 'react'
import { Layout, Menu } from 'antd'
import {Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { MyGamebases } from './my-gamebases/my-gamebases'
import { PublicGamebases } from './public-gamebases/public-gamebases'
import { GamebaseViewer } from './gamebase-viewer/gamebase-viewer'
import { GameViewer } from './game-viewer/game-viewer'

const { Content } = Layout

export const Gamebase = ()=>{
  const location = useLocation()
  const navigate = useNavigate()
React.useEffect(()=>{
  document
  .querySelector('meta[name="viewport"]')!
  .setAttribute('content', 'width=device-width, initial-scale=1.0')

  return ()=>{
    document.querySelector('meta[name="viewport"]')!.setAttribute('content', '')
  }
}
)

const handleMenuClick = (link: string) => () => {
  navigate(location.pathname + link)
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
  <Content className="gamebase content">
    <Menu mode="horizontal" selectedKeys={[getSelectedItem()]}>
      <Menu.Item key="my" onClick={handleMenuClick('/my')}>
        My Gamebases
      </Menu.Item>
      <Menu.Item key="public" onClick={handleMenuClick('/public')}>
        Public Gamebases
      </Menu.Item>
    </Menu>
    <Routes>
      <Route
        path={location.pathname + '/my'}
        element={MyGamebases}
      />
      <Route
        path={location.pathname + '/my/:uuid'}
        element={GamebaseViewer}
      />
      <Route
        path={location.pathname + '/my/:gamebaseUuid/:uuid'}
        element={GameViewer}
      />
      <Route
        path={location.pathname + '/public'}
        element={PublicGamebases}
      />
      <Route
        path={location.pathname + '/public/:uuid'}
        element={GamebaseViewer}
      />
      <Route
        path={location.pathname+ '/public/:gamebaseUuid/:uuid'}
        element={GameViewer}
      />
    </Routes>
  </Content>
)
}