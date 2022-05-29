import React, { Component, useContext, useState } from 'react'
import { Tabs, List, Skeleton, Avatar, Spin } from 'antd'
import { observer, inject, MobXProviderContext } from 'mobx-react'
import { TournamentViewStore, DataStatus } from '../../stores/tournament-view'
import { Link } from 'react-router-dom'
import {
  getFormattedName,
  formattedResult2,
  DEFAULT_FEN
} from '../../utils/utils'
import { LiveGamePreviewStore } from '../../stores/live-game-preview'
import _ from 'lodash'
import Title from 'antd/lib/typography/Title'
import { ChessTypes } from '../../types'
import { EditResultModal } from './edit-result-modal'
import { RestartGameModal } from './restart-game-modal'

const { TabPane } = Tabs

interface State {
  selectedGameId: string
  resultModalVisible: boolean
  modalConfirmLoading: boolean
  restartModalVisible: boolean
  restartGameFen: ChessTypes.FEN
}

export const Pairings = () => {
  const [state, setState] = useState<State>({
    selectedGameId: '',
    resultModalVisible: false,
    modalConfirmLoading: false,

    restartModalVisible: false,
    restartGameFen: ''
  })

  const { tournamentViewStore, liveGamePreviewStore } = useContext(MobXProviderContext)

  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }

  function renderContent() {
    return (
      <div>
        <Tabs
          defaultActiveKey={`${tournamentViewStore!.latestRound}`}
          type="card"
        >
          {renderTabs()}
        </Tabs>
        <EditResultModal
          visible={state.resultModalVisible}
          confirmLoading={state.modalConfirmLoading}
          handleOk={handleEditResultOk}
          handleCancel={handleCancel}
        />
        <RestartGameModal
          visible={state.restartModalVisible}
          confirmLoading={state.modalConfirmLoading}
          handleOk={handleReplayGameOk}
          handleCancel={handleCancel}
          fen={state.restartGameFen}
        />
      </div>
    )
  }

  const handleEditResult = (gameId: any) => () => {
    updateState({
      resultModalVisible: true,
      selectedGameId: gameId
    })
  }

  const handleReplayGame = (gameId: string, fen: string) => async () => {
    // prioritize fen from live game
    const liveGame = liveGamePreviewStore!.games.find(
      (g: any) => g.gameId == gameId
    )

    if (liveGame != null) {
      updateState({
        restartModalVisible: true,
        selectedGameId: gameId,
        restartGameFen: liveGame.fen
      })
    } else {
      updateState({
        restartModalVisible: true,
        selectedGameId: gameId,
        restartGameFen: fen || DEFAULT_FEN
      })
    }
  }

  const handleDownloadPgn = (gameId: string, round: number) => async () => {
    tournamentViewStore!.downloadGame(gameId, round)
  }

  const handleEditResultOk = async (resultValue: string) => {
    updateState({
      modalConfirmLoading: true
    })

    await tournamentViewStore!.updatePairingResult(
      state.selectedGameId,
      resultValue
    )

    updateState({
      modalConfirmLoading: false,
      resultModalVisible: false,
      selectedGameId: ''
    })
  }

  const handleReplayGameOk = async (blackTime: number, whiteTime: number) => {
    updateState({
      modalConfirmLoading: true
    })

    console.log('Replaying game', state.selectedGameId)

    await tournamentViewStore!.replayGame(
      state.selectedGameId,
      blackTime,
      whiteTime
    )

    updateState({
      modalConfirmLoading: false,
      restartModalVisible: false,
      selectedGameId: ''
    })
  }

  const handleCancel = () => {
    updateState({
      modalConfirmLoading: false,
      resultModalVisible: false,
      restartModalVisible: false,
      selectedGameId: '',
      restartGameFen: ''
    })
  }

  const renderPairing = (item: any) => {
    const actions: any[] = []

    if (tournamentViewStore!.isTournamentOwner) {
      actions.push(
        <a onClick={handleEditResult(item.platform_game_uuid)}>Edit</a>
      )
      actions.push(
        <a onClick={handleReplayGame(item.platform_game_uuid, item.fen)}>
          Replay
        </a>
      )
    }

    if (item.game_uuid != null) {
      actions.push(
        <Link to={`/app/board?gameUuid=${item.game_uuid}`}>View game</Link>
      )
      // actions.push(
      //   <a
      //     onClick={this.handleDownloadPgn(item.platform_game_uuid, item.round)}
      //   >
      //     Download
      //   </a>
      // )
    }

    function formatName(player: any) {
      if (player == null) {
        return 'BYE'
      }
      return `${getFormattedName(player)}`
    }

    const title = `${formatName(item.white_player)} vs ${formatName(
      item.black_player
    )}`

    return (
      <List.Item actions={actions}>
        <Skeleton title={false} loading={false}>
          <List.Item.Meta
            avatar={
              <Avatar
                style={{
                  backgroundColor: 'gray',
                  verticalAlign: 'middle'
                }}
                size="large"
              >
                {item.board_no}
              </Avatar>
            }
            title={title}
            description={`Board ${item.board_no} | Result ${formattedResult2(
              item.white_score,
              item.black_score
            )} | ${item.result_status || ''}`}
          />
        </Skeleton>
      </List.Item>
    )
  }

  const renderTabs = () => {
    return _.map(
      tournamentViewStore!.tournament.pairings,
      (roundPairings: any, round: any) => {
        const roundPairingsSorted = _.orderBy(
          roundPairings,
          ['groupNo', 'board_no'],
          ['asc', 'asc']
        )

        const groupPairingsMap = _.groupBy(roundPairingsSorted, 'groupNo')

        return (
          <TabPane tab={`Round ${round}`} key={round}>
            {_.map(groupPairingsMap, (groupPairings: any, groupNo: any) => {
              return (
                <div className="mb-4">
                  {groupNo != 'null' && (
                    <Title level={3}>Section {groupNo}</Title>
                  )}
                  <List
                    key={groupNo}
                    loading={false}
                    itemLayout="vertical"
                    dataSource={groupPairings}
                    renderItem={renderPairing}
                  />
                </div>
              )
            })}
          </TabPane>
        )
      }
    )
  }

  return tournamentViewStore!.pairingStatus ==
    DataStatus.LOADING ? (
    <div className="flex-center">
      <Spin />
    </div>
  ) : (
    renderContent()
  )
}
