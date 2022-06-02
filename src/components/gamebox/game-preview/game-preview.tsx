import * as R from 'ramda'
import { useContext, useEffect, useState } from 'react'
import { MobXProviderContext, observer } from 'mobx-react'

import { Button, Tabs } from 'antd'

import './game-preview.less'

import Scoresheet from '../scoresheet/scoresheet'
import { hydrateWithDerviedFields } from '../../../utils/utils'
import { LoadingOutlined, PicLeftOutlined } from '@ant-design/icons'
import { ChessTypes } from '../../../types'
import { Chess } from 'chess.js'
import { Analyzer } from '../../analyzer/analyzer'
import { Chessboard } from '../../chessboard/Chessboard'

const { TabPane } = Tabs

const getMoveAtPath = (game: ChessTypes.Game, path: any) => {
  return path
    ? path.reduce((acc: any, p: any) => acc[p] || null, game.mainline, path)
    : null
}

const getFenAtPath = (game: ChessTypes.Game, path: any) => {
  const moveAtPath = getMoveAtPath(game, path)
  return moveAtPath && moveAtPath.fen
}

interface GameShape extends ChessTypes.Game {
  uuid: string
  content: any
  meta: any
  [key: string]: any
}

interface WrappedProps {
  error: boolean
  loading: boolean
  game?: GameShape
  isAnalyzeFeatureOn?: boolean
  onErrorRetry: () => any
}

interface WrappedState {
  currentGame?: ChessTypes.Game
  currentPath: any[]
  gameArea: boolean
  analyzeArea: boolean
  analyzeFen: String
}

