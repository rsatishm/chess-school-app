import { Layout, Menu } from 'antd'
import { observer } from 'mobx-react'
import { Route, useNavigate, useLocation, Routes, useParams, Link } from 'react-router-dom'

import './gamebox.less'

import { MyDatabases } from './my-databases/my-databases'
import { SharedWithMe } from './shared-with-me/shared-with-me'

const { Content } = Layout

export const Gamebox = observer(() => {
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
        <Menu.Item key="my">
          <nav>
            <Link to="my">My Databases</Link>
          </nav>
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
          element={<MyDatabases />}
        />
        <Route
          path={'shared-with-me'}
          element={<SharedWithMe />}
        />
      </Routes>
    </Content>
  )
})