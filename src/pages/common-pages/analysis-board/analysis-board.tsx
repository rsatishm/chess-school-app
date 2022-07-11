import React, { createRef, MutableRefObject, useContext, useEffect, useRef, useState } from 'react'
import {
  Layout,
  Row,
  Col,
  Tabs,
  Button,
  Modal,
  Table,
  List,
  message,
  Switch,
  Input,
  Tooltip,
  FormInstance
} from 'antd'
import './analysis-board.less'
import { observer, inject, MobXProviderContext } from 'mobx-react'
import { AnalysisBoardStore } from '../../../stores/analysis-board-store'
import SelectDatabaseModal from './select-database-modal'
import { UserStore } from '../../../stores/user'
import { SetupChessboard } from '../../../components/chessboard/setup-chessboard'
import * as queryString from 'query-string'
import KeyHandler, { KEYDOWN, KEYPRESS } from 'react-key-handler'
import copy from 'copy-to-clipboard'
import { Scoresheet } from '../../../components/scoresheet/scoresheet'
import { ChessTypes } from '../../../types'
import { SquareLabel } from '../../../types/ChessTypes/ChessTypes'
import { SaveGameForm } from './save-game-modal'
import { useLocation, useNavigate } from 'react-router-dom'
import Chessgroundboard from '../../../components/chessgroundboard/Chessgroundboard'
import {BackwardOutlined, CopyFilled, FastBackwardOutlined, FastForwardFilled, FastForwardOutlined, ForwardFilled, ForwardOutlined, SwapOutlined } from '@ant-design/icons'
import { PastePgn } from '../../../components/chessboard/PastePgn'
//import { ChessgroundBoard } from '../../../components/chessgroundboard/SimpleChessgroundBoard'
/////onChange, onPressEnter textarea style={{width: '400px'}} rows={15}

const { TabPane } = Tabs

interface State {
  // moves: String
  modalState: string
  selectedDatabase: { uuid: string; name: string }
  setupPositionModalVisible: boolean,
  pastePgnModalVisible: boolean,
  setupPositionFen: ChessTypes.FEN
  orientation: string,
  fen?: string,
  pgn?: string
}

