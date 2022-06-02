import * as React from 'react'
import * as R from 'ramda'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import { toJS } from 'mobx'
import { Collapse, Button } from 'antd'

import './assignment-details.less'

import { StudentsGroupsStore } from '../../../../../stores/students-groups'
import { CoachAssignmentCompletionDetailsStore } from '../../../../../stores/coach-assignment-completion-details'
import { ProblemsList } from '../../exercise/problems-list/problems-list'
import { ExceptionOutlined, LoadingOutlined } from '@ant-design/icons'

interface Props {
  assignment: any
}

interface State { }

export const AssignmentDetails = observer((props: Props) => {
  const { studentsGroupsStore, coachAssignmentCompletionDetailsStore } = React.useContext(MobXProviderContext)
  React.useEffect(() => {
    studentsGroupsStore!.load()
    coachAssignmentCompletionDetailsStore!.load(props.assignment.uuid)
  })
  const handleRetry = () => {
    studentsGroupsStore!.load()
    coachAssignmentCompletionDetailsStore!.load(props.assignment.uuid)
  }

  // Extract the list of unique students and groups
  const getStudents = (studentUuids: string[], groupUuids: string[]) => {
    const studentUuidsInGroups = R.chain(
      uuid => studentsGroupsStore!.groups[uuid].userIds,
      groupUuids
    )
    const allStudentUuids = R.uniq(R.concat(studentUuids, studentUuidsInGroups))
    return R.map(
      uuid => studentsGroupsStore!.students[uuid as string],
      allStudentUuids
    )
  }

  const getDetailsForStudent = (
    studentUuid: string,
    completionDetails: any[],
    totalCount: number
  ) => {
    const details = R.find(
      (d: any) => d.studentId === studentUuid,
      completionDetails
    )
    return R.reduce(
      (acc: any, d: any) => {
        const solvedCount =
          acc.solved +
          (R.find((ad: any) => ad.status === 'solved', d.attemptDetails)
            ? 1
            : 0)
        const lastAttempt = R.last(d.attemptDetails) as any
        const time =
          acc.time + (lastAttempt ? parseInt(lastAttempt.timeTaken) : 0)

        return {
          time,
          solved: solvedCount,
          total: totalCount,
          attempts: acc.attempts + d.attemptDetails.length,
          status:
            time === 0
              ? 'yet to start'
              : solvedCount === totalCount
                ? 'complete'
                : 'incomplete',
          problemDetails: acc.problemDetails
        }
      },
      {
        solved: 0,
        total: totalCount,
        time: 0,
        attempts: 0,
        status: 'yet-to-start',
        problemDetails: toJS((details && details.problemDetails) || [])
      },
      (details && details.problemDetails) || []
    )
  }

  const renderCompletionDetails = (
    assignment: any,
    completionDetails: any[],
    students: any[]
  ) => {
    return (
      <Collapse accordion={true}>
        {students.map(s => {
          const details = getDetailsForStudent(
            s.uuid,
            completionDetails,
            assignment.problemIds.length
          )
          const problemUuids = assignment.problemIds

          const header = (
            <div className="student-panel-header">
              <span className="name">
                {s.firstname + ', ' + s.lastname} ({s.username})
              </span>
              <div className="summary">
                <span className="solved">
                  <span className="bold">
                    {details.solved}/{details.total}
                  </span>{' '}
                  solved
                </span>
                <span className="time">
                  <span className="bold">{details.time}s</span> spent
                </span>
                <span className="attempts">
                  <span className="bold">{details.attempts}</span> attempts
                </span>
              </div>
              <span className={`status ${details.status}`}>
                {details.status.toUpperCase()}
              </span>
            </div>
          )

          return (
            <Collapse.Panel
              key={s.uuid}
              header={header}
              className={`assignment-attempt-panel status-${details.status}`}
            >
              <ProblemsList
                problemUuids={problemUuids}
                problemDetails={details.problemDetails}
              />
            </Collapse.Panel>
          )
        })}
      </Collapse>
    )
  }

  if (
    studentsGroupsStore!.loading ||
    !coachAssignmentCompletionDetailsStore!.content[
    props.assignment.uuid
    ] ||
    coachAssignmentCompletionDetailsStore!.content[
      props.assignment.uuid
    ].loading
  ) {
    return (
      <div className="assignment-details container">
        <LoadingOutlined spin={true} />
      </div>
    )
  }

  if (
    studentsGroupsStore!.error ||
    coachAssignmentCompletionDetailsStore!.content[
      props.assignment.uuid
    ].error
  ) {
    return (
      <div className="error-state container">
        <ExceptionOutlined />
        <p className="exception-text">
          {studentsGroupsStore!.error ||
            coachAssignmentCompletionDetailsStore!.content[
              props.assignment.uuid
            ].error}
        </p>
        <span className="action-text">
          <Button danger size="small" onClick={handleRetry}>
            Retry
          </Button>
        </span>
      </div>
    )
  }

  const students = R.sortBy(
    (s: any) => s.firstname,
    getStudents(
      props.assignment.studentIds,
      props.assignment.groupIds
    )
  )

  return (
    <div className="assignment-details">
      {renderCompletionDetails(
        props.assignment,
        coachAssignmentCompletionDetailsStore!.content[
          props.assignment.uuid
        ].data,
        students
      )}
    </div>
  )
})