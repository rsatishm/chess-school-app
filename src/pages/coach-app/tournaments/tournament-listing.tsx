import React, { Component, useContext, useEffect } from 'react'
import { Layout, Row, Col, Button, Table, List, Skeleton, message } from 'antd'
import { CoachTournamentStore } from '../../../stores/coach-tournaments'
import { observer, inject, MobXProviderContext } from 'mobx-react'
import moment from 'moment-timezone'

import './tournament-listing.less'
import { Link, useNavigate } from 'react-router-dom'

export const TournamentListing = observer(() => {
  const { coachTournamentStore } = useContext(MobXProviderContext)
  const navigate = useNavigate()
  useEffect(() => {
    coachTournamentStore!.load()
  }, [])
  const handleView = (record: any) => {
    navigate(`/app/tournaments/${record.uuid}`)
  }

  const handleEdit = async (record: any) => {
    // TODO: complete
    if (record.status === 'UPCOMING') {
      navigate(`/app/tournaments/${record.uuid}/edit`)
    } else {
      const currentStage: any = []
      /*(
        await Firebase.firestore()
          .collection('tournaments')
          .doc(record.uuid)
          .get()
      ).data()*/
      if (currentStage.player_status === 'INVITED') {
        navigate(`/app/tournaments/${record.uuid}/edit`)
      } else {
        message.error('Cannot edit as the players have been finalized')
      }
    }
  }

  const handleDelete = (record: any) => {
    coachTournamentStore!.delete(record.uuid)
  }

  const renderTournament = (item: any) => {
    let actions = [
      <Button
        type="primary"
        style={{ margin: 4 }}
        onClick={() => handleView(item)}
      >
        View
      </Button>
    ]

    if (item.status != 'PAST') {
      actions.push(
        <Button style={{ margin: 4 }} onClick={() => handleEdit(item)}>
          Edit
        </Button>
      )
    }
    actions.push(
      <Button
        danger
        style={{ margin: 4 }}
        onClick={() => handleDelete(item)}
      >
        Delete
      </Button>
    )

    return (
      <List.Item actions={actions}>
        <Skeleton title={false} loading={false}>
          <List.Item.Meta
            title={
              <Link to={`/app/tournaments/${item.uuid}`}>
                {item.name} ({item.time_control} + {item.time_increment})
              </Link>
            }
            description={`${item.rounds} rounds • starts ${moment(
              item.start_date
            ).format('YYYY-MM-DD')}`}
          />
        </Skeleton>
      </List.Item>
    )
  }

  return (
    <Layout.Content className="content tournaments">
      <div className='header'>
        <p className="title"><span className='cursor-pointer'>Tournaments</span></p>
        <Button type='primary'>
            <Link to="/app/tournaments/create">Create Tournament</Link>
          </Button>
      </div>
      <div className="inner">
        <div className="tournaments-section">
          <h2>Current Tournaments</h2>
          <List
            loading={false}
            itemLayout="horizontal"
            dataSource={coachTournamentStore!.currentTournaments}
            renderItem={renderTournament}
          />
        </div>

        <div className="tournaments-section">
          <h2>Upcoming Tournaments</h2>
          <List
            loading={false}
            itemLayout="horizontal"
            dataSource={coachTournamentStore!.upcomingTournments}
            renderItem={renderTournament}
          />
        </div>

        <div className="tournaments-section">
          <h2>Past Tournaments</h2>
          <List
            loading={false}
            itemLayout="horizontal"
            dataSource={coachTournamentStore!.pastTournaments}
            renderItem={renderTournament}
          />
        </div>
      </div>
    </Layout.Content>
  )
})