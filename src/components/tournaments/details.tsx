import { useContext, useEffect, useRef } from 'react'
import { Row, Col, Table, Spin } from 'antd'
import { DataStatus, TournamentViewStore } from '../../stores/tournament-view'
import { MobXProviderContext } from 'mobx-react'
import moment from 'moment'
import { AcademyStore } from '../../stores/academy'


export const Details = ()=>{
  const tournamentDecription: any = useRef()
  const {tournamentViewStore, academyStore} = useContext(MobXProviderContext)
  
  useEffect(()=>{
    academyStore!.load()
    if (tournamentDecription.current) {
      tournamentDecription.current.innerHTML = tournamentViewStore!.tournament.description
    }
  })

  function dateFormat(date: any) {
    return moment(date).format('YYYY-MM-DD')
  }

  const handleDownloadTournamentPgn = () => () => {
    tournamentViewStore!.downloadTournamentPgn()
  }

  function renderContent() {
    const columns = [
      {
        title: 'Round',
        dataIndex: 'round',
        key: 'round'
      },
      {
        title: 'Starts at',
        dataIndex: 'starts_at',
        key: 'starts_at',
        render(text: string, record: any) {
          return `${record.date} ${record.start_time} `
        }
      }
    ]

    return (
      <div>
        <Row className="detail-section">
          <Col md={2} sm={24}>
            Description
          </Col>
          <Col md={22} sm={24}>
            <div ref={tournamentDecription}></div>
          </Col>
        </Row>
        <Row className="detail-section">
          <Col md={2} sm={24}>
            Time Control
          </Col>
          <Col md={22} sm={24}>
            {`${tournamentViewStore!.tournament.time_control} minutes
            ${
              tournamentViewStore!.tournament.time_increment
            } seconds`}
          </Col>
        </Row>
        <Row className="detail-section">
          <Col md={2} sm={24}>
            Rounds
          </Col>
          <Col md={22} sm={24}>
            {tournamentViewStore!.tournament.rounds}
          </Col>
        </Row>
        <Row className="detail-section">
          <Col md={2} sm={24}>
            Duration
          </Col>
          <Col md={22} sm={24}>
            {`${dateFormat(
              tournamentViewStore!.tournament.start_date
            )} - ${dateFormat(
              tournamentViewStore!.tournament.end_date
            )}`}
          </Col>
        </Row>
        <Row className="detail-section">
          <Col md={2} sm={24}>
            PGN File
          </Col>
          <Col md={22} sm={24}>
            <a onClick={handleDownloadTournamentPgn()}>Download</a>
          </Col>
        </Row>
        <Row className="detail-section">
          <Col md={2} sm={24}>
            DBF File
          </Col>
          <Col md={22} sm={24}>
            <a href="#">Download</a>
          </Col>
        </Row>
        <Row className="detail-section">
          <Col md={2} sm={24}>
            Schedule
          </Col>
          <Col md={22} sm={24}>
            <Table
              columns={columns}
              dataSource={tournamentViewStore!.tournament.schedule}
            ></Table>
          </Col>
        </Row>
      </div>
    )
  }

  return tournamentViewStore!.detailStatus ==
      DataStatus.LOADING ? (
      <div className="flex-center">
        <Spin />
      </div>
    ) : (
      renderContent()
    )
}
