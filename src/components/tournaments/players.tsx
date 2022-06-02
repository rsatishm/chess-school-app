import { useContext } from 'react'
import { List, Skeleton, Avatar, Spin } from 'antd'
import { MobXProviderContext, observer } from 'mobx-react'
import { DataStatus } from '../../stores/tournament-view'
import _ from 'lodash'
import Title from 'antd/lib/typography/Title'

export const Players = observer(()=>{
  const {tournamentViewStore} = useContext(MobXProviderContext)
  const renderPlayer = (item: any) => {
    console.log("players key " + item.uuid + "-" + item.sno)
    return (
      <List.Item key={item.uuid}>
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
                {item.sno}
              </Avatar>
            }
            title={`${item.name}`}
            description={
              <div>
                <span
                  style={{
                    color: item.playerStatus == 'JOINED' ? 'green' : 'blue'
                  }}
                >
                  {item.playerStatus}
                </span>
                {tournamentViewStore!.tournament
                  .rating_system_id && (
                  <span>&nbsp;|&nbsp;RATING: {item.rating || 'Unrated'}</span>
                )}
              </div>
            }
          />
        </Skeleton>
      </List.Item>
    )
  }

  const groupPlayersMap = _.groupBy(
    tournamentViewStore!.players,
    'groupNo'
  )

  return tournamentViewStore!.detailStatus ==
    DataStatus.LOADING ? (
    <div className="flex-center">
      <Spin />
    </div>
  ) : (
    _.map(groupPlayersMap, (groupPlayers: any, groupNo: any) => {
      return (
        <div className="mb-4">
          {groupNo != 'null' && <Title level={3}>Section {groupNo}</Title>}

          <List
          key={groupNo}
            loading={false}
            itemLayout="horizontal"
            dataSource={groupPlayers}
            renderItem={renderPlayer}
          />
        </div>
      )
    })
  )
})