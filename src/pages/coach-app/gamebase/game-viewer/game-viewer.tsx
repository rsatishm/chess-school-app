import * as React from 'react'
import * as R from 'ramda'
import { Button, Breadcrumb, Divider, Row, Col } from 'antd'
import { Link, useLocation, useParams } from 'react-router-dom'
import { MobXProviderContext, observer } from 'mobx-react'
import Measure from 'react-measure'
import { HotKeys } from 'react-hotkeys'

import './game-viewer.less'

import { ConfiguredChessboard } from '../../../../components/chessboard/configured-chessboard'
import { States } from '../../../../components/states/states'
import { ChessTypes } from '../../../../types'
import { BarsOutlined, DatabaseOutlined } from '@ant-design/icons'

const ACTION_BUTTONS_HEIGHT = 48

interface State {
  boardSize: number
  orientation: ChessTypes.Side
}

export const GameViewer = observer(() => {
  const [state, setState] = React.useState<State>({
    boardSize: 0,
    orientation: 'w' as ChessTypes.Side
  })
  const location = useLocation()
  const { gamebaseUuid, uuid } = useParams()
  const { gameViewerStore } = React.useContext(MobXProviderContext)
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  const handleRetry = () => {
    window.location.reload()
  }

  const handleFlip = () => {
    updateState({
      orientation: state.orientation === 'w' ? 'b' : 'w'
    })
  }

  const renderVariation = (variation: ChessTypes.Variation, level: number): any => {
    const { getFullMoveNumber, currentPath } = gameViewerStore

    return (
      <div
        key={`variation-${level}-${variation[0].path}`}
        className={`variation level-${level}`}
      >
        {level > 0 && '('}
        {variation.map((m, i) => {
          const textAnnotations = R.filter(
            a => a.type === 'TEXT',
            m.annotations || []
          )

          return (
            <>
              <span
                key={m.path.toString()}
                className={`move ${((currentPath || '').toString() ===
                  m.path.toString() &&
                  'current') ||
                  ''}`}
                onClick={() => gameViewerStore.goToPath(m.path)}
              >
                <span className="number">
                  {m.side === 'w' && getFullMoveNumber(m.fen) + '. '}
                  {i === 0 &&
                    m.side === 'b' &&
                    (getFullMoveNumber(m.fen) as any) - 1 + '... '}
                </span>
                {m.san}
              </span>
              {textAnnotations.length > 0 && (
                <span className="text annotation">
                  ({(textAnnotations[0] as ChessTypes.TextAnnotation).body})
                </span>
              )}
              {m.variations && (
                <div
                  key={`${m.path}-variation`}
                  className={`variations-container level-${level}`}
                >
                  {m.variations.map(v => renderVariation(v, level + 1))}
                </div>
              )}
            </>
          )
        })}
        {level > 0 && ')'}
      </div>
    )
  }

  const renderGame = () => {
    if (gameViewerStore.fen) {
      const game = gameViewerStore.game!

      return (
        <Row>
          <Col sm={24} md={12}>
            <Measure
              bounds={true}
              onResize={contentRect =>
                updateState({
                  boardSize: Math.min(
                    contentRect.bounds!.width,
                    contentRect.bounds!.height
                  )
                })
              }
            >
              {({ measureRef }) => {
                return (
                  <div ref={measureRef} className="game-container">
                    <div className="board-container">
                      <ConfiguredChessboard
                        fen={gameViewerStore.fen!}
                        width={state.boardSize}
                        height={state.boardSize}
                        interactionMode="NONE"
                        orientation={state.orientation}
                      />
                      <div className="action-buttons">
                        <Button
                          icon="fast-backward"
                          onClick={gameViewerStore.fastPrev}
                          type="ghost"
                          shape="circle"
                        />
                        <Button
                          icon="backward"
                          onClick={gameViewerStore.prev}
                          type="ghost"
                          shape="circle"
                        />
                        <Button
                          icon="forward"
                          onClick={gameViewerStore.next}
                          type="ghost"
                          shape="circle"
                        />
                        <Button
                          icon="fast-forward"
                          onClick={gameViewerStore.fastNext}
                          type="ghost"
                          shape="circle"
                        />
                        <Button
                          className="flip-button"
                          icon="swap"
                          onClick={handleFlip}
                          type="ghost"
                          shape="circle"
                        />
                      </div>
                    </div>
                  </div>
                )
              }}
            </Measure>
          </Col>
          <Col sm={24} md={12}>
            <div className="scoresheet">
              {renderVariation(game.mainline, 0)}
              <span className="result">{game.result}</span>
            </div>
          </Col>
        </Row>
      )
    }

    return null
  }

  const breadcrumbText = gameViewerStore.game
    ? `${gameViewerStore.game.meta['White']} - ${gameViewerStore.game.meta['Black']} (${gameViewerStore.game.meta['Result']})`
    : 'Game'

  const actionBar = (
    <div className="action-bar">
      <div className="left">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link
              to={location.pathname
                .replace('/' + gamebaseUuid, '')
                .replace('/' + uuid, '')}
            >
              <DatabaseOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link
              to={location.pathname.replace(
                '/' + uuid,
                ''
              )}
            >
              <BarsOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{breadcrumbText}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="right" />
    </div>
  )

  if (gameViewerStore.loading) {
    return (
      <div className="game-viewer inner">
        {actionBar}
        <Divider className="below-action-bar" />
        <div className="container">
          <States type="loading" />
        </div>
      </div>
    )
  }

  // TODO: Update GameReader to expose errors
  // if (this.props.gameViewerStore.error) {
  //   return (
  //     <div className="game-viewer inner">
  //       {actionBar}
  //       <Divider className="below-action-bar" />
  //       <div className="container"><States type="error" exceptionText="Error loading the game" onClick={this.handleRetry} /></div>
  //     </div>
  //   )
  // }

  const keyMap = {
    prevMove: 'left',
    nextMove: 'right'
  }

  const handlers = {
    prevMove: gameViewerStore.prev,
    nextMove: gameViewerStore.next
  }

  return (
    <HotKeys className="game-viewer" handlers={handlers} keyMap={keyMap}>
      {actionBar}
      {renderGame()}
    </HotKeys>
  )
})