export const AnalysisBoard = observer(()=>{
  let gameFormRef= useRef(null)
  const [state, setState] = useState<State>({
    modalState: 'HIDDEN',
    selectedDatabase: { uuid: '', name: '' },
    setupPositionModalVisible: false,
    pastePgnModalVisible: false,
    setupPositionFen: '',
    orientation: 'white'
    // moves: []
  })
  const {analysisBoardStore, gameboxDatabaseStore, userStore} = useContext(MobXProviderContext)
  const location = useLocation()
  const navigate = useNavigate()
  
  useEffect(()=>{
    /*const params: any = queryString.parse(location.search)
    
    if (params.gameUuid != null) {
      analysisBoardStore.loadGame(params.gameUuid)
    }*/

    gameboxDatabaseStore.load()
/*
    document
      .querySelector('meta[name="viewport"]')!
      .setAttribute('content', 'width=device-width, initial-scale=1.0')
    return ()=>{
      document.querySelector('meta[name="viewport"]')!.setAttribute('content', '')
    }  */
  }, [])

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
        return { ...prevState, ...newState }
    })
  }

  const onMove = (orig: SquareLabel, dest: SquareLabel, metadata: ChessTypes.ChessJSVerboseMove) => {
    console.log('Move made', orig, dest, metadata)
    analysisBoardStore!.move({
      from: orig,
      to: dest,
      promotion: metadata && metadata.promotion
    })
    console.log("fen after update " + analysisBoardStore!.fen)
    updateBoard()
    //return {}
  }

  const onGoToPath = () => {}

  const handleSaveToSharebox = () => {
    updateState({
      modalState: 'SELECT_DATABASE'
    })
  }

  const handleUndo = () => {
   analysisBoardStore!.undo()
   updateBoard()
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
      setupPositionFen: '',
      fen: analysisBoardStore!.fen
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
    updateBoard()
  }

  const handleAddComment = (path: ChessTypes.PlyPath, text: string) => {
    analysisBoardStore!.handleAddComment(path, text)
    updateBoard()
  }

  const handleDeleteComment = (path: ChessTypes.PlyPath) => {
    analysisBoardStore!.handleDeleteComment(path)
    updateBoard()
  }

  const handleNewGame = async () => {
    navigate(window.location.pathname) // remove gameUuid params
    await analysisBoardStore!.newGame()
    updateBoard()
  }

  const handleUpdateGame = async () => {
    const success = await analysisBoardStore!.updateGame()
    if (success) {
      message.success('Updated Game')
    } else {
      message.error('Failed to update game')
    }
  }
  
  const handleResetGame = async () => {
    await analysisBoardStore!.resetGame()
    updateBoard()
  }

  const updateBoard = ()=>{
    updateState({fen: analysisBoardStore!.fen})
  }

  const handleDuplicate = async () => {
    const success = await analysisBoardStore!.duplicateGame()
    if (success) {
      message.success('Duplicated Game')
    } else {
      message.error('Failed to duplicate game')
    }
  }

  const handleIsPublicToggle = (checked: boolean) => {
    analysisBoardStore.setIsPublic(checked)
  }

  const handleFlip = () => {
    updateState({
      orientation: state.orientation === 'white' ? 'black' : 'white'
    })
  }

  const getShareUrl = () => {
    return window.location.href.replace('app/board', 'public-board')
  }

  const copyPublicUrlToClipboard = () => {
    copy(getShareUrl())
    message.success('URL Copied')
  }

  const renderPublicUrlToggle = () => {
    return (
      <Row justify="start" align="middle" style={{ margin: '8px' }}>
        <Col>
          <Switch
            checkedChildren={<span>public</span>}
            unCheckedChildren={<span>private</span>}
            checked={analysisBoardStore.isPublic}
            onChange={handleIsPublicToggle}
            disabled={userStore.role == 'student'}
          />
        </Col>
        {analysisBoardStore.isPublic && (
          <Col span={16} style={{ marginLeft: '4px' }}>
            <Input
              size="small"
              value={getShareUrl()}
              suffix={
                <CopyFilled style={{ color: '#645eeb' }}
                onClick={copyPublicUrlToClipboard}/>
              }
            />
          </Col>
        )}
      </Row>
    )
  }

  const backward = ()=>{
    analysisBoardStore!.backward()
    updateBoard()
  }

  const prev = ()=>{
    analysisBoardStore!.prev()
    updateBoard()
  }

  const next = ()=>{
    analysisBoardStore!.next()
    updateBoard()
  }

  const forward = ()=>{
    analysisBoardStore!.forward()
    updateBoard()
  }  

  const pastePgn = ()=>{
    updateState({
      pastePgnModalVisible: true
    })
  }

  const copyPgn = ()=>{
    copy(analysisBoardStore!.pgn())
    message.success('PGN Copied')
    console.log(analysisBoardStore!.pgn())
  }

  const handlePastePgnCancel = () => {
    updateState({
      pastePgnModalVisible: false
    })
  }

  const handlePastePgnOk = (pgn: string) => {
    console.log("Load game for pgn: " + pgn)
    analysisBoardStore!.loadPgnText(pgn)
    updateBoard()
    updateState({
      pastePgnModalVisible: false
    })
  }

  const renderContent = ()=>{
    console.log('board state', analysisBoardStore!.state)
    console.log("fen " + analysisBoardStore!.fen)
    console.log("sideToPlay: " + analysisBoardStore!.sideToPlay)
    return (
      <Row className="analysis-board scoresheet-container">
        <Col md={{ span: 12, offset: 2 }} sm={24}>
          <Chessgroundboard
            height={600}
            width={600}
            orientation={state.orientation}
            fen={state.fen!}
            turnColor={analysisBoardStore!.sideToPlay}
            onMove={onMove}
            movable={analysisBoardStore!.calcMovable()}
          />
          <Row            
            justify="center"
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
          >
            <Col span={2} offset={1}>
              <Tooltip title="fast-backward (< key)">
                <Button
                  icon={<FastBackwardOutlined/>}
                  type="ghost"
                  shape="circle"
                  onClick={backward}
                />
              </Tooltip>
            </Col>
            <Col span={2}>
              <Tooltip title="backward (left arrow)">
                <Button
                  icon={<BackwardOutlined/>}
                  type="ghost"
                  shape="circle"
                  onClick={prev}
                />
              </Tooltip>
            </Col>
            <Col span={2}>
              <Tooltip title="flip board (f key)">
                <Button
                  icon={<SwapOutlined/>}
                  style={{ transform: 'rotate(90deg)' }}
                  type="ghost"
                  shape="circle"
                  onClick={handleFlip} //{this.props.analysisBoardStore!.prev} //change this
                />
              </Tooltip>
            </Col>
            <Col span={2}>
              <Tooltip title="forward (right arrow)">
                <Button
                  icon={<ForwardOutlined/>}
                  type="ghost"
                  shape="circle"
                  onClick={next}
                />
              </Tooltip>
            </Col>
            <Col span={2}>
              <Tooltip title="fast-forward (> key)">
                <Button
                  icon={<FastForwardOutlined/>}
                  type="ghost"
                  shape="circle"
                  onClick={forward}
                />
              </Tooltip>
            </Col>
          </Row>  ``
        </Col>
        <Col
          className="analysis-board--tabs"
          md={{ span: 8, offset: 2 }}
          sm={24}
        >
          <h1 style={{ margin: '8px' }}>
            {analysisBoardStore.gameName}
          </h1>

          {analysisBoardStore!.isGameSaved &&
            renderPublicUrlToggle()}

          <Row className="buttons-container" justify="start">
            {analysisBoardStore!.isGameSaved && (
              <>
                <Col className="operation-button">
                  <Button
                    onClick={handleUpdateGame}
                    size="small"
                    type="primary"
                  >
                    Update
                  </Button>
                </Col>
                <Col className="operation-button">
                  <Button onClick={handleResetGame} size="small">
                    Reset
                  </Button>
                </Col>
                <Col className="operation-button">
                  <Button onClick={handleDuplicate} size="small">
                    Duplicate
                  </Button>
                </Col>
              </>
            )}
            {analysisBoardStore!.savedGameDetails == null && (
              <Col className="operation-button">
                <Button
                  onClick={handleSaveToSharebox}
                  size="small"
                  type="primary"
                >
                  Save
                </Button>
              </Col>
            )}
            <Col className="operation-button">
              <Button onClick={handleNewGame} size="small">
                New
              </Button>
            </Col>
            <Col className="operation-button">
              <Button onClick={handleSetupPosition} size="small">
                Setup Position
              </Button>
            </Col>
            <Col className="operation-button">
              <Button onClick={handleUndo} size="small">
                Undo
              </Button>
            </Col>
            <Col className="operation-button">
              <Button onClick={pastePgn} size="small">
                Paste PGN game
              </Button>
            </Col>
            <Col className="operation-button">
              <Button onClick={copyPgn} size="small">
                Copy PGN
              </Button>
            </Col>
          </Row>

          <Tabs type="card" defaultActiveKey="moves">
            <TabPane tab="Moves" key="moves">
              {/* <div className="analysis-board--moves">
              <p>{this.state.moves}</p>
            </div> */}
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
                onHideMovesChange={() => {}}
              />
            </TabPane>
            {/* <TabPane tab="Analysis" key="analysis">
              <div className="analysis-board--analyse">
                <p>Game analysis will show up here</p>
              </div>
            </TabPane> */}
          </Tabs>
        </Col>
      </Row>
    )
  }

  const handleGoToPath = (path: ChessTypes.PlyPath) => {
    analysisBoardStore!.gotoPath(path)
    updateBoard()
  }

  const handleCreate = () => {
    const form : FormInstance<any>  = gameFormRef.current!
    form.validateFields().then((values) => {
      // console.log('Received values of form: ', values)

      var gameUuid = analysisBoardStore.saveGame(
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
    const form : FormInstance  = gameFormRef.current!
    form.resetFields()
    updateState({
      selectedDatabase: { uuid: '', name: '' },
      modalState: 'HIDDEN'
    })
  }

  const handleBack = () => {
    const form : FormInstance  = gameFormRef.current!
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
          onKeyHandle={prev}
        />
        <KeyHandler
          keyEventName={KEYDOWN}
          keyValue="ArrowRight"
          onKeyHandle={next}
        />
        <KeyHandler
          keyEventName={KEYDOWN}
          keyValue="f"
          onKeyHandle={handleFlip}
        />
        <KeyHandler
          keyEventName={KEYDOWN}
          keyValue=","
          onKeyHandle={backward}
        />
        <KeyHandler
          keyEventName={KEYDOWN}
          keyValue="."
          onKeyHandle={forward}
        />
      </>
    )
  }

  return (
    <Layout className="student app page">
      {renderKeyBindings()}
      <Layout.Content className="content">
        {renderContent()}
        <SelectDatabaseModal
          visible={state.modalState === 'SELECT_DATABASE'}
          onCancel={handleCancel}
          onSelectDatabase={handleSelectDatabase}
          onCreateDatabase={handleCreateDatabase}
          databases={gameboxDatabaseStore!.databases}
        ></SelectDatabaseModal>
        <SaveGameForm
          visible={state.modalState === 'INPUT_METADATA'}
          recentEvents={gameboxDatabaseStore!.recentEvents}
          ref={gameFormRef}
          onCancel={handleCancel}
          onBack={handleBack}
          onCreate={handleCreate}
        ></SaveGameForm>
        {state.setupPositionModalVisible && (
          <Modal
            title="Setup Position"
            visible={state.setupPositionModalVisible}
            style={{ top: 25 }}
            width={800}
            maskClosable={false}
            onCancel={handleSetupPositionCancel}
            onOk={handleSetupPositionOk}
          >
            <div className="position-setup-modal" title="Setup Position">
              <SetupChessboard
                width={550}
                height={550}
                initialFen={state.setupPositionFen as ChessTypes.FEN}
                onChange={handleSetupPositionFenChange}
              />
            </div>
          </Modal>
        )}
        {state.pastePgnModalVisible && (
          <PastePgn visible={state.pastePgnModalVisible} handleOk={handlePastePgnOk} handleCancel={handlePastePgnCancel}/>
        )}        
      </Layout.Content>
    </Layout>
  )

})