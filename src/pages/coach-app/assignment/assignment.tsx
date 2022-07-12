import { Layout, Menu } from 'antd'
import { Route, useNavigate, useLocation, Routes } from 'react-router'

import { Exercise } from './exercise/exercise'
import { Assigned } from './assigned/assigned'

const { Content } = Layout

export const Assignment = ()=>{
  const navigate = useNavigate()
  const location = useLocation()
  const handleMenuClick = (link: string) => () => {
    navigate(link)
  }

  const getSelectedItem = () => {
    if (location.pathname.indexOf('/exercise') >= 0) {
      return 'exercise'
    }

    if (location.pathname.indexOf('/assigned') >= 0) {
      return 'assigned'
    }

    return ''
  }
  return (
    <Content className="assignment content">
      <Menu mode="horizontal" selectedKeys={[getSelectedItem()]}>
        <Menu.Item key="exercise" onClick={handleMenuClick('exercise')}>
          Exercise
        </Menu.Item>
        <Menu.Item key="assigned" onClick={handleMenuClick('assigned')}>
          Assigned
        </Menu.Item>
      </Menu>
      <Routes>
        <Route
          path='/exercise'
          element={<Exercise/>}
        />
        <Route
          path='/assigned'
          element={<Assigned/>}
        />
        <Route
          path="/*"
          element={<Exercise />}
        />
      </Routes>
    </Content>
  )
}