export const WrappedGamePreview = (props: WrappedProps)=>{
  const [state, setState] = useState<WrappedState>({
    currentPath: [],
    currentGame: undefined,
    gameArea: true,
    analyzeArea: false,
    analyzeFen: new Chess().fen()
  })
  const updateState = (newState: Partial<WrappedState>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  useEffect(()=>{
    if (props.game) {
    updateState({
      currentPath: [],
      currentGame: hydrateWithDerviedFields(
        props.game.meta,
        props.game.content
      )
    })
  }
  }, [props.game])

  const setGameArea = () => {
    updateState({
      gameArea: true,
      analyzeArea: false,
      analyzeFen: new Chess().fen()
    })
  }
  
  const setAnalyzeArea = (fen: String) => {
    updateState({
      gameArea: false,
      analyzeArea: true,
      analyzeFen: fen
    })
    renderChessboard()
  }

  const handlePrev = (times: number) => () => {
    setGameArea()
    const currentPath =
      state.currentPath.length <= 0 ? [0] : state.currentPath
    const currentIdx = R.last(currentPath)! as number
    let prevPath = currentPath
    // TODO: Jump to parent variation
    for (let i = 0; i <= times; i++) {
      prevPath = [...R.dropLast(1, currentPath), Math.max(currentIdx - i, 0)]
      const prevMove = getMoveAtPath(state.currentGame!, prevPath)
      prevPath = prevMove ? prevPath : currentPath
      if (!prevMove) break
    }
    updateState({ currentPath: prevPath })
  }

  const handleNext = (times: number) => () => {
    setGameArea()
    const currentPath =
      state.currentPath.length <= 0 ? [0] : state.currentPath
    const currentIdx = R.last(currentPath)! as number
    let nextPath = currentPath
    for (let i = 0; i <= times; i++) {
      nextPath = [...R.dropLast(1, currentPath), currentIdx + i]
      const nextMove = getMoveAtPath(state.currentGame!, nextPath)
      nextPath = nextMove ? nextPath : currentPath
      if (!nextMove) break
    }
    updateState({ currentPath: nextPath })
  }

  const handleMoveClick = (path: any) => {
    if (path) {
      setGameArea()
      updateState({ currentPath: path })
    }
  }

  const renderLoadingOverlay = () => {
    if (props.loading) {
      return (
        <div className={'loadingOverlay'}>
          <LoadingOutlined/>
        </div>
      )
    }

    return null
  }

  const renderErrorOverlay = () => {
    if (props.error) {
      return (
        <div className={'errorOverlay'}>
          <PicLeftOutlined />
          <p>We encountered an error while loading the game</p>
          <Button size="small" type="primary" onClick={props.onErrorRetry}>
            Retry
          </Button>
        </div>
      )
    }

    return null
  }

  const renderMetaAndControls = () => {
    return (
      <div className={'metaAndControls'}>
        {/* <Link href={`/game/${this.props.game!.uuid}`}>
          <a target="_blank">Edit</a>
        </Link> */}
      </div>
    )
  }

  const renderChessboard = () => {
    const meta = props.game!.meta
    const fen =
      (state.analyzeArea && state.analyzeFen) ||
      (state.gameArea &&
        (getFenAtPath(state.currentGame!, state.currentPath) ||
          meta.startfen ||
          meta.startFen ||
          meta.fen ||
          props.game!.content.startFen ||
          new Chess().fen()))
    return (
      <div className={'chessboardContainer'}>
        <Chessboard width={300} height={300} fen={fen} interactionMode="NONE" />
        <div className={'controlButtons'}>
          <Button
            icon="fast-backward"
            size="small"
            onClick={handlePrev(5)}
          />
          <Button
            icon="step-backward"
            size="small"
            onClick={handlePrev(1)}
          />
          <Button
            icon="step-forward"
            size="small"
            onClick={handleNext(1)}
          />
          <Button
            icon="fast-forward"
            size="small"
            onClick={handleNext(5)}
          />
        </div>
      </div>
    )
  }

  const renderScoresheet = () => {
    return (
      state.currentGame && (
        <div className="scoresheetContainer">
          <Scoresheet
            onMoveClick={handleMoveClick}
            currentPath={state.currentPath}
            mainline={state.currentGame!.mainline}
          />
        </div>
      )
    )
  }

  const renderAnalyzer = () => {
    return (
      state.currentGame && (
        <div>
          <Analyzer
            moves={props.game!.content.mainline}
            fen={
              props.game!.meta.startfen ||
              props.game!.meta.fen ||
              new Chess().fen()
            }
            onClick={handleMoveClick}
            onAnalyzeMoveClick={setAnalyzeArea}
          />
        </div>
      )
    )
  }

  function renderGameInfo() {
    return (
      <Tabs className="game-info" defaultActiveKey="moves" type="card">
        <TabPane tab={<span>Moves</span>} key="moves">
          {state.currentGame && renderScoresheet()}
        </TabPane>
        {props.isAnalyzeFeatureOn && (
          <TabPane
            tab={
              <span>
                Analyze&nbsp;&nbsp;<sup style={{ color: 'red' }}>NEW</sup>
              </span>
            }
            key="analyze"
          >
            {state.currentGame && renderAnalyzer()}
          </TabPane>
        )}
      </Tabs>
    )
  }

  return (
    <div className={'gamePreview'}>
      {state.currentGame && renderMetaAndControls()}
      {state.currentGame && renderChessboard()}
      {renderGameInfo()}
      {renderLoadingOverlay()}
      {renderErrorOverlay()}
    </div>
  )
}

interface Props {
  gameUuid?: string
  isAnalyzeFeatureOn: boolean
}

export const GamePreview = observer((props: Props)=>{
  const {gameboxGamePreviewStore} = useContext(MobXProviderContext)
  useEffect(()=>{
    gameboxGamePreviewStore!.load({
      gameUuid: props.gameUuid
    })
  }, [props.gameUuid])

  if (!props.gameUuid) {
    return (
      <div className={`gamePreview noGameSelected`}>
        <p>Select a game to preview</p>
      </div>
    )
  }

  const gamePreview = gameboxGamePreviewStore!

  return (
    <WrappedGamePreview
      error={gamePreview.error}
      loading={gamePreview.loading}
      game={gamePreview.game}
      isAnalyzeFeatureOn={props.isAnalyzeFeatureOn}
      onErrorRetry={() =>
        gamePreview.load({
          gameUuid: props.gameUuid!
        })
      }
    />
  )
})