import React, { Component, useContext, useEffect } from 'react'
import { LiveGamePreviewStore } from '../../stores/live-game-preview'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import { Row, Col } from 'antd'
import './live-game-preview.less'
import { ConfiguredChessboard } from '../chessboard/configured-chessboard'
import {
  getTimeInSeconds,
  formatTime,
  formattedResult2
} from '../../utils/utils'

interface LiveGamePreviewProps {
  tournamentId: string
  round: number
}

export const LiveGamePreview = (props: LiveGamePreviewProps)=>{
  const {liveGamePreviewStore} = useContext(MobXProviderContext)
  useEffect(()=>{
    liveGamePreviewStore!.unsub()
    liveGamePreviewStore!.sub(
      props.tournamentId,
      props.round
    )
    return ()=>liveGamePreviewStore!.unsub()
  }, [props.round, props.tournamentId])

  const renderGames = () => {
    return liveGamePreviewStore!.games.map(
      (game: any, index: number) => {
        return <GamePreview game={game} key={index} />
      }
    )
  }

  return <div className="live-game-preview">{renderGames()}</div>
}

interface GamePreviewProps {
  game: any
}

export const GamePreview = (props: GamePreviewProps)=>{
  function renderPlayerInfo(
    playerSide: string,
    playerName: string,
    playerTime: number,
    turn: string
  ) {
    return (
      <Row>
        <Col className="text-ellipsis" span={20}>
          {`${playerSide == turn ? '*' : ''} ${playerName}`}
        </Col>
        <Col className="text-right" span={4}>
          {formatTime(getTimeInSeconds(playerTime))}
        </Col>
      </Row>
    )
  }

  const {
    board_no,
    white_name,
    black_name,
    white_time,
    black_time,
    turn,
    fen
  } = props.game

  if (props.game.turn !== null) {
    return (
      <div className="game-container">
        <div>Board {board_no}</div>
        {renderPlayerInfo('black', black_name, black_time, turn)}
        <div className="live-game-board">
          <ConfiguredChessboard
            fen={fen}
            width={300}
            height={300}
            interactionMode="NONE"
          />
        </div>
        {renderPlayerInfo('white', white_name, white_time, turn)}
        <div className="text-bold text-center">
          {formattedResult2(
            props.game.white_score,
            props.game.black_score
          )}
        </div>
      </div>
    )
  } else {
    return null
  }
}
