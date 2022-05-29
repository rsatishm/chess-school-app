import React, { Component, useContext } from 'react'
import { Table, Tabs, List, Skeleton, Avatar, Spin } from 'antd'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import { TournamentViewStore, DataStatus } from '../../stores/tournament-view'
import _ from 'lodash'
import { getFormattedName } from '../../utils/utils'
import Title from 'antd/lib/typography/Title'

const { TabPane } = Tabs

export const Rankings = () => {
  const { tournamentViewStore } = useContext(MobXProviderContext)
  function renderContent() {
    return (
      <div>
        <Tabs
          defaultActiveKey={`${tournamentViewStore!.latestRound}`}
          type="card"
        >
          {renderRankings()}
        </Tabs>
      </div>
    )
  }

  const renderRanking = (item: any) => {
    return (
      <List.Item>
        <Skeleton avatar title={false} loading={false}>
          <List.Item.Meta
            avatar={
              <Avatar
                style={{
                  backgroundColor: 'gray',
                  verticalAlign: 'middle'
                }}
                size="large"
              >
                {item.rank}
              </Avatar>
            }
            title={item.name}
            description={`Points ${item.points}  |  Sno ${item.sno}`}
          />
        </Skeleton>
      </List.Item>
    )
  }

  const renderRankings = () => {
    const roundRankingsMap = _.groupBy(
      tournamentViewStore!.tournament.rankings,
      'round'
    )

    return _.toPairs(roundRankingsMap).map(([round, roundRankings]: any) => {
      const groupRankingsMap = _.groupBy(roundRankings, 'groupNo')

      return (
        <TabPane tab={`Round ${round}`} key={round}>
          {_.map(groupRankingsMap, (groupRankings: any, groupNo: any) => {
            return (
              <div className="mb-4">
                {groupNo != 'null' && (
                  <Title level={3}>Section {groupNo}</Title>
                )}
                <List
                  key={groupNo}
                  loading={false}
                  itemLayout="horizontal"
                  dataSource={sortRankings(groupRankings)}
                  renderItem={renderRanking}
                />
              </div>
            )
          })}
        </TabPane>
      )
    })
  }

  function sortRankings(rankings: any) {
    return rankings.map((ranking: any, index: number) => {
      return {
        key: ranking.player_uuid,
        rank: index + 1,
        groupNo: ranking.groupNo,
        sno: ranking.sno,
        name: getFormattedName(ranking),
        points: ranking.cumulativeScore,
        tb_1: '0',
        tb_2: '0',
        tb_3: '0'
      }
    })
  }

  return tournamentViewStore!.rankingStatus ==
    DataStatus.LOADING ? (
    <div className="flex-center">
      <Spin />
    </div>
  ) : (
    renderContent()
  )
}