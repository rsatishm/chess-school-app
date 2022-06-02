import * as React from 'react'
import * as R from 'ramda'
import { message, Button, Drawer, Form, Select, DatePicker } from 'antd'
import moment, { Moment } from 'moment'
import { inject, MobXProviderContext, observer } from 'mobx-react'

import './assign-exercise-drawer.less'
import { useState } from 'react'
import { useForm } from 'antd/es/form/Form'
import { ExceptionOutlined, LoadingOutlined } from '@ant-design/icons'

const TODAY_MOMENT = moment()

interface Props {
  visible: boolean
  onClose: () => any
  exerciseUuid: string
  problemUuids: string[]
}

interface State {
  confirmDirty: boolean
  formFields: {
    students: string[]
    scheduleDate: Moment
    deadlineDate: Moment
  }
}

export const AssignExerciseDrawer = observer((props: Props) => {
  const { studentsGroupsStore, coachAssignmentStore } = React.useContext(MobXProviderContext)
  const [state, setState] = useState<State>({
    confirmDirty: false,
    formFields: {
      students: [],
      scheduleDate: moment.utc(TODAY_MOMENT),
      deadlineDate: moment.utc(TODAY_MOMENT).add(10, 'days')
    }
  })
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  React.useEffect(() => {
    studentsGroupsStore!.load()
  })
  const [form] = useForm()
  const handleCancelClick = () => {
    props.onClose()
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    form.validateFields().then(async (values: any) => {
      // Expand groupIds manually (TODO: backend fix for accepting groupIds)
      const [studentUuids, groupUuids] = R.partition(
        uuid => studentsGroupsStore!.students[uuid],
        form.getFieldValue('students')
      )
      const studentUuidsFromGroups = R.chain(
        uuid => studentsGroupsStore!.groups[uuid].userIds,
        groupUuids
      )

      const startDate = form.getFieldValue('scheduleDate')
      const deadline = form.getFieldValue('deadlineDate')
        ? form.getFieldValue('deadlineDate')
        : moment.utc(startDate).add(10, 'days')

      const data = {
        assignedAt: moment.utc(TODAY_MOMENT).format('YYYY-MM-DD'),
        deadline: deadline.format('YYYY-MM-DD'),
        startDate: startDate.format('YYYY-MM-DD'),
        exerciseId: props.exerciseUuid,
        problemIds: props.problemUuids,
        studentIds: R.uniq(
          R.concat(studentUuids, studentUuidsFromGroups)
        ) as string[]
      }

      const success = await coachAssignmentStore!.submit(data)
      if (success) {
        message.success('Created assignment successfully.')
        props.onClose()
      } else {
        message.error('Failed to create assignment.')
      }
    })
  }

  const handleConfirmBlur = (e: any) => {
    const value = e.target.value
    updateState({ confirmDirty: state.confirmDirty || !!value })
  }

  const isDateInPast = (date?: Moment) => {
    if (!date) {
      return false
    }

    return date.isBefore(TODAY_MOMENT)
  }

  const studentSelectFilterOption = (inputValue: string, option: any) => {
    return (
      option.props.children
        .toString()
        .toLowerCase()
        .indexOf(inputValue.toLowerCase()) >= 0
    )
  }

  const validateDeadline = (_: any, value: Moment, callback: Function) => {
    if (!value) {
      callback()
    } else {
      const scheduleDate = form.getFieldValue('scheduleDate') as Moment
      if (!scheduleDate || scheduleDate.isBefore(value)) {
        callback()
      } else {
        callback('Deadline must be greater than visible from date.')
      }
    }
  }

  const renderSubmittingState = () => {
    return (
      <div className="drawer-inner">
        <div className="title">
          <h3>Assign Exercise</h3>
        </div>
        <div className="content">
          <div className="loading-state container">
            <LoadingOutlined spin={true} />
            <p className="exception-text">Submitting</p>
          </div>
        </div>
        <div className="button-bar">
          <Button className="cancel-button" onClick={props.onClose}>
            Close
          </Button>
          <Button type="primary" disabled={true}>
            Submit
          </Button>
        </div>
      </div>
    )
  }

  // TODO: Be a bit more careful about the global state of the coachAssignmentStore
  const renderSubmitErrorState = () => {
    return (
      <div className="drawer-inner">
        <div className="title">
          <h3>Assign Exercise</h3>
        </div>
        <div className="content">
          <div className="error-state container">
            <ExceptionOutlined />
            <p className="exception-text">Error submitting assignment.</p>
            <span className="action-text">
              <Button danger onClick={handleSubmit}>
                Retry
              </Button>
            </span>
          </div>
        </div>
        <div className="button-bar">
          <Button className="cancel-button" onClick={props.onClose}>
            Close
          </Button>
          <Button type="primary" disabled={true}>
            Submit
          </Button>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    if (coachAssignmentStore!.submitting) {
      return renderSubmittingState()
    }

    if (coachAssignmentStore!.submitError) {
      return renderSubmitErrorState()
    }

    const formContent = (() => {
      if (studentsGroupsStore!.loading) {
        return (
          <>
            <LoadingOutlined spin={true} />
            <h3>Loading</h3>
          </>
        )
      }

      if (studentsGroupsStore!.error) {
        return (
          <div className="error-state">
            <ExceptionOutlined />
            <h3>{studentsGroupsStore!.error}</h3>
          </div>
        )
      }

      return (
        <Form form={form} className="create-exercise-form" onFinish={handleSubmit}>
          <Form.Item
            name='students'
            rules={[
              {
                required: true,
                message: 'At least one student/group must be selected'
              }
            ]}>
            <Select
              mode="multiple"
              placeholder="Students and Groups"
              filterOption={studentSelectFilterOption}
            >
              <Select.OptGroup key="students" label="Students">
                {R.values(studentsGroupsStore!.students).map(
                  (s: any) => (
                    <Select.Option key={s.uuid} value={s.uuid}>
                      {s.firstname + ', ' + s.lastname} ({s.username})
                    </Select.Option>
                  )
                )}
              </Select.OptGroup>
              <Select.OptGroup key="groups" label="Groups">
                {R.values(studentsGroupsStore!.groups).map(
                  (g: any) => (
                    <Select.Option key={g.uuid} value={g.uuid}>
                      {g.name}
                    </Select.Option>
                  )
                )}
              </Select.OptGroup>
            </Select>
          </Form.Item>
          <Form.Item
            extra="The exercise will be visible to the student only from this date."
            initialValue={TODAY_MOMENT}
            rules={[
              {
                type: 'object'
              }
            ]}>
            <DatePicker
              style={{ width: '100%' }}
              placeholder="Visible From"
              disabledDate={isDateInPast}
            />
          </Form.Item>
          <Form.Item
            name='deadlineDate'
            extra="The student will not be able to solve the exercise after this date. Leave the field blank to grant 10 days by default"
            rules={[
              {
                type: 'object'
              },
              {
                validator: validateDeadline
              }
            ]}>
            <DatePicker
              style={{ width: '100%' }}
              placeholder="Deadline"
              allowClear={true}
              disabledDate={isDateInPast}
            />
          </Form.Item>
        </Form>
      )
    })()

    return (
      <div className="drawer-inner">
        <div className="title">
          <h3>Assign Exercise</h3>
        </div>
        <div className="content">{formContent}</div>
        <div className="button-bar">
          <Button className="cancel-button" onClick={handleCancelClick}>
            Cancel
          </Button>
          <Button
            type="primary"
            disabled={studentsGroupsStore!.loading}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Drawer
      className="assign-exercise-drawer"
      width={450}
      placement="right"
      onClose={props.onClose}
      maskClosable={false}
      closable={false}
      visible={props.visible}
    >
      {renderContent()}
    </Drawer>
  )
})