import * as React from 'react'
import { Layout, Button } from 'antd'
import Icon from '@ant-design/icons';
import { BrowserRouter, Route, Routes, useLocation, useMatch, useNavigate } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { UserStore } from '../../stores/user'
import { Dashboard } from '../dashboard/dashboard';

interface Props {
  userStore?: UserStore
}

interface State {
  hasError: boolean
}

export const CoachApp = observer(() => {
  const [state, setState] = React.useState({
    hasError: false
  });
  const handleReload = () => {
    window.location.reload()
  }

  if (state.hasError) {
    return (
      <Layout className="coach app page">
        <Layout.Content className="content" style={{ paddingLeft: 0 }}>
          <div className="inner">
            <div className="error-state container">
              <Icon type="exception" />
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

  function Academy() {
    return <h1>Academy</h1>
  }

  function Assignment() {
    return <h1>Assignment</h1>
  }

  function Practice() {
    return <h1>Practice</h1>
  }

  function User() {
    return <h1>User</h1>
  }

  function AnalysisBoard() {
    return <h1>AnalysisBoard</h1>
  }

  function Blindbot() {
    return <h1>Blindbot</h1>
  }

  function Gamebase() {
    return <h1>Gamebase</h1>
  }

  function Gamebox() {
    return <h1>Gamebox</h1>
  }

  function Problembase() {
    return <h1>Problembase</h1>
  }

  function Analytics() {
    return <h1>Analytics</h1>
  }

  function GameArea() {
    return <h1>GameArea</h1>
  }

  function CreateTournamentForm() {
    return <h1>CreateTournamentForm</h1>
  }

  function TournamentViewWithRouter() {
    return <h1>TournamentViewWithRouter</h1>
  }

  function TournamentListingWithRouter() {
    return <h1>TournamentListingWithRouter</h1>
  }

  console.log("In coachApp " + useLocation().pathname)
  return (
    <Layout className="coach app page">
      <Routes>
        <Route path="/academy" element={<Academy/>} />
        <Route path="/assignment" element={<Assignment/>} />
        <Route path="/practice" element={<Practice/>} />
        <Route
          path="/preferences"
          element={<User/>}
        />
        <Route path="/board" element={<AnalysisBoard/>} />

        <Route
          path="/blindbot"
          element={Blindbot}
        />

        <Route path="/gamebase" element={<Gamebase/>} />
        <Route path="/sharebox" element={<Gamebox/>} />
        <Route path="/problembase" element={<Problembase/>} />
        <Route path="/reports" element={<Analytics/>} />
        <Route path="/game-area" element={<GameArea/>} />

        <Route
          path="/tournaments/create"
          element={<CreateTournamentForm/>}
        />
        <Route
          path="/tournaments/:uuid/edit"
          element={<CreateTournamentForm/>}
        />
        <Route
          path="/tournaments/:uuid"
          element={<TournamentViewWithRouter/>}
        />
        <Route
          path="/tournaments"
          element={<TournamentListingWithRouter/>}
        />
        <Route
          path="/"
          element={<Dashboard />}
        />
      </Routes>
    </Layout>
  )
});