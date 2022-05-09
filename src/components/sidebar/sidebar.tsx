import { Layout, Menu, Badge, Modal } from 'antd'
import { MobXProviderContext } from 'mobx-react'

import './sidebar.less'
import { UserStore } from '../../stores/user'
import { AnnouncementStore } from '../../stores/announcements'
import Announcements from '../announcements/announcements'
import { StudentAssignmentStore } from '../../stores/student-assignment'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Icon, { AppstoreOutlined, BarChartOutlined, CustomerServiceOutlined, DashboardOutlined, DatabaseOutlined, DollarOutlined, EyeOutlined, FireOutlined, FlagOutlined, HomeOutlined, InboxOutlined, LogoutOutlined, PlaySquareOutlined, SettingFilled, TableOutlined, TeamOutlined, UsergroupAddOutlined } from '@ant-design/icons'

const { Sider } = Layout

interface SidebarProps {
  userStore?: UserStore
  studentAssignmentStore?: StudentAssignmentStore
  announcementStore?: AnnouncementStore
}

interface State {
  visible: boolean
}

export const Sidebar = ()=>{

  const {announcementStore, userStore, studentAssignmentStore} = useContext(MobXProviderContext)
  const [state, setState] = useState({
    visible: window.innerWidth > 576
  })
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(()=>{
    window.addEventListener('resize', () => {
      if (window.innerWidth > 576 && !state.visible) {
        setState({
          visible: true
        })
      } else if (window.innerWidth <= 576 && state.visible) {
        setState({
          visible: false
        })
      }
    })
  }, [state])

  const openAnnouncements = () => {
    announcementStore!.setVisible(true)
  }

  const toggle = () => {
    setState((prevState)=> {
      return {visible: !prevState.visible}
    })
  }

  const sidebarOffset = ()=> {
    return state.visible ? 80 : 0
  }

  const handleClick = (link: string) => (e: any) => {
    navigate(link)
  }

  const handleLogout = () => {
    setTimeout(() => {
      userStore!.logout()
      navigate('/login')
    }, 300)
  }

  const confirmLogout = () => {
    Modal.confirm({
      title: 'Are you sure you want to logout?',
      icon: <LogoutOutlined/>,
      okType: 'danger',
      onOk: () => handleLogout(),
      onCancel: () => {
        /* noop */
      }
    })
  }

  const getSelectedMenuItem = () => {
    if (location.pathname.startsWith('/app/academy')) {
      return 'academy'
    }

    if (location.pathname.startsWith('/app/assignment')) {
      return 'assignment'
    }

    if (location.pathname.startsWith('/app/gamebase')) {
      return 'gamebase'
    }

    if (location.pathname.startsWith('/app/problembase')) {
      return 'problembase'
    }

    if (location.pathname.startsWith('/app/preferences')) {
      return 'preferences'
    }

    if (location.pathname.startsWith('/app/user')) {
      return 'user'
    }

    if (location.pathname.startsWith('/app/payment')) {
      return 'payment'
    }

    if (location.pathname.startsWith('/app/practice')) {
      return 'practice'
    }

    if (location.pathname.startsWith('/app/blindbot')) {
      return 'blindbot'
    }

    if (location.pathname.startsWith('/app/sharebox')) {
      return 'sharebox'
    }
    if (location.pathname.startsWith('/app/reports')) {
      return 'reports'
    }

    if (location.pathname.startsWith('/app/game-area')) {
      return 'game-area'
    }

    if (location.pathname.startsWith('/app/board')) {
      return 'board'
    }

    if (location.pathname.startsWith('/app/tournaments')) {
      return 'tournaments'
    }

    return 'dashboard'
  }

  const renderForRoles = (allowedRoles: string[], component: any) => {
    return allowedRoles.indexOf(userStore!.role) >= 0
      ? component
      : null
  }

  const iconStyle = {
    marginTop: 8,
    fontSize: 26,
    marginLeft: -4
  }

  return (
    <div
      className="app-sidebar"
      style={{ width: sidebarOffset() ? sidebarOffset() + 4 : 0 }}
    >
      <Announcements />
      <Sider
        collapsedWidth={sidebarOffset()}
        collapsed={true}
        className="sidebar"
      >
        <Menu
          className="sidebar-menu no-scrollbar"
          theme="dark"
          selectedKeys={[getSelectedMenuItem()]}
        >
          <Menu.Item
            key="dashboard"
            onClick={handleClick('/app/dashboard')}
          >
          
          <DashboardOutlined style={iconStyle} />
            <span className="nav-text">Dashboard</span>
          </Menu.Item>
          {renderForRoles(
            ['coach'],
            <Menu.Item
              key="academy"
              onClick={handleClick('/app/academy')}
            >
              <HomeOutlined style={iconStyle} />
              <span className="nav-text">Academy</span>
            </Menu.Item>
          )}
          {renderForRoles(
            ['coach'],
            <Menu.Item
              key="classrooms"
              onClick={handleClick('/app/classrooms')}
            >
              <CustomerServiceOutlined style={iconStyle} />
              <span className="nav-text">Classrooms</span>
            </Menu.Item>
          )}
          {renderForRoles(
            ['coach', 'student'],
            <Menu.Item
              key="assignment"
              onClick={handleClick('/app/assignment')}
            >
              <FlagOutlined style={iconStyle} />
              <span className="nav-text">
                {`Assignment`}&nbsp;&nbsp;&nbsp;
              </span>
              {userStore!.role === 'student' && (
                <Badge
                  count={studentAssignmentStore!.unsolvedCount}
                  style={{
                    fontSize: 10,
                    marginLeft: -5
                  }}
                />
              )}
            </Menu.Item>
          )}
          {renderForRoles(
            ['coach', 'student'],
            <Menu.Item key="board" onClick={handleClick('/app/board')}>
              <AppstoreOutlined style={iconStyle} />
              <span className="nav-text">Board</span>
            </Menu.Item>
          )}

          {renderForRoles(
            ['coach'],
            <Menu.Item
              key="gamebase"
              onClick={handleClick('/app/gamebase')}
            >
              <DatabaseOutlined style={iconStyle} />
              <span className="nav-text">Gamebase</span>
            </Menu.Item>
          )}
          {renderForRoles(
            ['coach'],
            <Menu.Item
              key="problembase"
              onClick={handleClick('/app/problembase')}
            >
              <TableOutlined style={iconStyle} />
              <span className="nav-text">Problembase</span>
            </Menu.Item>
          )}
          {renderForRoles(
            ['admin'],
            <Menu.Item key="user" onClick={handleClick('/app/user')}>
              <TeamOutlined style={iconStyle} />
              <span className="nav-text">Users</span>
            </Menu.Item>
          )}
          {renderForRoles(
            ['admin'],
            <Menu.Item
              key="payment"
              onClick={handleClick('/app/payment')}
            >
              <DollarOutlined style={iconStyle} />
              <span className="nav-text">Payment</span>
            </Menu.Item>
          )}
          {renderForRoles(
            ['student', 'coach'],
            <Menu.Item
              key="practice"
              onClick={handleClick('/app/practice')}
            >
              <FireOutlined style={iconStyle} />
              <span className="nav-text">Practice</span>
            </Menu.Item>
          )}
          {renderForRoles(
            ['coach', 'student'],
            <Menu.Item
              key="blindbot"
              onClick={handleClick('/app/blindbot')}
            >
              <EyeOutlined style={iconStyle} />
              <span className="nav-text">Blindbot</span>
            </Menu.Item>
          )}
          {renderForRoles(
            ['coach', 'student'],
            <Menu.Item
              key="sharebox"
              onClick={handleClick('/app/sharebox')}
            >
              <InboxOutlined style={iconStyle} />
              <span className="nav-text">Sharebox</span>
            </Menu.Item>
          )}
          {renderForRoles(
            ['coach'],
            <Menu.Item
              key="reports"
              onClick={handleClick('/app/reports')}
            >
              <BarChartOutlined style={iconStyle} />
              <span className="nav-text">Reports</span>
            </Menu.Item>
          )}
          {renderForRoles(
            ['coach', 'student'],
            <Menu.Item
              key="game-area"
              onClick={handleClick('/app/game-area')}
            >
              <PlaySquareOutlined style={iconStyle} />
              <span className="nav-text">Game Area</span>
            </Menu.Item>
          )}
          {/* <Menu.Item key="notification" className="notification-item">
            <Icon type="bell" style={iconStyle} />
            <span className="nav-text">Notifications</span>
          </Menu.Item> */}
          {/* {this.renderForRoles(
            ['coach'],
            <Menu.Item
              key="announcement"
              className="announcement-item"
              onClick={this.openAnnouncements}
            >
              <Icon type="notification" theme="outlined" style={iconStyle} />
              <span className="nav-text">Announcements</span>
            </Menu.Item>
          )} */}
          {renderForRoles(
            ['coach', 'student'],
            <Menu.Item
              key="tournaments"
              onClick={handleClick('/app/tournaments')}
            >
              <UsergroupAddOutlined style={iconStyle} />
              <span className="nav-text">Tournaments</span>
            </Menu.Item>
          )}
          {renderForRoles(
            ['coach', 'student'],
            <Menu.Item
              key="preferences"
              className="preferences-item"
              onClick={handleClick('/app/preferences')}
            >
              <SettingFilled style={iconStyle} />
              <span className="nav-text">Preferences</span>
            </Menu.Item>
          )}
          <Menu.Item
            key="logout"
            className="logout-item"
            onClick={confirmLogout}
          >
            <LogoutOutlined style={iconStyle} />
            <span className="nav-text">Logout</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Icon
        type={state.visible ? 'menu-fold' : 'menu-unfold'}
        className="hamburger"
        style={{ marginLeft: sidebarOffset() }}
        onClick={toggle}
      />
    </div>
  )
}