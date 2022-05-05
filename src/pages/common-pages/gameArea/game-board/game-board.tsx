import React, { Component, useContext, useEffect } from 'react'
import ReactResizeDetector from 'react-resize-detector'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import { SyncedGameStore } from '../../../../stores/synced-game'
import {
  Card,
  Row,
  Button,
  Modal,
  Col,
  notification,
  Popconfirm,
  Spin
} from 'antd'

import './game-board.less'

interface Props {
  gameId: any
}

const GameBoard = (props: Props)=>{
  const {syncedGameStore, userStore} = useContext(MobXProviderContext)

  const handleAcceptDraw = () => {
    console.log('Accepted Draw')
    syncedGameStore!.acceptDraw()
  }

  const openDrawNotification = () => {
    const key = `draw`
    const btn = (
      <div>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            notification.close(key)
            syncedGameStore!.setIsDrawOffered(false)
            handleAcceptDraw()
          }}
        >
          Accept Draw
        </Button>
        
        <Button
          style={{ marginLeft: 8 }}
          danger
          size="small"
          onClick={() => {
            notification.close(key)
            syncedGameStore!.setIsDrawOffered(false)
          }}
        >
          Decline
        </Button>
      </div>
    )
    notification.open({
      message: 'Opponent requested a draw',
      description: '',
      placement: 'topRight',
      btn,
      key,
      onClose: () => {
        syncedGameStore!.setIsDrawOffered(false)
      }
    })
  }

  useEffect(()=>{
    syncedGameStore!.initGame(props.gameId)
    autorun(() => {
      if (syncedGameStore!.isDrawOffered) {
        openDrawNotification()
        console.log('Clearing draw request after notification')
        // this.props.syncedGameStore!.setDrawRequest(false)
      }
    })
  })

  useEffect(()=>{
    syncedGameStore!.initGame(props.gameId)
  }, [props.gameId])

  const onMove = (orig: string, dest: string, metadata: any) => {
    // this.props.syncedGameStore!.makeMoveAndPublish(orig, dest)
    syncedGameStore!.makeMove(orig, dest, metadata)
    return {}
  }

  const onFenUpdate = (fen: any) => {
    // console.log('Fen update ', fen)
    // this.props.syncedGameStore!.publishFen(fen)
  }

  const handleOnReturn = () => {
    syncedGameStore!.clearCurrentGame()
  }

  const onModalClose = () => {
    syncedGameStore!.setResultModalVisiblity(false)
  }

  const handleOnRematch = () => {
    syncedGameStore!.offerRematch()
  }

  var topTimer = null
  var bottomTimer = null

  if (syncedGameStore!.playerColor == 'white') {
    topTimer = (
      <TimerComponent
        time={syncedGameStore!.blackTimeInSeconds}
        name={syncedGameStore!.opponentName}
      />
    )
    bottomTimer = (
      <TimerComponent
        name={syncedGameStore!.playerName}
        time={syncedGameStore!.whiteTimeInSeconds}
      />
    )
  } else {
    topTimer = (
      <TimerComponent
        time={syncedGameStore!.whiteTimeInSeconds}
        name={syncedGameStore!.opponentName}
      />
    )
    bottomTimer = (
      <TimerComponent
        time={syncedGameStore!.blackTimeInSeconds}
        name={syncedGameStore!.playerName}
      />
    )
  }

  var resignButton = (
    <Popconfirm
      title="Are you sure?"
      onConfirm={syncedGameStore!.resignGame}
      okText="Yes"
      cancelText="No"
      placement="bottom"
    >
      <Button type="primary" block>
        Resign
      </Button>
    </Popconfirm>
  )

  var abortButton = (
    <Button
      type="primary"
      onClick={syncedGameStore!.abortGame}
      block
    >
      Abort
    </Button>
  )

  var refreshButton = (
    <Button type="primary" onClick={() => window.location.reload()} block>
      Refresh
    </Button>
  )

  var topPanel
  if (!syncedGameStore!.isGameOver) {
    topPanel = (
      <Row
        className="gameboard-top-panel"
        justify="space-between"
      >
        <Col span={7} className="gameboard-top-panel-column">
          {refreshButton}
        </Col>
        <Col span={7} className="gameboard-top-panel-column">
          {syncedGameStore!.shouldShowAbort
            ? abortButton
            : resignButton}
        </Col>
        <Col span={7} className="gameboard-top-panel-column">
          <Button
            type="primary"
            onClick={syncedGameStore!.offerDraw}
            block
          >
            Draw
          </Button>
        </Col>
      </Row>
    )
  } else {
    topPanel = (
      <Row
        className="gameboard-top-panel"
        justify="space-between"
      >
        <Col span={11} className="gameboard-top-panel-column">
          <Button type="primary" onClick={handleOnReturn} block>
            Return
          </Button>
        </Col>
        {!syncedGameStore!.isTournamentModeOn && (
          <Col span={11} className="gameboard-top-panel-column">
            <Button type="primary" onClick={handleOnRematch} block>
              Rematch
            </Button>
          </Col>
        )}
      </Row>
    )
  }

  return (
    <div className="game-board">
      <div className="game-wrapper">
        {topPanel}
        {topTimer}
        <Spin spinning={syncedGameStore!.loading}>
          <ChessgroundBoard
            onMove={onMove}
            fen={syncedGameStore!.fen}
            turnColor={syncedGameStore!.playerColor}
            orientation={syncedGameStore!.playerColor}
            movable={syncedGameStore!.dests}
            lastMove={syncedGameStore!.lastMove}
          />
        </Spin>
        {bottomTimer}
        <div
          style={{
            marginRight: '12px',
            textAlign: 'right',
            fontSize: '24px',
            color:
              syncedGameStore!.connectionStatus === 'connected'
                ? 'green'
                : 'red'
          }}
        >
          {syncedGameStore!.connectionStatus}
        </div>
      </div>
      {syncedGameStore!.resultModalVisiblity && (
        <Modal
          visible={syncedGameStore!.resultModalVisiblity}
          title={syncedGameStore!.result.text}
          onCancel={onModalClose}
          footer={[
            <Button key="return" type="primary" onClick={onModalClose}>
              Close
            </Button>
          ]}
        >
          <Row
            style={{
              fontSize: 32
            }}
          >
            <Col span={24}>{syncedGameStore!.formattedResult}</Col>
          </Row>
        </Modal>
      )}
    </div>
  )

}

import { autorun } from 'mobx'
import { formatTime } from '../../../../utils/utils'
import ChessgroundBoard from '../../../../components/chessgroundboard/ChessgroundBoard'

interface TimerProps {
  name: String
  time: number
}

const TimerComponent = (props: TimerProps)=>{
  return (
    <div
      style={{
        display: 'flex',
        marginLeft: 12,
        marginRight: 12,
        fontSize: 32
      }}
    >
      <div className="text-ellipsis" style={{ flex: 1 }}>
        {props.name}
      </div>
      <div>{formatTime(props.time)}</div>
    </div>
  )
}

export default GameBoard
