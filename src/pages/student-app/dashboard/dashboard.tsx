import * as React from 'react'
import { Layout, Tooltip, Badge, Modal } from 'antd'
import { UserStore, useUserStore } from '../../../stores/user'
import { inject, MobXProviderContext, observer } from 'mobx-react'

import './dashboard.less'
import { StudentAssignmentStore } from '../../../stores/student-assignment'
import { MixpanelStore } from '../../../stores/mixpanel'
import { getFormattedMessage } from '../../../utils/utils'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppstoreOutlined, EyeOutlined, FireOutlined, FlagOutlined, InboxOutlined, LoadingOutlined, LogoutOutlined, PlaySquareOutlined, SettingOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { useEffect } from 'react'

const { Content } = Layout

export const Dashboard = observer(()=>{
  const {userStore, studentAssignmentStore, mixpanelStore} = React.useContext(MobXProviderContext)
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(()=>{
    userStore!.loadProfile()

   /* (document.querySelector('.app-sidebar') as any)!.style!.display = 'none'

    document
      .querySelector('meta[name="viewport"]')!
      .setAttribute('content', 'width=device-width, initial-scale=1.0')

      return ()=>{
        (document.querySelector('.app-sidebar') as any)!.style!.display = 'block'

    document.querySelector('meta[name="viewport"]')!.setAttribute('content', '')
      }*/
  }, [userStore])

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
  console.log("unsolved: " + studentAssignmentStore!.unsolvedCount)
  return (
    <Content className="content student dashboard">
      <div className="welcome-message">
        {'Welcome'}{' '}
        {profile.firstname}!
      </div>
      <div className="student-apps">
        <Tooltip
          title='Solve exercises and improve'>
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
              {'Assignment'}
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
          title={'Collaboration with shared databases'}
        >
          <div className="app" onClick={handleClick('/app/sharebox')}>
            <InboxOutlined />
            <span className="nav-text">
              {'Sharebox'}
            </span>
          </div>
        </Tooltip>
        <Tooltip title="Boost your inner chess fire with unlimited practise">
          <div className="app" onClick={handleClick('/app/practice')}>
            <FireOutlined/>
            <span className="nav-text">
              {'Practice'}
            </span>
          </div>
        </Tooltip>
        <Tooltip
          overlayClassName="big-tooltip"
          title={'Improve your visualization skills by playing blindfold'}
        >
          <div className="app" onClick={handleClick('/app/blindbot')}>
            <EyeOutlined />
            <span className="nav-text">
              {'Blindbot'}
            </span>
          </div>
        </Tooltip>
        <Tooltip
          overlayClassName="big-tooltip"
          title={'Play games with members of your academy'}
        >
          <div className="app" onClick={handleClick('/app/game-area')}>
            <PlaySquareOutlined />
            <span className="nav-text">
              {'Game Area'}
            </span>
          </div>
        </Tooltip>

        <Tooltip
          title={'Tournaments'}
        >
          <div className="app" onClick={handleClick('/app/tournaments')}>
            <UsergroupAddOutlined />
            <span className="nav-text">
              {'Tournaments'}
            </span>
          </div>
        </Tooltip>

        <Tooltip
          overlayClassName="big-tooltip"
          title={'Enhance your experience by listing out your preferences'}
        >
          <div className="app" onClick={handleClick('/app/preferences')}>
            <SettingOutlined/>
            <span className="nav-text">
              {'Settings'}
            </span>
          </div>
        </Tooltip>
        <Tooltip
          title={'End the login session'}
        >
          <div className="app" onClick={confirmLogout}>
            <LogoutOutlined />
            <span className="nav-text">
              {'Logout'}
            </span>
          </div>
        </Tooltip>
      </div>
    </Content>
  )
})
