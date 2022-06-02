import * as React from 'react'
import {
  Divider,
  Button,
  Breadcrumb,
  Popconfirm,
  Layout,
  Modal,
  Select,
  Drawer,
  Radio,
  Row,
  Col
} from 'antd'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import { ConfiguredChessboard } from '../../../components/chessboard/configured-chessboard'
import Measure from 'react-measure'

import './blindbot.less'
import { EngineStore } from '../../../stores/engine'
import { SetupChessboard } from '../../../components/chessboard/setup-chessboard'
import { Scoresheet } from './scoresheet/scoresheet'
import { ChessTypes } from '../../../types'
import * as Util from '../../../utils/Util'
import * as GameEditor from '../../../components/game-editor'
import * as Chess from 'chess.js';
import { useNavigate } from 'react-router-dom'
import { HourglassOutlined } from '@ant-design/icons'

const OFFSET_HEIGHT = 125

const { Content } = Layout

// TODO: Move this to FEN utils
function getFullMoveNumber(fen: ChessTypes.FEN) {
  return fen.split(' ')[5]
}

// TODO: Move this to piece utils
function getPiecesCount(fen: ChessTypes.FEN) {
  const expandedFen = Util.expandFen(fen)
  const piecePlacement = expandedFen.split(' ')[0].replace('/', '')
  const matches = piecePlacement.match(/1/g)
  return 64 - (matches ? matches.length : 0)
}

interface State {
  playerSide: ChessTypes.Side
  boardSize: number
  squareHighlights: ChessTypes.SquareHighlightAnnotation[]
  thinking: boolean
  error: string
  gameEditor: GameEditor.GameEditor
  revealPosition: boolean
  showScoresheet: boolean
  startFen: ChessTypes.FEN
  setup: boolean
  result: ChessTypes.GameResult
  maxDepth: number
}

