import * as React from 'react'
import { Layout, Tooltip, Badge, Modal } from 'antd'
import { UserStore } from '../../../stores/user'
import { inject, MobXProviderContext, observer } from 'mobx-react'

import './dashboard.less'
import { StudentAssignmentStore } from '../../../stores/student-assignment'
import { MixpanelStore } from '../../../stores/mixpanel'
import { getFormattedMessage } from '../../../utils/utils'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppstoreOutlined, EyeOutlined, FireOutlined, FlagOutlined, InboxOutlined, LoadingOutlined, LogoutOutlined, PlaySquareOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons'

const { Content } = Layout

export const Dashboard = ()=>{
  const {userStore, studentAssignmentStore, mixpanelStore} = React.useContext(MobXProviderContext)
  const navigate = useNavigate()
  const location = useLocation()
  React.useEffect(()=>{
    userStore!.loadProfile()

    (document.querySelector('.app-sidebar') as any)!.style!.display = 'none'

    document
      .querySelector('meta[name="viewport"]')!
      .setAttribute('content', 'width=device-width, initial-scale=1.0')

      return ()=>{
        (document.querySelector('.app-sidebar') as any)!.style!.display = 'block'

    document.querySelector('meta[name="viewport"]')!.setAttribute('content', '')
      }
  })

  const handleClick = (link: string) => (e: any) => {
    navigate(link)
  }

  const handleLogout = () => {
    mixpanelStore!.getMixpanel() &&
      mixpanelStore!.getMixpanel()
        .track('logout', { pathname: location.pathname })
    setTimeout(() => {
      userStore!.logout()
      navigate('/login')
    }, 300)
  }

  const confirmLogout = () => {
    Modal.confirm({
      title: getFormattedMessage(
        'studentapp.dashboard.confirm_logout',
        'Are you sure you want to logout?'
      ),
      icon: <LogoutOutlined/>,
      okType: 'danger',
      onOk: () => handleLogout(),
      onCancel: () => {
        /* noop */
      }
    })
  }

  if (userStore!.profileLoading) {
    return (
      <div className="profile section">
        <LoadingOutlined spin={true} />
      </div>
    )
  }
  const profile = userStore!.profile!
  return (
    <Content className="content student dashboard">
      <div className="welcome-message">
        {getFormattedMessage('studentapp.dashboard.welcome', 'Welcome')}{' '}
        {profile.firstname}!
      </div>
      <div className="student-apps">
        <Tooltip
          title={getFormattedMessage(
            'studentapp.dashboard.assignment.description',
            'Solve exercises and improve'
          )}
        >
          <div className="app" onClick={handleClick('/app/assignment')}>
            <span>
              <FlagOutlined />{' '}
              {userStore!.role === 'student' && (
                <Badge
                  count={studentAssignmentStore!.unsolvedCount}
                  style={{
                    fontSize: 10,
                    marginTop: -40,
                    marginLeft: -15
                  }}
                />
              )}
            </span>
            <span className="nav-text">
              {getFormattedMessage(
                'studentapp.dashboard.assignment.title',
                'Assignment'
              )}
            </span>
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
          title={getFormattedMessage(
            'studentapp.dashboard.sharebox.description',
            'Collaboration with shared databases'
          )}
        >
          <div className="app" onClick={handleClick('/app/sharebox')}>
            <InboxOutlined />
            <span className="nav-text">
              {getFormattedMessage(
                'studentapp.dashboard.sharebox.title',
                'Sharebox'
              )}
            </span>
          </div>
        </Tooltip>
        <Tooltip title="Boost your inner chess fire with unlimited practise">
          <div className="app" onClick={handleClick('/app/practice')}>
            <FireOutlined/>
            <span className="nav-text">
              {getFormattedMessage(
                'studentapp.dashboard.practice.title',
                'Practice'
              )}
            </span>
          </div>
        </Tooltip>
        <Tooltip
          overlayClassName="big-tooltip"
          title={getFormattedMessage(
            'studentapp.dashboard.blindbot.description',
            'Improve your visualization skills by playing blindfold'
          )}
        >
          <div className="app" onClick={handleClick('/app/blindbot')}>
            <EyeOutlined />
            <span className="nav-text">
              {getFormattedMessage(
                'studentapp.dashboard.blindbot.title',
                'Blindbot'
              )}
            </span>
          </div>
        </Tooltip>
        <Tooltip
          overlayClassName="big-tooltip"
          title={getFormattedMessage(
            'studentapp.dashboard.game_area.description',
            'Play games with members of your academy'
          )}
        >
          <div className="app" onClick={handleClick('/app/game-area')}>
            <PlaySquareOutlined />
            <span className="nav-text">
              {getFormattedMessage(
                'studentapp.dashboard.game_area.title',
                'Game Area'
              )}
            </span>
          </div>
        </Tooltip>

        <Tooltip
          title={getFormattedMessage(
            'studentapp.dashboard.tournaments.description',
            'Tournaments'
          )}
        >
          <div className="app" onClick={handleClick('/app/tournaments')}>
            <UsergroupAddOutlined />
            <span className="nav-text">
              {getFormattedMessage(
                'studentapp.dashboard.tournaments.title',
                'Tournaments'
              )}
            </span>
          </div>
        </Tooltip>

        <Tooltip
          overlayClassName="big-tooltip"
          title={getFormattedMessage(
            'studentapp.dashboard.settings.description',
            'Enhance your experience by listing out your preferences'
          )}
        >
          <div className="app" onClick={handleClick('/app/preferences')}>
            <SettingOutlined/>
            <span className="nav-text">
              {getFormattedMessage(
                'studentapp.dashboard.settings.title',
                'Settings'
              )}
            </span>
          </div>
        </Tooltip>
        <Tooltip
          title={getFormattedMessage(
            'studentapp.dashboard.logout.description',
            'End the login session'
          )}
        >
          <div className="app" onClick={confirmLogout}>
            <LogoutOutlined />
            <span className="nav-text">
              {getFormattedMessage(
                'studentapp.dashboard.logout.title',
                'Logout'
              )}
            </span>
          </div>
        </Tooltip>
      </div>
    </Content>
  )
}
