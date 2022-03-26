import { Layout, Tooltip, Modal } from 'antd'
import { AppstoreOutlined, BarChartOutlined, DatabaseOutlined, EyeOutlined, 
  FireOutlined, FlagOutlined, HomeOutlined, InboxOutlined, LoadingOutlined, 
  LogoutOutlined, PlaySquareOutlined, SettingOutlined, TableOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react'

import './dashboard.less'
import { UserStore, useUserStore } from '../../stores/user'
import { useEffect } from 'react'

const { Content } = Layout
interface Props {
  userStore?: UserStore
}

export const Dashboard = observer(() => {
  const userStore = useUserStore();
  const navigate = useNavigate();

  useEffect(()=>{

    userStore!.loadProfile();
/*
    (document.querySelector('.app-sidebar') as HTMLElement)!.style!.display = 'none'

    document
      .querySelector('meta[name="viewport"]')!
      .setAttribute('content', 'width=device-width, initial-scale=1.0')
      return ()=>{
        (document.querySelector('.app-sidebar') as HTMLElement)!.style!.display = 'block'

        document.querySelector('meta[name="viewport"]')!.setAttribute('content', '')
      }*/
  }, [userStore])

  if (userStore!.profileLoading) {
    return (
      <div className="profile section">
        <LoadingOutlined spin={true} />
      </div>
    )
  }

  const handleClick = (link: string) => (e: any) => {
    navigate(link)
  }

  const handleLogout = () => {
    setTimeout(() => {
      userStore!.logout()
      console.log("Logged out, now navigate to login")
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


  const profile = userStore!.profile!
  return (
    <Content className="content coach dashboard">
      <div className="welcome-message">
        {'Welcome coach'}{' '}
        {profile.firstname}!
      </div>
      <div className="coach-apps">
        <Tooltip
          overlayClassName="big-tooltip"
          title="Manage your students, integrate and publish a customized website"
        >
          <div className="app" onClick={handleClick('/app/academy')}>
            <HomeOutlined />
            <span className="nav-text">Academy</span>
          </div>
        </Tooltip>

        <Tooltip
          overlayClassName="big-tooltip"
          title="Assign homework and track progress down every single move of your students"
        >
          <div className="app" onClick={handleClick('/app/assignment')}>
            <FlagOutlined />
            <span className="nav-text">Assignment</span>
          </div>
        </Tooltip>

        <Tooltip overlayClassName="big-tooltip" title="Practice">
          <div className="app" onClick={handleClick('/app/practice')}>
            <FireOutlined />
            <span className="nav-text">Practice</span>
          </div>
        </Tooltip>

        <Tooltip
          overlayClassName="big-tooltip"
          title="Chess Board for analysis"
        >
          <div className="app" onClick={handleClick('/app/board')}>
            <AppstoreOutlined />
            <span className="nav-text">Board</span>
          </div>
        </Tooltip>

        <Tooltip
          overlayClassName="big-tooltip"
          title="Collaboration with shared databases"
        >
          <div className="app" onClick={handleClick('/app/sharebox')}>
            <InboxOutlined />
            <span className="nav-text">Sharebox</span>
          </div>
        </Tooltip>

        <Tooltip
          overlayClassName="big-tooltip"
          title="Select from a huge range of problems, hand picked for beginners to advanced"
        >
          <div className="app" onClick={handleClick('/app/problembase')}>
            <TableOutlined />
            <span className="nav-text">Problembase</span>
          </div>
        </Tooltip>

        <Tooltip
          overlayClassName="big-tooltip"
          title="Create and access games of your own or from our huge collection"
        >
          <div className="app" onClick={handleClick('/app/gamebase')}>
            <DatabaseOutlined />
            <span className="nav-text">Gamebase</span>
          </div>
        </Tooltip>

        <Tooltip
          overlayClassName="big-tooltip"
          title="Play games with members of your academy"
        >
          <div className="app" onClick={handleClick('/app/game-area')}>
            <PlaySquareOutlined />
            <span className="nav-text">Game Area</span>
          </div>
        </Tooltip>

        <Tooltip title="Improve your visualization skills by playing blindfold">
          <div className="app" onClick={handleClick('/app/blindbot')}>
            <EyeOutlined />
            <span className="nav-text">Blindbot</span>
          </div>
        </Tooltip>

        <Tooltip
          overlayClassName="big-tooltip"
          title="Student Reports"
        >
          <div className="app" onClick={handleClick('/app/reports')}>
            <BarChartOutlined />
            <span className="nav-text">Reports</span>
          </div>
        </Tooltip>

        <Tooltip
          overlayClassName="big-tooltip"
          title="Enhance your experience by listing out your preference"
        >
          <div className="app" onClick={handleClick('/app/preferences')}>
            <SettingOutlined />
            <span className="nav-text">Settings</span>
          </div>
        </Tooltip>

        <Tooltip
          title="Tournaments"
        >
          <div className="app" onClick={handleClick('/app/tournaments')}>
            <UsergroupAddOutlined />
            <span className="nav-text">Tournaments</span>
          </div>
        </Tooltip>

        <Tooltip
          title="End the login session"
        >
          <div className="app" onClick={confirmLogout}>
            <LogoutOutlined />
            <span className="nav-text">Logout</span>
          </div>
        </Tooltip>
      </div>
    </Content>
  )
})