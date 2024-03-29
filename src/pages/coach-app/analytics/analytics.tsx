import { Component, useContext, useEffect, useState } from 'react'
import { Layout, Row, Col, Button, DatePicker } from 'antd'
import './analytics.less'
import { Select } from 'antd'
import { observer, inject, MobXProviderContext } from 'mobx-react'
import { Table } from 'antd'
import { AnalyticsStore } from '../../../stores/analytics'
import moment from 'moment'
import { Menu, Dropdown } from 'antd'
import { States } from '../../../components/states/states'
import _ from 'lodash'
import { end } from 'chessground/drag'

const { RangePicker } = DatePicker
const { Content } = Layout
const { Option } = Select

interface State {
  startDate: string
  endDate: string
  group: string
}

function fix(x: any) {
  if (isNaN(parseInt(x)) || x == null) {
    return '-'
  }
  return x
}

export const Analytics = observer(() => {
  const { analyticsStore } = useContext(MobXProviderContext)
  let sampledata: { key: string; name: string; age: number; address: string }[] = []
  let columns: any = [
    {
      title: 'Name',
      dataIndex: 'firstname',
      sorter: (a: any, b: any) => {
        if (a.firstname.toLowerCase() > b.firstname.toLowerCase()) return 1
        else return -1
      },
      sortDirections: ['descend', 'ascend'],
      render: (text: any, record: any) =>
        // converts to title case
        _.startCase(_.toLower(record['firstname'] + ' ' + record['lastname']))
    },
    {
      title: 'Total Assignments',
      dataIndex: 'total_assignments',
      sorter: (a: any, b: any) => a.total_assignments - b.total_assignments,
      sortDirections: ['descend', 'ascend'],
      render: (text: any) => fix(text)
    },
    {
      title: 'Total Assignments Attempted',
      dataIndex: 'total_assignments_attempted',
      sorter: (a: any, b: any) =>
        a.total_assignments_attempted - b.total_assignments_attempted,
      sortDirections: ['descend', 'ascend'],
      render: (text: any) => fix(text)
    },
    {
      title: 'Total Problems Assigned',
      dataIndex: 'total_problems',
      sorter: (a: any, b: any) => a.total_problems - b.total_problems,
      sortDirections: ['descend', 'ascend'],
      render: (text: any) => fix(text)
    },
    {
      title: 'Total Problems Attempted',
      dataIndex: 'total_problems_attempted',
      sorter: (a: any, b: any) =>
        a.total_problems_attempted - b.total_problems_attempted,
      sortDirections: ['descend', 'ascend'],
      render: (text: any) => fix(text)
    },
    {
      title: 'Total Problems Solved',
      dataIndex: 'total_problems_solved',
      sorter: (a: any, b: any) =>
        a.total_problems_solved - b.total_problems_solved,
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'descend',
      render: (text: any) => fix(text)
    },
    {
      title: 'Average Attempts Per Problem',
      dataIndex: 'average_attempts',
      sorter: (a: any, b: any) => a.average_attempts - b.average_attempts,
      sortDirections: ['descend', 'ascend'],
      render: (text: any) => fix(text)
    },
    {
      title: 'Average Time Per Problem ( seconds )',
      dataIndex: 'average_time_taken',
      sorter: (a: any, b: any) => a.average_time_taken - b.average_time_taken,
      sortDirections: ['descend', 'ascend'],
      render: (text: any) => fix(text)
    }
  ]
  const [state, setState] = useState<State>({
    startDate: '',
    endDate: '',
    group: 'all'
  })
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  const onChange = async (value: any, dateString: any) => {
    updateState({
      startDate: dateString[0],
      endDate: dateString[1]
    })
    await analyticsStore!.load(dateString[0], dateString[1])
  }
  const dayClick = async () => {
    let startDate = moment()
      .subtract(1, 'day')
      .format('YYYY-MM-DD')
    let endDate = moment().format('YYYY-MM-DD')
    updateState({
      startDate: startDate,
      endDate: endDate
    })
    await analyticsStore!.load(startDate, endDate)
  }
  const weekClick = async () => {
    let startDate = moment()
      .subtract(1, 'week')
      .format('YYYY-MM-DD')
    let endDate = moment().format('YYYY-MM-DD')
    updateState({
      startDate: startDate,
      endDate: endDate
    })
    await analyticsStore!.load(startDate, endDate)
  }
  const monthClick = async () => {
    let startDate = moment()
      .subtract(1, 'month')
      .format('YYYY-MM-DD')
    let endDate = moment().format('YYYY-MM-DD')
    updateState({
      startDate: startDate,
      endDate: endDate
    })
    await analyticsStore!.load(startDate, endDate)
  }
  const allClick = async () => {
    let startDate = moment()
      .subtract(10, 'year')
      .format('YYYY-MM-DD')
    let endDate = moment().format('YYYY-MM-DD')
    updateState({
      startDate: startDate,
      endDate: endDate
    })
    await analyticsStore!.load(startDate, endDate)
  }

  const onGroupChange = async (value: string) => {
    updateState({
      group: value
    })
    await analyticsStore!.load(
      state.startDate,
      state.endDate,
      value
    )
  }
  async function loadAnalytics(startDate: string, endDate: string) {
    await updateState({
      startDate,
      endDate
    })
    await analyticsStore!.loadGroups()
    await analyticsStore!.load(startDate, endDate)
  }

  useEffect(() => {
    let startDate = moment()
      .subtract(1, 'week')
      .format('YYYY-MM-DD')
    let endDate = moment()
      .add(1, 'day') // to make sure current date is included
      .format('YYYY-MM-DD')

    // let startDate = '2018-01-01'
    // let endDate = '2019-01-01'

    loadAnalytics(startDate, endDate)
  }, [])

  let analytics = analyticsStore!
  if (analytics.loading) {
    return (
      <Content className="academy content">
        <div className="inner">
          <States type="loading" />
        </div>
      </Content>
    )
  } else {
    return (
      <Content className="analytics content">
        <div className="inner">
          <div className="analyticsContainer">
            <Row>
              <Col>
                <p style={{ fontSize: '32px' }}>Leader Board</p>
              </Col>
              <Col span={24} className="top-panel">
                <span className="label">Group</span>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  optionFilterProp="children"
                  placeholder={state.group}
                  onChange={onGroupChange}
                  className="select"
                >
                  {analytics.groups.map((ele: any, index: number) => {
                    return (
                      <Option value={ele} key={index}>
                        {ele}
                      </Option>
                    )
                  })}
                </Select>
                <span className="label">Date</span>
                <RangePicker
                  format="YYYY-MM-DD"
                  placeholder={[state.startDate, state.endDate]}
                  onChange={onChange}
                  className="select"
                />
                <Button type="link" onClick={dayClick}>
                  1d
                </Button>
                <Button type="link" onClick={weekClick}>
                  1w
                </Button>
                <Button type="link" onClick={monthClick}>
                  1m
                </Button>
                <Button type="link" onClick={allClick}>
                  All
                </Button>
              </Col>
              <Col span={12} />
            </Row>

            {/* <div className="analytics-card-container">
              <ChartCard
                title="Total Assignments"
                className="analytics-chartcard"
                action={
                  <Tooltip title="Total number of assignments assigned by the coach in the given period">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(
                  analytics.analyticsData['total_assignments']
                ).format('0,0')}
                contentHeight={46}
              />
            </div>
            <div className="analytics-card-container">
              <ChartCard
                title="Total Problems"
                className="analytics-chartcard"
                action={
                  <Tooltip title="Total number of problems assigned by the coach in the given period">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(
                  analytics.analyticsData['total_problems']
                ).format('0,0')}
                contentHeight={46}
              />
            </div>
            <div className="analytics-card-container">
              <ChartCard
                title="Total Students"
                className="analytics-chartcard"
                action={
                  <Tooltip title="Total number of students under a coach for the given period">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(
                  analytics.analyticsData['total_students']
                ).format('0,0')}
                contentHeight={46}
              />
            </div>
            <div className="analytics-card-container">
              <ChartCard
                title="Assignment Started"
                className="analytics-chartcard"
                action={
                  <Tooltip title="Total number of students who started the assignments">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(
                  analytics.analyticsData['total_started']
                ).format('0,0')}
                contentHeight={46}
              />
            </div>
            <div className="analytics-card-container">
              <ChartCard
                title="Total Problems Attempted"
                className="analytics-chartcard"
                action={
                  <Tooltip title="Total number of problems which have been attempted in the given period">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(
                  analytics.analyticsData['total_attempts']
                ).format('0,0')}
                contentHeight={46}
              />
            </div>
            <div className="analytics-card-container">
              <ChartCard
                title="Total Solved Problems"
                className="analytics-chartcard"
                action={
                  <Tooltip title="Total number of problems which have been solved in the given period">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(
                  analytics.analyticsData['total_solved_problems']
                ).format('0,0')}
                contentHeight={46}
              />
            </div>
            <div className="analytics-card-container">
              <ChartCard
                title="Total Unsolved Problems"
                className="analytics-chartcard"
                action={
                  <Tooltip title="Total number of problems which have been unsolved in the given period">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(
                  analytics.analyticsData['total_unsolved_problems']
                ).format('0,0')}
                contentHeight={46}
              />
            </div>
            <div className="analytics-card-container">
              <ChartCard
                title="Total Time Taken (hrs.)"
                className="analytics-chartcard"
                action={
                  <Tooltip title="Total time spent by the students in attempting the problems in the given period">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={numeral(
                  analytics.analyticsData['total_time_taken']
                ).format('0,0')}
                contentHeight={46}
              />
            </div> */}
            <Table
              className="analytics-table"
              columns={columns}
              dataSource={analytics.analyticsData['table_data']}
            />
          </div>
        </div>
      </Content>
    )
  }
})