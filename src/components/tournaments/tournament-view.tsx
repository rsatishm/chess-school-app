import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Layout,
  Tabs,
  Col,
  Row,
  Button,
  Popconfirm,
  Badge,
  Modal,
  Tooltip
} from 'antd'

import './tournament-view.less'
import { MobXProviderContext } from 'mobx-react'
import { LiveGamePreview } from './live-game-preview'
import { Rankings } from './rankings'
import { Pairings } from './pairings'
import { Players } from './players'
import { Details } from './details'

const { TabPane } = Tabs

interface State {
  stage?: any,
  activeTab?: string
  unreadMessageCount?: number
  stageLoading?: boolean
  showInvitationModal?: boolean
  showInstructionModal?: boolean
}

export const TournamentView = () => {
  const { tournamentViewStore, tournamentChatStore, liveGamePreviewStore } = useContext(MobXProviderContext)
  const [state, setState] = useState<State>({
    stage: null,
    activeTab: 'players',
    unreadMessageCount: 0,
    stageLoading: false,
    showInvitationModal: true,
    showInstructionModal: true
  })
  const navigate = useNavigate()
  const { uuid } = useParams();
  const updateState = (newState: State) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }

  let unsubFirestoreListener: any

  const init = (id: string) => {
    if (unsubFirestoreListener != null) {
      unsubFirestoreListener()
      unsubFirestoreListener = null
    }

    tournamentViewStore!.loadTournament(id)
    tournamentChatStore!.load(id)

    unsubFirestoreListener = ()=>{}
    
    /*Firebase.firestore()
      .collection('tournaments')
      .doc(id)
      .onSnapshot(async (snap: any) => {
        if (snap.data() != null) {
          let stage: any = snap.data()

          tournamentViewStore!.setDataAsStale()
          // FIXME: this will overload the server when all the clients hit at the same time
          // call the visible tab data to refresh

          if (
            state.stage != null &&
            state.stage.round_status != stage.round_status
          ) {
            tournamentViewStore!.refresh()
          }

          // FOR BACKWARD COMPATIBILITY
          // TODO : REMOVE
          stage =
            typeof stage.player_status == 'undefined'
              ? { ...stage, player_status: 'FINALIZED' }
              : stage

          updateState({
            stage,
            stageLoading: false
          })
        } else {
          updateState({
            stage: null,
            stageLoading: false
          })
        }
      })*/
  }

  useEffect(() => {

    init(uuid!)

    tournamentChatStore!.onNewMessage(
      (_: any, ownMessage: boolean) => {
        if (ownMessage || state.activeTab == 'chat') {
          return
        }
        updateState({
          unreadMessageCount: state.unreadMessageCount! + 1
        })
      }
    )

    document
      .querySelector('meta[name="viewport"]')!
      .setAttribute('content', 'width=device-width, initial-scale=1.0')

      return ()=>{
        if (unsubFirestoreListener != null) {
          unsubFirestoreListener()
          unsubFirestoreListener = null
        }
    
        (document.querySelector('.app-sidebar')! as any).style!.display = 'block'
        document.querySelector('meta[name="viewport"]')!.setAttribute('content', '')
      }
  }
  )

  const handleTabChange = (tab: string) => {
    updateState({ activeTab: tab })

    liveGamePreviewStore!.setPoll(tab == 'live_games')

    switch (tab) {
      case 'chat':
        updateState({
          unreadMessageCount: 0
        })
        break
      case 'details':
      case 'players':
        tournamentViewStore!.loadDetails()
        break
      case 'pairings':
      case 'live_games':
        tournamentViewStore!.loadPairings()
        break
      case 'rankings':
        tournamentViewStore!.loadRankings()
        break
    }
  }

  const handleTournamentAction = () => {
    updateState({ stageLoading: true })
    tournamentViewStore!.updateStage()
  }

  const renderInstructionModal = () => {
    const stage: any = state.stage
    if (stage == null) {
      return null
    }

    if (stage.player_status == 'INVITED') {
      if (tournamentViewStore!.isTournamentOwner) {
        return (
          <Modal
            title="Instructions"
            visible={state.showInstructionModal}
            onOk={hideInstructionModal}
            cancelButtonProps={{ style: { display: 'none' } }}
            okText="Ok"
            onCancel={hideInstructionModal}
          >
            <ol>
              <li>
                First, click ‘Start Tournament’ to enable students to join the
                tournament. The students will be able to join the tournament
                ONLY after ‘Start Tournament’ is clicked.&nbsp;&nbsp;
              </li>
              <li>
                After the students have joined, click ‘Finalize Players’ to
                start the tournament with the players who have joined. At this
                point, those students who were invited, but didn’t join will not
                be a part of the tournament.&nbsp;&nbsp;
              </li>
              <li>Proceed to ‘Publish Pairings’ and 'Start Round'&nbsp;</li>
              <li>
                'Pairings and Results'-Replay to replay the game(s) from its
                latest board position, with specific time-control'&nbsp;
              </li>
            </ol>
          </Modal>
        )
      } else if (
        tournamentViewStore!.isStudentInvited &&
        stage.tournament_status === 'UPCOMING'
      ) {
        return (
          <Modal
            title="Instructions"
            visible={state.showInstructionModal}
            onOk={hideInstructionModal}
            cancelButtonProps={{ style: { display: 'none' } }}
            okText="Ok"
            onCancel={hideInstructionModal}
          >
            <div className="instruction">
              <p>
                You will be able to join this tournament only when the coach
                starts the tournament.
              </p>
              <p>
                You will be notified (by a pop-up) once the tournament starts,
                stay tuned!
              </p>
            </div>
          </Modal>
        )
      }
    }
  }

  const hideInstructionModal = () => {
    updateState({
      showInstructionModal: false
    })
  }

  const renderInvitationModal = () => {
    const stage: any = state.stage
    if (stage == null) {
      return null
    }

    if (
      !tournamentViewStore!.hasPlayerJoined &&
      stage.player_status == 'INVITED' &&
      stage.tournament_status === 'CURRENT'
    ) {
      return (
        <Modal
          visible={state.showInvitationModal}
          onOk={() => tournamentViewStore!.joinTournament()}
          onCancel={hideInvitationModal}
          okText="Join"
        >
          You have been invited to join the tournamnet.
        </Modal>
      )
    }
  }

  const hideInvitationModal = () => {
    updateState({
      showInvitationModal: false
    })
  }

  const renderActionButton = () => {
    let message = ''
    const stage: any = state.stage
    if (stage == null) {
      return null
    }

    if (stage.tournament_status === 'UPCOMING') {
      message = 'Start tournament'
    } else if (
      stage.tournament_status === 'CURRENT' &&
      stage.player_status === 'INVITED'
    ) {
      message = `Finalize Players`
    } else if (
      stage.tournament_status === 'CURRENT' &&
      stage.player_status === 'FINALIZED'
    ) {
      if (stage.round_status == 'INITIAL') {
        message = `Publish Round ${stage.round} pairings`
      } else if (stage.round_status == 'PAIRED') {
        message = `Start Round ${stage.round}`
      } else if (stage.round_status == 'IN_PROGRESS') {
        // FIXME: Only for testing. Remove later
        message = `Complete Round ${stage.round}`
      }
    }

    if (tournamentViewStore!.isTournamentOwner) {
      return (
        <Popconfirm
          title="Are you sure?"
          onConfirm={handleTournamentAction}
          okText="Yes"
          cancelText="No"
          placement="bottom"
        >
          <Button type="primary" loading={state.stageLoading}>
            {message}
          </Button>
        </Popconfirm>
      )
    } else if (tournamentViewStore!.isStudentInvited) {
      let disableButton = false

      let tooltipMessage = ''
      if (stage.tournament_status === 'UPCOMING') {
        tooltipMessage = 'Tournament has not started yet'
        disableButton = true
      } else if (stage.player_status === 'FINALIZED') {
        tooltipMessage = 'Tournament has already started'
        disableButton = true
      }

      if (tournamentViewStore!.hasPlayerJoined) {
        return (
          <Tooltip title={tooltipMessage}>
            <Button
              type="primary"
              disabled={disableButton}
              onClick={() => tournamentViewStore!.exitTournament()}
            >
              Exit
            </Button>
          </Tooltip>
        )
      } else {
        return (
          <Tooltip title={tooltipMessage}>
            <Button
              type="primary"
              disabled={disableButton}
              onClick={() => tournamentViewStore!.joinTournament()}
            >
              Join
            </Button>
          </Tooltip>
        )
      }
    }
  }

  /*
  const renderEditButton = () => {
    const stage: any = state.stage
    if (stage == null) {
      return null
    }
    if (tournamentViewStore!.isTournamentOwner) {
      return (
        <Button
          style={{ marginRight: 4 }}
          color="default"
          disabled={stage.player_status === 'FINALIZED'}
          onClick={() =>
            navigate(location.pathname + '/edit')
          }
        >
          Edit
        </Button>
      )
    }
  }*/

  const renderLiveGamePreviewTab = () => {
    return (
      <TabPane tab="Live games" key="live_games">
        <LiveGamePreview
          tournamentId={tournamentViewStore!.tournament.uuid}
          round={tournamentViewStore!.latestRound}
        />
      </TabPane>
    )
  }

      // TODO: Fix the chat tab position. Currently only works if it's a last tab.
      return (
        <Layout.Content className="content tournament-view">
          {tournamentViewStore!.isStudentInvited &&
            renderInvitationModal()}
          {renderInstructionModal()}
          <div className="inner">
            <Row justify="space-between">
              <Col flex={1}>
                <h1>{tournamentViewStore!.tournament.name}</h1>
              </Col>
              <Col flex={1}>
                {renderActionButton()}
                <Button
                  style={{ marginLeft: 4 }}
                  color="default"
                  onClick={tournamentViewStore!.refresh}
                >
                  Refresh
                </Button>
              </Col>
            </Row>
            <Tabs
              defaultActiveKey={state.activeTab}
              onChange={handleTabChange}
              type="card"
            >
              <TabPane tab="Details" key="details">
                <Details />
              </TabPane>
              <TabPane tab="Players" key="players">
                <Players />
              </TabPane>
              <TabPane tab="Pairings and Results" key="pairings">
                <Pairings />
              </TabPane>
              <TabPane tab="Rankings" key="rankings">
                <Rankings />
              </TabPane>
              {renderLiveGamePreviewTab()}
              <TabPane
                tab={
                  <>
                    <span>Chat</span>
  
                    {state.unreadMessageCount! > 0 &&
                      state.activeTab != 'chat' && (
                        <>
                          {' '}
                          <Badge count={state.unreadMessageCount} />
                        </>
                      )}
                  </>
                }
                key="chat"
              >
              </TabPane>
            </Tabs>
          </div>
        </Layout.Content>
      )
}