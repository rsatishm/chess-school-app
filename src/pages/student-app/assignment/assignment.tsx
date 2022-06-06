import * as React from 'react'
import * as R from 'ramda'
import moment from 'moment'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import {
  Layout,
  Input,
  Button,
  Select,
  Divider,
  Tag,
  Modal,
  Row,
  Col
} from 'antd'

import { StudentAssignmentStore } from '../../../stores/student-assignment'
import { ProblemsSolve } from './problems-solve/problems-solve'

import './assignment.less'
import { CaretDownOutlined, CaretUpOutlined, CloseOutlined, ExceptionOutlined, FlagOutlined, LoadingOutlined } from '@ant-design/icons'
import { SolvedStatus } from './solved-status/solved-status'

const { Content } = Layout
const { Option } = Select

interface State {
  sortBy: string
  search: string
  problemSolveModalVisible: boolean
  assignmentToSolve: any
  problemUuids: string[]
}

export const Assignment = observer(()=>{
  const {studentAssignmentStore} = React.useContext(MobXProviderContext)
  const [state, setState] = React.useState<State>({
    sortBy: 'assignedAt_desc',
    search: '',
    problemSolveModalVisible: false,
    assignmentToSolve: null,
    problemUuids: []
  })
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  React.useEffect(()=>{
    studentAssignmentStore!.load()

    document
      .querySelector('meta[name="viewport"]')!
      .setAttribute('content', 'width=device-width, initial-scale=1.0')
      return ()=>document.querySelector('meta[name="viewport"]')!.setAttribute('content', '')
  }, [])

  const handleSolveAssignment = (assignmentUuid: any) => {
    const assignment: any = R.find(
      ({ uuid }) => uuid === assignmentUuid,
      studentAssignmentStore!.assignments
    )
    updateState({
      assignmentToSolve: assignment,
      problemUuids: assignment.problemIds,
      problemSolveModalVisible: true
    })
  }

  const sortAssignments = (sortBy: string, assignments: any[]) => {
    const [sortByKey, dir] = sortBy.split('_')

    const sortedList = (() => {
      if (sortByKey === 'name') {
        return R.sortBy((a: any) => a.exercise.name, assignments)
      }

      if (sortByKey === 'assignedAt') {
        return R.sortBy(
          (a: any) => moment.utc(a.assignedAt).valueOf(),
          assignments
        )
      }

      if (sortByKey === 'deadline') {
        return R.sortBy(
          (a: any) => (a.deadline ? moment.utc(a.deadline).valueOf() : 0),
          assignments
        )
      }

      return R.sortBy(a => a[sortByKey], assignments)
    })()

    return dir === 'desc' ? R.reverse(sortedList) : sortedList
  }

  const filterAssignments = (search: string, assignments: any[]) => {
    return R.filter(
      (a: any) =>
        a.exercise.name.toLowerCase().indexOf(search.toLowerCase()) >= 0,
      assignments
    )
  }

  const renderErrorState = () => {
    return (
      <div className="error-state container">
        <ExceptionOutlined />
        <p className="exception-text">
          {studentAssignmentStore!.error}.
        </p>
        <span className="action-text">
          <Button
            danger
            onClick={studentAssignmentStore!.load}
          >
            Retry
          </Button>
        </span>
      </div>
    )
  }

  const renderLoadingState = () => {
    return (
      <div className="loading-state container">
        <LoadingOutlined spin={true} />
        <p className="exception-text">Loading</p>
      </div>
    )
  }

  const renderBlankState = () => {
    return (
      <div className="blank-state container">
        <FlagOutlined />
        <p className="exception-text">
          You have not been assigned any exercises at the moment.
        </p>
      </div>
    )
  }

  const renderLevelTag = (difficultyLevel: string) => {
    if (difficultyLevel === 'easy') {
      return (
        <Tag className="difficulty-tag" color="green">
          Beginner
        </Tag>
      )
    }

    if (difficultyLevel === 'medium') {
      return (
        <Tag className="difficulty-tag" color="blue">
          Intermediate
        </Tag>
      )
    }

    if (difficultyLevel === 'hard') {
      return (
        <Tag className="difficulty-tag" color="red">
          Advanced
        </Tag>
      )
    }
  }

  const renderAssignedAt = (assignedAt: string) => {
    return moment.utc(assignedAt).format('DD-MM-YYYY')
  }

  const renderAssignments = (assignments: any[]) => {
    if (assignments.length === 0) {
      return (
        <div className="blank-state container">
          <FlagOutlined />
          <p className="exception-text">
            No assignments found for the search criteria
          </p>
        </div>
      )
    }
    return (
      <div className="assignment-list">
        {assignments.map(e => {
          return (
            <Row className="assignment-item" key={e.uuid}>
              <Col md={{ span: 6 }} sm={24}>
                <div className="name">
                  {e.exercise.name}
                  <span className="count">({e.problemIds.length})</span>
                </div>

                <div className="tags-container">
                  {e.exercise.tags.map((t: string) => (
                    <Tag className="exercise-tag" key={t}>
                      {t}
                    </Tag>
                  ))}
                </div>
                <span className="description">{e.exercise.description}</span>

                <span className="created">
                  Deadline - {renderAssignedAt(e.deadline)}
                </span>
              </Col>
              <Col md={4} sm={24}>
                <SolvedStatus
                  assignmentUuid={e.uuid}
                  onClick={handleSolveAssignment}
                  totalProblemCount={e.problemIds.length}
                />
              </Col>
            </Row>
          )
        })}
      </div>
    )
  }

  const handleSortByChange = (sortBy: any) => {
    updateState({ sortBy } as State)
  }

  const handleSearchChange = (event: any) => {
    updateState({ search: event.target.value })
  }

  function renderAssignmentPage() {
    if (studentAssignmentStore!.error) {
      return renderErrorState()
    }
    if (studentAssignmentStore!.loading) {
      return renderLoadingState()
    }
    const assignments = studentAssignmentStore!.assignments
    return (
      <>
        {assignments.length > 0 ? (
          <>
            {/* refactor action bar */}
            <div className="action-bar right">
              <span>Sort by &nbsp;</span>
              <Select
                className="select-sort-by"
                defaultValue={state.sortBy}
                value={state.sortBy}
                size="small"
                style={{ width: 160 }}
                onChange={handleSortByChange}
              >
                <Option value="assignedAt">
                  <CaretUpOutlined style={{ fontSize: 10 }} /> Assigned
                  Date
                </Option>
                <Option value="assignedAt_desc">
                  <CaretDownOutlined style={{ fontSize: 10 }} /> Assigned
                  Date
                </Option>
                <Option value="deadline">
                  <CaretUpOutlined style={{ fontSize: 10 }} /> Deadline
                  Date
                </Option>
                <Option value="deadline_desc">
                  <CaretDownOutlined style={{ fontSize: 10 }} /> Deadline
                  Date
                </Option>
                <Option value="name">
                  <CaretUpOutlined style={{ fontSize: 10 }} /> Name
                </Option>
                <Option value="name_desc">
                  <CaretDownOutlined style={{ fontSize: 10 }} /> Name
                </Option>
              </Select>
              <Input.Search
                placeholder="Search"
                className="assignments-search"
                style={{ width: 200 }}
                size="small"
                value={state.search}
                onChange={handleSearchChange}
              />
            </div>

            <Divider className="below-action-bar" />
            {renderAssignments(
              sortAssignments(
                state.sortBy,
                filterAssignments(state.search, assignments)
              )
            )}
          </>
        ) : (
          renderBlankState()
        )}
      </>
    )
  }

  const handleproblemSolveModalCancel = () => {
    updateState({ problemSolveModalVisible: false })
    if (state.assignmentToSolve) {
      studentAssignmentStore!.loadCompletionDetails(
        state.assignmentToSolve.uuid
      )
    }
  }

  return (
    <Content className="content">
      <div className="assignment inner">{renderAssignmentPage()}</div>
      <div
        className={`modal ${
          state.problemSolveModalVisible ? 'show' : 'hide'
        }`}
      >
        <div className="modal-content modal-lg">
          <CloseOutlined
            className="close-btn"
            type="close"
            onClick={handleproblemSolveModalCancel}
          />
          {state.problemSolveModalVisible && (
            <ProblemsSolve
              assignment={state.assignmentToSolve}
              problemUuids={state.problemUuids}
            />
          )}
        </div>
      </div>
    </Content>
  )
})