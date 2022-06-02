import React, { useContext, useEffect, useState } from 'react'
import {
  Layout,
  Row,
  Col,
  Tabs,
  Button,
  Modal,
  Table,
  List,
  message
} from 'antd'

import './analysis-board.less'
import { observer, inject, MobXProviderContext } from 'mobx-react'
import { AnalysisBoardStore } from '../../../stores/analysis-board-store'
import SelectDatabaseModal from './select-database-modal'
import { GameboxDatabaseStore } from '../../../stores/gamebox-database'
import { SetupChessboard } from '../../../components/chessboard/setup-chessboard'
import * as queryString from 'query-string'
import KeyHandler, { KEYDOWN, KEYPRESS } from 'react-key-handler'
import { Scoresheet } from '../../../components/scoresheet/scoresheet'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ChessTypes } from '../../../types'
import { useForm } from 'antd/es/form/Form'
import ChessgroundBoard from '../../../components/chessgroundboard/Chessgroundboard'


const { TabPane } = Tabs

interface State {
  gameNotFound: boolean
  modalState?: string
  setupPositionModalVisible?: boolean
  setupPositionFen?: any
  selectedDatabase?: any
}

export const PublicAnalysisBoard = observer(() => {
  const { analysisBoardStore, gameboxDatabaseStore } = useContext(MobXProviderContext)
  const [state, setState] = useState<State>({
    gameNotFound: false
  })
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  const {gameUuid} = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  async function loadPublicGame() {
    let isGameFound = false
   // const params: any = queryString.parse(location.search)

    if (gameUuid != null) {
      isGameFound = await analysisBoardStore.loadPublicGame(
        gameUuid
      )
    }

    if (isGameFound == false) {
      updateState({
        gameNotFound: true
      })
    }
  }
  const [form] = useForm()
  useEffect(() => {
    loadPublicGame()

    document
      .querySelector('meta[name="viewport"]')!
      .setAttribute('content', 'width=device-width, initial-scale=1.0')

  })

  const onMove = (orig: any, dest: any, metadata: any) => {
    console.log('Move made', orig, dest, metadata)
    analysisBoardStore!.move({
      from: orig,
      to: dest
    })
    // this.setState({
    //   moves: this.state.moves + ' ' + to
    // })
  }

  const onGoToPath = () => { }

  const handleSaveToSharebox = () => {
    updateState({
      modalState: 'SELECT_DATABASE'
    })
  }

  const handleUndo = () => {
    analysisBoardStore!.undo()
  }

  const handleSetupPosition = () => {
    updateState({
      setupPositionModalVisible: true,
      setupPositionFen: analysisBoardStore!.fen
    })
  }

  const handleSetupPositionCancel = () => {
    updateState({
      setupPositionModalVisible: false,
      setupPositionFen: ''
    })
  }

  const handleSetupPositionOk = () => {
    analysisBoardStore!.loadFen(state.setupPositionFen)
    updateState({
      setupPositionModalVisible: false,
      setupPositionFen: ''
    })
  }

  const handleSetupPositionFenChange = (fen: ChessTypes.FEN) => {
    updateState({
      setupPositionFen: fen
    })
  }

  const handlePromoteVariation = (path: ChessTypes.PlyPath) => {
    analysisBoardStore!.promoteVariation(path)
  }

  const handleDeleteVariation = (path: ChessTypes.PlyPath) => {
    analysisBoardStore!.deleteVariation(path)
  }

  const handleAddComment = (path: ChessTypes.PlyPath, text: string) => {
    analysisBoardStore!.handleAddComment(path, text)
  }

  const handleDeleteComment = (path: ChessTypes.PlyPath) => {
    analysisBoardStore!.handleDeleteComment(path)
  }

  const handleNewGame = async () => {
    navigate(window.location.pathname) // remove gameUuid params
    await analysisBoardStore!.newGame()
  }

  const handleUpdateGame = async () => {
    const success = await analysisBoardStore!.updateGame()
    if (success) {
      message.success('Updated Game')
    } else {
      message.error('Failed to update game')
    }
  }

  const handleDuplicate = async () => {
    const success = await analysisBoardStore!.duplicateGame()
    if (success) {
      message.success('Duplicated Game')
    } else {
      message.error('Failed to duplicate game')
    }
  }

  const handleResetGame = async () => {
    await analysisBoardStore!.resetGame()
  }

  function renderContent() {
    return (
      <Row className="analysis-board scoresheet-container">
        <Col md={{ span: 12, offset: 2 }} sm={24}>
          <ChessgroundBoard
            height={600}
            width={600}
            orientation="white"
            fen={analysisBoardStore!.fen}
            turnColor={analysisBoardStore!.sideToPlay}
            onMove={onMove}
            movable={analysisBoardStore!.calcMovable()}
          />
        </Col>
        <Col
          className="analysis-board--tabs"
          md={{ span: 8, offset: 2 }}
          sm={24}
        >
          <Row justify="start" style={{ margin: '8px' }}>
            <h1>{analysisBoardStore.gameName}</h1>
          </Row>
          <Row className="buttons-container" justify="start">
            {analysisBoardStore!.savedGameDetails && (
              <Col className="operation-button" flex={1}>
                <Button onClick={handleResetGame} size="small">
                  Reset
                </Button>
              </Col>
            )}
          </Row>
          <Row>
            <Tabs type="card" defaultActiveKey="moves">
              <TabPane tab="Moves" key="moves">
                <Scoresheet
                  visible={true}
                  currentPath={analysisBoardStore!.state.currentPath}
                  mainline={analysisBoardStore!.state.mainline}
                  showHideMovesToggle={false}
                  areMovesHiddenForStudents={false}
                  onGoToPath={handleGoToPath}
                  onPromoteVariation={handlePromoteVariation}
                  onDeleteVariation={handleDeleteVariation}
                  onAddComment={handleAddComment}
                  onDeleteComment={handleDeleteComment}
                  onHideMovesChange={() => { }}
                />
              </TabPane>
            </Tabs>
          </Row>
        </Col>
      </Row>
    )
  }

  const handleGoToPath = (path: ChessTypes.PlyPath) => {
    analysisBoardStore!.gotoPath(path)
  }

  const handleCreate = () => {
    form.validateFields().then(async (values: any) => {
      // console.log('Received values of form: ', values)

      var gameUuid = await analysisBoardStore.saveGame(
        values,
        state.selectedDatabase.uuid
      )

      navigate(
        window.location.pathname + '?gameUuid=' + gameUuid
      )

      form.resetFields()
      updateState({ modalState: 'HIDDEN' })
    })
  }

  const handleCancel = () => {
    form.resetFields()
    updateState({
      selectedDatabase: { uuid: '', name: '' },
      modalState: 'HIDDEN'
    })
  }

  const handleBack = () => {
    form.resetFields()
    updateState({
      selectedDatabase: { uuid: '', name: '' },
      modalState: 'SELECT_DATABASE'
    })
  }

  const handleSelectDatabase = (database: any) => {
    updateState({
      selectedDatabase: database,
      modalState: 'INPUT_METADATA'
    })
  }

  const handleCreateDatabase = async (name: string) => {
    const database = await gameboxDatabaseStore!.createDatabase(name)
    updateState({
      selectedDatabase: database,
      modalState: 'INPUT_METADATA'
    })
  }

  const renderKeyBindings = () => {
    return (
      <>
        <KeyHandler
          keyEventName={KEYDOWN}
          keyValue="ArrowLeft"
          onKeyHandle={analysisBoardStore!.prev}
        />
        <KeyHandler
          keyEventName={KEYDOWN}
          keyValue="ArrowRight"
          onKeyHandle={analysisBoardStore!.next}
        />
      </>
    )
  }

  const renderErrorContent = () => {
    return (
      <div className={'errorOverlay'}>
        <h1>The game you are looking for does not exist</h1>
        <Button size="large" type="primary" href="https://chesslang.com">
          Chesslang.com
        </Button>
      </div>
    )
  }

  return (
    <Layout className="student app page">
      {renderKeyBindings()}
      <Layout.Content className="content">
        {state.gameNotFound
          ? renderErrorContent()
          : renderContent()}
      </Layout.Content>
    </Layout>
  )
})