export const Blindbot = ()=>{
  const {practiceStore, engineStore} = React.useContext(MobXProviderContext)
  const ChessJS = typeof Chess === 'function' ? Chess : Chess.Chess
  const [state, setState] = React.useState<State>({
    playerSide: 'w' as ChessTypes.Side,
    boardSize: 0,
    squareHighlights: [], // For highlighting last move
    thinking: false,
    error: '',
    gameEditor: new GameEditor.GameEditor(),
    revealPosition: false,
    showScoresheet: false,
    startFen: new ChessJS().fen(), // TODO: change this based on position setup
    setup: true,
    result: '*' as ChessTypes.GameResult,
    maxDepth: 1
  })
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
/*
  let unregisterHistoryBlock: Function = props.history.block(
    'Are you sure you want to navigate away?'
  )
    React.useEffect(()=>{
    unregisterHistoryBlock()
  })

  */

  const navigate = useNavigate()
  
  const getCurrentFen = () => {
    const moveAtPath = state.gameEditor.getMoveAtPath(
      state.gameEditor.getState().currentPath
    )
    return moveAtPath
      ? moveAtPath.fen
      : state.gameEditor.getState().startFen!
  }

  const handleEditCancel = (link: string) => (e: any) => {
    navigate(link)
  }
  
/*
  React.useEffect(()=>{
    if (state.thinking) {
      handleGameOver(fen, g.fen())
    }
    const g = new Chess(getCurrentFen())
    if (state.thinking || g.game_over()) {
      handleGameOver(fen, g.fen())
    }
    if (g.game_over()) {
      this.handleGameOver(prevFen, g.fen())
    } else {
      await this.makeEngineMove(g.fen())
    }
  }, [state.thinking])*/

  const makeEngineMove = async (fen: ChessTypes.FEN) => {
    const g = new ChessJS(fen)
    try {
      const depth = Math.min(
        getPiecesCount(fen) > 6 ? 8 : 5,
        state.maxDepth
      )
      const engineEval = await engineStore!.go({ fen, depth })
      const nextMove = engineEval.result!.mainline[0]
      const newMove = g.move(nextMove)
      if (newMove) {
        state.gameEditor.addMove(newMove)
        updateState(
          {
            thinking: false,
            squareHighlights: [
              {
                type: 'SQUARE_HIGHLIGHT',
                square: newMove.from,
                color: 'yellow'
              },
              { type: 'SQUARE_HIGHLIGHT', square: newMove.to, color: 'yellow' }
            ]
          }
        )
      }
    } catch (e) {
      updateState({ error: 'Failed to receive move' })
    }
  }

  const handleSetupPositionFenChange = (fen: ChessTypes.FEN) => {
    updateState({ startFen: fen })
  }

  const handlePlayerSideChange = (value: any) => {
    updateState({ playerSide: value as ChessTypes.Side })
  }

  const handleNewGame = () => {
    updateState({
      squareHighlights: [], // For highlighting last move
      thinking: false,
      error: '',
      gameEditor: new GameEditor.GameEditor(),
      revealPosition: false,
      showScoresheet: false,
      startFen: new ChessJS().fen(), // TODO: change this based on position setup
      setup: true,
      result: '*' as ChessTypes.GameResult
    })
  }

  const handleRestart = () => {
    const thinking =
      state.playerSide !== Util.getSideToMoveFromFen(state.startFen)
    updateState(
      {
        error: '',
        thinking,
        gameEditor: new GameEditor.GameEditor(state.startFen),
        revealPosition: false,
        showScoresheet: false,
        squareHighlights: [],
        setup: false
      }
    )
  }

  const handleGameSetup = () => {
    handleRestart()
  }

  const handleResign = () => {
    updateState({
      error: '',
      thinking: false,
      gameEditor: new GameEditor.GameEditor(state.startFen),
      revealPosition: false,
      showScoresheet: false,
      squareHighlights: [],
      setup: true
    })
  }

  const handleToggleScoresheet = () => {
    updateState({ showScoresheet: !state.showScoresheet })
  }

  const handleGameOver = (prevFen: ChessTypes.FEN, lastFen: ChessTypes.FEN) => {
    const g = new ChessJS(lastFen)
    updateState({
      revealPosition: true,
      thinking: false,
      result: g.in_draw()
        ? '1/2-1/2'
        : Util.getSideToMoveFromFen(prevFen) === 'w'
        ? '1-0'
        : '0-1'
    })
  }

  const handleRevealPositionToggle = () => {
    updateState({
      revealPosition: !state.revealPosition
    })
  }

  const handleSetMaxDepth = (e: any) => {
    updateState({ maxDepth: e.target.value })
  }

  const handleMove = async (m: ChessTypes.ChessJSVerboseInputMove) => {
    const prevFen = getCurrentFen()
    const g = new ChessJS(getCurrentFen())
    if (g.move(m)) {
      state.gameEditor.addMove(m)
      updateState(
        {
          squareHighlights: [
            { type: 'SQUARE_HIGHLIGHT', square: m.from, color: 'yellow' },
            { type: 'SQUARE_HIGHLIGHT', square: m.to, color: 'yellow' }
          ],
          thinking: true
        }
      )
    }
  }

  const lastMove = state.gameEditor.getMoveAtPath(
     state.gameEditor.getState().currentPath
  )
  const lastMoveString = lastMove ? (
    <span>
      <span className="number">
        {lastMove.side === 'w' && getFullMoveNumber(lastMove.fen) + '. '}
        {lastMove.side === 'b' &&
          (getFullMoveNumber(lastMove.fen) as any) - 1 + '... '}
      </span>
      {lastMove.san}
    </span>
  ) : (
    ''
  )

  return (
    <Content className="blindbot content">
      <div className="inner">
        <div className="action-bar">
          <div className="left">
            <Breadcrumb>
              <Breadcrumb.Item>
                <strong>Blindbot</strong>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="right">
            <Popconfirm
              title="Are you sure you want to start a new game?"
              onConfirm={handleNewGame}
            >
              <Button
                type="primary"
                size="small"
                disabled={state.thinking}
              >
                New Game
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Are you sure you want to restart the game?"
              onConfirm={handleRestart}
            >
              <Button
                danger
                size="small"
                disabled={state.thinking}
              >
                Restart
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Are you sure you want to resign the game?"
              onConfirm={handleResign}
            >
              <Button
                danger
                size="small"
                disabled={state.thinking}
              >
                Resign
              </Button>
            </Popconfirm>
            {state.revealPosition && (
              <Button
                type="primary"
                size="small"
                onClick={handleRevealPositionToggle}
                style={{ width: 115 }}
              >
                Hide Position
              </Button>
            )}
            {!state.revealPosition && (
              <Button
                type="primary"
                size="small"
                onClick={handleRevealPositionToggle}
                style={{ width: 115 }}
              >
                Reveal Position
              </Button>
            )}
            <Button
              type="primary"
              size="small"
              onClick={handleToggleScoresheet}
            >
              Show Scoresheet
            </Button>
          </div>
        </div>
        <Divider className="below-action-bar" />
        <Measure
          bounds={true}
          onResize={contentRect =>
            updateState({
              boardSize: contentRect.bounds!.height - OFFSET_HEIGHT
            })
          }
        >
          {({ measureRef }) => (
            <div ref={measureRef} className="game-container">
              <div className="board-container">
                <ConfiguredChessboard
                  fen={getCurrentFen()}
                  width={state.boardSize}
                  height={state.boardSize}
                  interactionMode={state.thinking ? 'NONE' : 'MOVE'}
                  showSideToMove={true}
                  orientation={state.playerSide}
                  squareHighlights={state.squareHighlights}
                  onMove={handleMove}
                  blindfold={!state.revealPosition}
                />
                {state.thinking && (
                  <div className="thinking">
                    <HourglassOutlined />
                    <span className="description">Thinking...</span>
                  </div>
                )}
                {!lastMove && (
                  <div className="last-move">
                    <span>
                      Your turn, click on the squares or drag to move the
                      hidden pieces
                    </span>
                  </div>
                )}
                {lastMove && (
                  <div className="last-move">{lastMoveString}</div>
                )}
              </div>
            </div>
          )}
        </Measure>
        <Modal
          title="New blindbot game"
          visible={state.setup}
          style={{ top: 25 }}
          width={800}
          closable={false}
          maskClosable={false}
          onOk={handleGameSetup}
          onCancel={handleEditCancel('/app/dashboard')}
        >
          <Row className="set-difficulty" style={{ marginBottom: '1em' }}>
            <Col offset={16}>
              Difficulty:&nbsp;&nbsp;
              <Radio.Group
                size="small"
                value={state.maxDepth}
                onChange={handleSetMaxDepth}
              >
                <Radio.Button value={1}>Easy</Radio.Button>
                <Radio.Button value={4}>Medium</Radio.Button>
                <Radio.Button value={8}>Hard</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
          <Row className="position-setup-modal" title="Setup Position">
            {state.setup && (
              <SetupChessboard
                width={550}
                height={550}
                initialFen={state.startFen}
                onChange={handleSetupPositionFenChange}
              />
            )}
            <div className="player color">
              <span className="label">You play:</span>&nbsp;
              <Select
                size="small"
                value={state.playerSide}
                onChange={handlePlayerSideChange}
              >
                <Select.Option value="w">White</Select.Option>
                <Select.Option value="b">Black</Select.Option>
              </Select>
            </div>
          </Row>
        </Modal>
        <Modal
          visible={state.result !== '*'}
          title="Game Over"
          cancelText="Back to Dashboard"
          okText="New Game"
          closable={false}
          onOk={handleNewGame}
        >
          {state.result === '1/2-1/2' && <h3>Draw</h3>}
          {((state.result === '1-0' && state.playerSide === 'w') ||
            (state.result === '0-1' &&
              state.playerSide === 'b')) && <h3>Great, you won!</h3>}
          {((state.result === '0-1' && state.playerSide === 'w') ||
            (state.result === '1-0' &&
              state.playerSide === 'b')) && (
            <h3>You lost, but don't despair!</h3>
          )}
        </Modal>
        <Drawer
          className="blindbot-scoresheet-container"
          closable={true}
          onClose={handleToggleScoresheet}
          visible={state.showScoresheet}
          placement="right"
          width={450}
        >
          <div className="drawer-inner">
            <div className="title">
              <h3>Scoresheet</h3>
            </div>
            <div className="content">
              <Scoresheet
                currentPath={state.gameEditor.getState().currentPath}
                mainline={state.gameEditor.getState().mainline}
              />
            </div>
          </div>
        </Drawer>
        <Modal
          visible={state.error.length > 0}
          title="Error"
          cancelButtonProps={{ style: { display: 'none' } }}
          okText="Try again"
          onOk={() => makeEngineMove(getCurrentFen())}
        >
          An unexpected error occured while receiving move from bot.
        </Modal>
      </div>
    </Content>
  )
}