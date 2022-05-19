import { Layout, Button, PageHeader } from 'antd'
import { ExceptionOutlined } from '@ant-design/icons';
import { Route, Routes } from 'react-router-dom'
import { observer } from 'mobx-react'
import { UserStore } from '../../stores/user'
import { Dashboard } from '../dashboard/dashboard';
import { Academy } from './academy/academy';
import { Sidebar } from '../../components/sidebar/sidebar';
import { useState } from 'react';
import { Chessboard } from '../../components/chessboard/Chessboard';
import { AnalysisBoard } from '../common-pages/analysis-board/analysis-board';
import { ChessboardDemo } from '../../components/chessgroundboard/ChessboardDemo';
import { Classrooms } from './classtooms/classrooms';
import { CreateClassRoom } from './classtooms/create-classroom-form';

interface Props {
  userStore?: UserStore
}

interface State {
  hasError: boolean
}

export const CoachApp = observer(() => {
  const [state] = useState({
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
              <ExceptionOutlined/>
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

  function Assignment() {
    return <h1>Assignment</h1>
  }

  function Practice() {
    return <h1>Practice</h1>
  }

  function User() {
    return <h1>User</h1>
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
    //const fen = new Chess().fen()
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    return <><table><tr><td><Chessboard width={300} height={300} fen={fen} interactionMode="NONE" /></td></tr>
    <tr><td><Chessboard width={300} height={300} fen={fen} interactionMode="MOVE" /></td></tr>
    <tr><td><Chessboard width={300} height={300} fen={fen} interactionMode="ARROW" /></td></tr>
    <tr><td><Chessboard width={300} height={300} fen={fen} interactionMode="SQUARE_HIGHLIGHT" /></td></tr></table></>
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

  function ChessboardExample()  {
    return <ChessboardDemo/>
  }

  console.log("In coachApp")
  return (
    <Layout className="coach app page">
      <Sidebar />
      <Routes>
        <Route path="/academy/*" element={<Academy/>} />
        <Route path="/assignment" element={<Assignment/>} />
        <Route path="/practice" element={<Practice/>} />
        <Route
          path="/preferences"
          element={<User/>}
        />
        <Route path="/board" element={<AnalysisBoard/>} />
        <Route path="/classrooms" element={<Classrooms/>} />
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
            path="/classrooms/create"
            element={<CreateClassRoom/>}
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
          path="/*"
          element={<Dashboard />}
        />
      </Routes>
    </Layout>
  )
});