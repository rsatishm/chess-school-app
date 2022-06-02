import { useContext, useEffect } from 'react'
import { Layout, Button, List, Skeleton } from 'antd'
import { StudentTournamentStore } from '../../../stores/student-tournaments'
import { MobXProviderContext, observer } from 'mobx-react'
import moment from 'moment-timezone'

import './tournaments.less'
import { Link, useNavigate } from 'react-router-dom'

interface Props {
  studentTournamentStore?: StudentTournamentStore
}

export const StudentTournaments = observer((props: Props)=>{
  const navigate = useNavigate()
  const {studentTournamentStore} = useContext(MobXProviderContext)
  
  const handleJoinTournament = (record: any) => {
    studentTournamentStore!.joinTournament(record.uuid)
  }

  const handleExitTournament = (record: any) => {
    studentTournamentStore!.exitTournament(record.uuid)
  }

  const handleView = (record: any) => {
    console.log("open tournament " + record.uuid)
    navigate(`/app/tournaments/${record.uuid}`)
  }

  useEffect(()=>{
    console.log("Load tournaments")
    studentTournamentStore!.load()
  })

  const  renderTournament = (item: any) => {
    const actionButton = (
      <Button type="primary" onClick={() => handleView(item)}>
        View
      </Button>
    )
    // const actionButton =
    //   item.playerStatus == 'JOINED' ? (
    //     <Button
    //       disabled={actionDisabled}
    //       type="danger"
    //       onClick={() => this.handleExitTournament(item)}
    //     >
    //       Exit
    //     </Button>
    //   ) : null
    //  (
    //   <Button
    //     disabled={actionDisabled}
    //     type="primary"
    //     onClick={() => this.handleJoinTournament(item)}
    //   >
    //     Join
    //   </Button>
    // )

    return (
      <List.Item actions={[actionButton]}>
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
  console.log("render tournaments")
  console.log("tournaments: " + studentTournamentStore!.pastTournaments)
  return (
    <Layout.Content className="content tournaments">
      <div className="inner">
        <h1>Tournaments</h1>

        <div className="tournaments-section">
          <h2>Current Tournaments</h2>
          <List
            loading={false}
            itemLayout="horizontal"
            dataSource={studentTournamentStore!.currentTournaments}
            renderItem={renderTournament}
          />
        </div>

        <div className="tournaments-section">
          <h2>Upcoming Tournaments</h2>
          <List
            loading={false}
            itemLayout="horizontal"
            dataSource={studentTournamentStore!.upcomingTournments}
            renderItem={renderTournament}
          />
        </div>

        <div className="tournaments-section">
          <h2>Past Tournaments</h2>
          <List
            loading={false}
            itemLayout="horizontal"
            dataSource={studentTournamentStore!.pastTournaments}
            renderItem={renderTournament}
          />
        </div>
      </div>
    </Layout.Content>
  )
})