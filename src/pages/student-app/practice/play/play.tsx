import * as React from 'react'
import * as R from 'ramda'
import { Divider, Button, Breadcrumb, Popconfirm } from 'antd'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import {
  SIDE_TO_PLAY_WIN,
  SIDE_TO_PLAY_DRAW,
  PracticeStore
} from '../../../../stores/practice'
import { States } from '../../../../components/states/states'
import { ConfiguredChessboard } from '../../../../components/chessboard/configured-chessboard'
import Measure from 'react-measure'

import './play.less'
import { EngineStore } from '../../../../stores/engine'
import Drill from '../../../../types/Drill'
import { ChessTypes } from '../../../../types'
import * as Util from '../../../../utils/Util'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Chess } from 'chess.js'
import { on } from 'events'
import { CheckOutlined, CloseCircleOutlined, HourglassOutlined } from '@ant-design/icons'

const OFFSET_HEIGHT = 75
type GoalState = 'PROGRESS' | 'FAILED' | 'ACHIEVED'

interface State {
  startFen: ChessTypes.FEN
  fen: ChessTypes.FEN
  boardOrientation: ChessTypes.Side
  boardSize: number
  mainline: ChessTypes.Variation
  squareHighlights: ChessTypes.SquareHighlightAnnotation[]
  thinking: boolean
  goal: GoalState
  error: string
}

export const Play = observer(() => {
  const { practiceStore, engineStore } = React.useContext(MobXProviderContext)
  const [state, setState] = React.useState<State>({
    startFen: '',
    fen: '',
    boardOrientation: 'w' as ChessTypes.Side,
    boardSize: 0,
    mainline: [],
    squareHighlights: [], // For highlighting last move
    thinking: false,
    goal: 'PROGRESS' as GoalState,
    error: ''
  })
  const location = useLocation()
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  const navigate = useNavigate()
  const { uuid } = useParams()
  const getpracticeItem = () => {
    return R.find(
      (i: any) => i.uuid === uuid,
      practiceStore!.items
    ) as Drill
  }

  const handleBackTopractice = () => {
    navigate(location.pathname.replace(/\/play(.)+$/gi, ''))
  }

  const handleTryAgain = () => {
    updateState({
      startFen: state.startFen,
      fen: state.startFen,
      thinking: false,
      goal: 'PROGRESS'
    })
  }

  React.useEffect(() => {
    onMove()
  }, [state.fen])

  /*
  const thinkingCallback = () => {
    setTimeout(() => {
      updateState({
        thinking: false,
        fen: g.fen(),
        squareHighlights: [
          {
            type: 'SQUARE_HIGHLIGHT',
            square: newMove.from,
            color: 'yellow'
          },
          {
            type: 'SQUARE_HIGHLIGHT',
            square: newMove.to,
            color: 'yellow'
          }
        ]
      })
    }, 500)
  }
  */

  const onMove = async () => {

    const practiceItem = getpracticeItem()
    const sideToMove = Util.getSideToMoveFromFen(state.fen)
    const startSideToMove = Util.getSideToMoveFromFen(state.startFen)
    const g = new Chess(state.fen)
    if (g.game_over()) {
      // TODO: Side to play checkmates
      if (
        practiceItem.goal === SIDE_TO_PLAY_WIN &&
        sideToMove === startSideToMove &&
        g.in_checkmate()
      ) {
        updateState({ goal: 'ACHIEVED', fen: g.fen(), thinking: false })
      } else if (practiceItem.goal === SIDE_TO_PLAY_DRAW && g.in_draw()) {
        updateState({ goal: 'ACHIEVED', fen: g.fen(), thinking: false })
      } else {
        updateState({ goal: 'FAILED', fen: g.fen(), thinking: false })
      }
    } else {
      try {
        const engineEval = await engineStore!.go({
          fen: g.fen(),
          depth: 10
        })
        const nextMove = engineEval.result!.mainline[0]
        const newMove = g.move(nextMove)
        const sideToMove = Util.getSideToMoveFromFen(g.fen())
        if (newMove) {
          // Check for goal yet again
          if (g.game_over()) {
            // TODO: Side to play checkmates
            if (
              practiceItem.goal === SIDE_TO_PLAY_WIN &&
              sideToMove === startSideToMove &&
              g.in_checkmate()
            ) {
              updateState({ goal: 'ACHIEVED', fen: g.fen() })
            } else if (
              practiceItem.goal === SIDE_TO_PLAY_DRAW &&
              g.in_draw()
            ) {
              updateState({ goal: 'ACHIEVED', fen: g.fen() })
            } else {
              updateState({ goal: 'FAILED', fen: g.fen() })
            }
          } else {
            updateState({ thinking: true })
          }
        }
      } catch (e) {
        updateState({ error: 'Failed to receive move' })
      }
    }
  }

  const handleMove = async (m: ChessTypes.ChessJSVerboseInputMove) => {
    const g = new Chess(state.fen)
    if (g.move(m)) {
      updateState(
        {
          fen: g.fen(),
          thinking: true
        }
      )
    }
  }
  async function componentDidMount() {
    try {
      await practiceStore!.load()
      const item = getpracticeItem()
      const fen = item.fen
      updateState({
        startFen: fen,
        fen,
        boardOrientation: Util.getSideToMoveFromFen(fen)
      })
    } catch (e) { }
  }

  if (practiceStore!.loading) {
    return (
      <div className="practice inner play">
        <States type="loading" />
      </div>
    )
  }

  if (practiceStore!.error) {
    return (
      <div className="practice inner play">
        <States
          type="error"
          exceptionText={practiceStore!.error}
          icon="fire"
        />
      </div>
    )
  }

  const item = getpracticeItem()

  return (
    <div className="practice inner play">
      <div className="action-bar">
        <Breadcrumb>
          <Breadcrumb.Item>
            {state.goal !== 'ACHIEVED' ? (
              <Popconfirm
                placement="bottom"
                title="Play in progress, are you sure you want to go back?"
                onConfirm={handleBackTopractice}
              >
                <Link
                  to={location.pathname.replace(
                    '/play/' + uuid,
                    ''
                  )}
                >
                  practice
                </Link>
              </Popconfirm>
            ) : (
              <Link
                to={location.pathname.replace(
                  '/play/' + uuid,
                  ''
                )}
              >
                practice
              </Link>
            )}
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <strong>{item.name}</strong>
          </Breadcrumb.Item>
        </Breadcrumb>
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
                fen={state.fen}
                width={state.boardSize}
                height={state.boardSize}
                interactionMode={state.thinking ? 'NONE' : 'MOVE'}
                showSideToMove={true}
                orientation={state.boardOrientation}
                squareHighlights={state.squareHighlights}
                onMove={handleMove}
              />
              {state.thinking && (
                <div className="thinking">
                  <HourglassOutlined />
                  <span className="description">Thinking...</span>
                </div>
              )}
              {state.goal === 'ACHIEVED' && (
                <div className="goal achieved">
                  <div className="box">
                    <CheckOutlined />
                    <span className="description">
                      You achieved the goal!
                    </span>
                    <Button
                      onClick={handleBackTopractice}
                      type="primary"
                    >
                      Back to practice
                    </Button>
                  </div>
                </div>
              )}
              {state.goal === 'FAILED' && (
                <div className="goal failed">
                  <div className="box">
                    <CloseCircleOutlined />
                    <span className="description">
                      You didn't achieve the goal
                    </span>
                    <Button onClick={handleTryAgain} type="primary">
                      Try Again
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Measure>
    </div>
  )
})