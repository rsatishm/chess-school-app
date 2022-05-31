import * as R from 'ramda'
import { Layout, Button, Modal } from 'antd'
import { Route, useNavigate, useLocation, Routes } from 'react-router-dom'
import { MobXProviderContext } from 'mobx-react'

import { Sidebar } from '../../components/sidebar/sidebar'

import { User } from '../user/user'
import { Assignment } from './assignment/assignment'
import { Blindbot } from './blindbot/blindbot'
import { Dashboard } from './dashboard/dashboard'
import { Practice } from './practice/practice'
import { Gamebox } from './gamebox/gamebox'
import { GameArea } from '../common-pages/gameArea/gameArea'
import { AnalysisBoard } from '../common-pages/analysis-board/analysis-board'
import { useContext, useEffect, useState } from 'react'
import { StudentTournaments } from './tournaments/tournaments'
import { ExceptionOutlined } from '@ant-design/icons'
import { TournamentView } from '../../components/tournaments/tournament-view'


interface State {
  hasError: boolean
  showProfileEditModal: boolean
  showPreferences: boolean
}

export const StudentApp = () => {
  const [state, setState] = useState<State>({
    hasError: false,
    showProfileEditModal: false,
    showPreferences: false
  })

  const location = useLocation()

  const handleReload = () => {
    window.location.reload()
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (state.showPreferences) {
    navigate('/app/preferences')
    }
  }, [state.showPreferences])

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  const { mixpanelStore, userStore, liveGameStore } = useContext(MobXProviderContext)

  useEffect(() => {
    userStore!.loadProfile()
      .then(() => {
        const firstname = R.trim(
          userStore!.profile.firstname.toLowerCase()
        )
        const lastname = R.trim(
          userStore!.profile.lastname.toLowerCase()
        )

        if (firstname === 'firstname' || lastname === 'lastname') {
          updateState({ showProfileEditModal: true })
        }
      })
      .catch(() => { })
  })

  const handleProfileRedirect = () => {
    updateState({
      showProfileEditModal: false,
      showPreferences: true
    })

  }

  const hideShowProfileEditModal = () => {
    updateState({
      showProfileEditModal: false
    })
  }

  const renderProfileModal = () => {
    return (
      <Modal
        title="Provide your name"
        visible={state.showProfileEditModal}
        onOk={handleProfileRedirect}
        onCancel={hideShowProfileEditModal}
        okText="Go To Preferences"
        closable={false}
        confirmLoading={userStore!.changingName}
      >
        Hello, please provide your firstname/lastname in the preferences page.
      </Modal>
    )
  }

  if (liveGameStore!.isTournamentModeOn) {
    // this.props.history.push('/app/game-area')
    console.log('------ TOURNAMENT GAME SET! Taking over UI')

    return <GameArea />
  }

  if (state.hasError) {
    return (
      <Layout className="student app page">
        <Layout.Content className="content" style={{ paddingLeft: 0 }}>
          <div className="inner">
            <div className="error-state container">
              <ExceptionOutlined />
              <p className="exception-text">
                An unexpected error was encountered.
              </p>
              <Button danger onClick={handleReload}>
                Reload Page
              </Button>
            </div>
          </div>
        </Layout.Content>
      </Layout>
    )
  }

  console.log("showProfileEditModal?" + state.showProfileEditModal)
  return (
    <Layout className="student app page">
      {renderProfileModal()}
      <Sidebar />

      <Routes>
        <Route
          path={'/assignment'}
          element={<Assignment/>}
        />
        <Route path={'/practice'} element={<Practice/>} />
        <Route
          path={'/blindbot'}
          element={<Blindbot/>}
        />
        <Route
          path={'/preferences'}
          element={<User/>}
        />
        <Route path={'/game-area'} element={<GameArea/>} />
        <Route path={'/sharebox'} element={<Gamebox/>} />
        <Route path={'/board'} element={<AnalysisBoard/>} />
        <Route
          path={'/tournaments/:uuid'}
          element={<TournamentView/>}
        />
        <Route
          path={'/tournaments'}
          element={<StudentTournaments/>}
        />
        <Route path="/*" element={<Dashboard/>} />
      </Routes>
    </Layout>
  )
}