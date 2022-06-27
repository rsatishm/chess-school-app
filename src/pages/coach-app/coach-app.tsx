import { Layout, Button, PageHeader } from 'antd'
import { ExceptionOutlined } from '@ant-design/icons';
import { Route, Routes } from 'react-router-dom'
import { observer } from 'mobx-react'
import { UserStore } from '../../stores/user'
import { Dashboard } from './dashboard/dashboard';
import { Academy } from './academy/academy';
import { Sidebar } from '../../components/sidebar/sidebar';
import { useState } from 'react';
import { Chessboard } from '../../components/chessboard/Chessboard';
import { AnalysisBoard } from '../common-pages/analysis-board/analysis-board';
import { ChessboardDemo } from '../../components/chessgroundboard/ChessboardDemo';
import { Classrooms } from './classrooms/classrooms';
import { CreateClassroom } from './classrooms/create-classroom-form';
import { StartClassRoom } from './classrooms/start-classroom';
import { TournamentView } from '../../components/tournaments/tournament-view';
import { Assignment } from '../student-app/assignment/assignment';
import { Practice } from '../student-app/practice/practice';
import { User } from '../user/user';
import { Blindbot } from '../student-app/blindbot/blindbot';
import { Gamebox } from '../student-app/gamebox/gamebox';
import { Gamebase } from './gamebase/gamebase';
import { Problembase } from './problembase/problembase';
import { CreateTournamentForm } from './tournaments/create-tournament-form';
import { Analytics } from './analytics/analytics';
import { TournamentListing } from './tournaments/tournament-listing';
import { GameArea } from '../common-pages/gameArea/gameArea';
import { MyDatabase } from './problembase/my-problembases/my-database';

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

  function GameArea1() {
    //const fen = new Chess().fen()
    const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    return <><table><tr><td><Chessboard width={300} height={300} fen={fen} interactionMode="NONE" /></td></tr>
    <tr><td><Chessboard width={300} height={300} fen={fen} interactionMode="MOVE" /></td></tr>
    <tr><td><Chessboard width={300} height={300} fen={fen} interactionMode="ARROW" /></td></tr>
    <tr><td><Chessboard width={300} height={300} fen={fen} interactionMode="SQUARE_HIGHLIGHT" /></td></tr></table></>
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
        <Route path="/practice/*" element={<Practice/>} />
        <Route
          path="/preferences"
          element={<User/>}
        />
        <Route path="/board" element={<AnalysisBoard/>} />
        <Route path="/classrooms" element={<Classrooms/>} />
        <Route
          path="/blindbot"
          element={<Blindbot/>}
        />

        <Route path="/gamebase/*" element={<Gamebase/>} />
        <Route path="/sharebox/*" element={<Gamebox/>} />
        <Route path="/problembase/*" element={<Problembase/>} />
        <Route path="/reports" element={<Analytics/>} />
        <Route path="/game-area" element={<GameArea/>} />

        <Route
          path="/tournaments/create"
          element={<CreateTournamentForm/>}
        />
        <Route
            path="/classrooms/create"
            element={<CreateClassroom/>}
          />  
        <Route
            path="/classrooms/start"
            element={<StartClassRoom/>}
          />                      
        <Route
          path="/tournaments/:uuid/edit"
          element={<CreateTournamentForm/>}
        />
        <Route
          path="/tournaments/:uuid"
          element={<TournamentView/>}
        />
        <Route
          path="/tournaments"
          element={<TournamentListing/>}
        />
        <Route
          path="/database"
          element={<MyDatabase/>}
        />
        <Route
          path="/*"
          element={<Dashboard />}
        />
      </Routes>
    </Layout>
  )
});