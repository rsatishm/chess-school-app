import React, { Component, useContext, useEffect, useState } from 'react'
import {
  Layout,
  Steps,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Tree,
  message,
  Table,
  TimePicker,
  Popconfirm,
  Modal,
  Divider,
  Spin
} from 'antd'
import { CreateTournamentFormStore } from '../../../stores/create-tournament-form'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { SetupChessboard } from '../../../components/chessboard/setup-chessboard'
import './create-tournament-form.less'
import moment from 'moment-timezone'
import { StudentsGroupsStore } from '../../../stores/students-groups'
import { ConfiguredChessboard } from '../../../components/chessboard/configured-chessboard'
import { DEFAULT_FEN } from '../../../utils/utils'
import { RatingSystemStore } from '../../../stores/rating-system'
import { AcademyStore } from '../../../stores/academy'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'antd/es/form/Form'
import { ChessTypes } from '../../../types'
import { LoadingOutlined } from '@ant-design/icons'


const { TreeNode } = Tree


export const CreateTournamentForm = observer(() => {
  const { uuid } = useParams()
  const { createTournamentFormStore } = useContext(MobXProviderContext)
  useEffect(() => {
    if (uuid) {
      createTournamentFormStore.load(uuid)
    }
    return () => createTournamentFormStore.init()
  })

  const steps = [
    {
      title: 'Details',
      content: <TournamentDetailsStep />
    },
    {
      title: 'Schedule',
      content: <ScheduleStep />
    },
    {
      title: 'Participants',
      content: <PartipantsStep />
    }
  ]

  return (
    <Layout.Content className="content create-tournament-form">
      <Spin spinning={createTournamentFormStore!.loading}>
        <div className="inner">
          <h1>
            {createTournamentFormStore!.isEditing
              ? 'Edit tournament'
              : 'Create new tournament'}
          </h1>
          <Row>
            <Col offset={6} span={12}>
              <Steps
                current={createTournamentFormStore.currentStep}
              >
                {steps.map(item => (
                  <Steps.Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </Col>
          </Row>

          <Row style={{ padding: '1rem 0' }}>
            <Col span={24}>
              {
                steps[createTournamentFormStore.currentStep]
                  .content
              }
            </Col>
          </Row>
        </div>
      </Spin>
    </Layout.Content>
  )
})

interface TournamentDetailsStepState {
  // moves: String
  modalState: string
  selectedDatabase: { uuid: string; name: string }
  setupPositionModalVisible: boolean
  setupPositionFen: ChessTypes.FEN
  orientation: string
  gameType: string
}

const TournamentDetailsStep = observer(() => {
  const { createTournamentFormStore, ratingSystemStore, academyStore } = useContext(MobXProviderContext)
  const [state, setState] = useState<TournamentDetailsStepState>({
    modalState: 'HIDDEN',
    selectedDatabase: { uuid: '', name: '' },
    setupPositionModalVisible: false,
    setupPositionFen: '',
    orientation: 'white',
    gameType: 'standard'
    // moves: []
  })
  const updateState = (newState: Partial<TournamentDetailsStepState>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  useEffect(() => {
    academyStore.load().then(() => {
      ratingSystemStore.loadAcademyRatingSystems()
    })
    createTournamentFormStore!.loadBookOpenings()
  })
  const [form] = useForm()
  const handleSubmit = (event: any) => {
    event.preventDefault()
    form.validateFields().then((values: any) => {
      createTournamentFormStore.setTournamentDetails(values)
      createTournamentFormStore.generateSchedule()
      createTournamentFormStore.gotoScheduleStep()
    })
  }

  const greaterThanOrEqualTo = (minValue: number) => {
    return (rule: any, value: number, callback: any) => {
      if (value && value < minValue) {
        callback(`Field value must be at least ${minValue}`)
      } else {
        callback()
      }
    }
  }

  const handleSetupPosition = () => {
    updateState({
      setupPositionModalVisible: true,
      setupPositionFen: createTournamentFormStore!.initialFen
    })
  }

  const handleSetupPositionCancel = () => {
    updateState({
      setupPositionModalVisible: false,
      setupPositionFen: ''
    })
  }

  const handleSetupPositionOk = () => {
    createTournamentFormStore!.setInitialFen(
      state.setupPositionFen
    )
    updateState({
      setupPositionModalVisible: false
    })
  }

  const handleSetupPositionFenChange = (fen: any) => {
    updateState({
      setupPositionFen: fen
    })
  }

  const handleFenChange = (e: any) => {
    createTournamentFormStore!.setInitialFen(e.target.value)
  }

  const handleBookFenChange = (fen: any) => {
    createTournamentFormStore!.setInitialFen(fen)
  }

  const validateFen = (_: any, value: string, callback: Function) => {
    const isValid: any = createTournamentFormStore!.isValidFen(value)
    if (isValid.valid === false) {
      callback(isValid.error)
      return
    }
    callback()
  }


  const setStandardFen = () => {
    if (state.gameType === 'standard') {
      const fen = DEFAULT_FEN
      createTournamentFormStore!.setInitialFen(fen)
    }
  }
  const gameTypes = [
    {
      type: 'standard',
      title: 'Standard'
    },
    {
      type: 'book_opening',
      title: 'Book Opening'
    },
    {
      type: 'custom_fen',
      title: 'Custom FEN'
    }
  ]

  useEffect(() => {
    setStandardFen()
  }, [state.gameType])

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="Tournament name"
        initialValue={createTournamentFormStore.tournamentDetails.name || ''}
        rules={[{ required: true }]}>
        <Input placeholder="Tournament name" />
      </Form.Item>
      <Form.Item
        name='description'
        label="Description"
        initialValue={createTournamentFormStore.tournamentDetails}>
        <ReactQuill />
      </Form.Item>
      <Row>
        <Col span={8}>
          <Form.Item
            name="time_range"
            label="Choose date range"
            labelAlign="left"
            initialValue={createTournamentFormStore
              .tournamentDetails.time_range || [moment(), moment()]}
            rules={[{ required: true }]}>
            <DatePicker.RangePicker
              format="YYYY-MM-DD"
              placeholder={['Start Date', 'End Date']}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="start_time"
            label="Choose start time ( HH:MM )"
            labelAlign="left"
            initialValue={moment(
              createTournamentFormStore.tournamentDetails
                .start_time,
              'HH:mm'
            )}
            rules={[{ required: true }]}>
            <TimePicker format="HH:mm" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="timezone"
            label="Timezone"
            initialValue={createTournamentFormStore.tournamentDetails
              .timezone || 'Asia/Kolkata'}
            rules={[{ required: true }]}>
            <Select
              showSearch
              filterOption={(input, option: any) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {moment.tz.names().map(tz => {
                return (
                  <Select.Option key={tz} value={tz}>
                    {tz}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          <Form.Item
            name="rating_system_id"
            label="Rating System"
            style={{ paddingRight: 8 }}
            initialValue={createTournamentFormStore.tournamentDetails
              .rating_system_id || null}>
            <Select>
              <Select.Option value={null}>Unrated</Select.Option>
              {ratingSystemStore.ratingSystems.map((rs: any) => (
                <Select.Option key={rs.id} value={rs.id}>
                  {rs.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="rounds"
            label="Number of rounds"
            style={{ paddingRight: 8 }}
            initialValue={createTournamentFormStore.tournamentDetails
              .rounds || '1'}
            rules={[
              {
                required: true
              },
              {
                validator: greaterThanOrEqualTo(1)
              },
            ]}>
            <Input placeholder="Number of rounds" type="number" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name='time_control'
            label="Time Control ( minutes )"
            style={{ paddingRight: 8 }}
            initialValue={createTournamentFormStore.tournamentDetails
              .time_control || 10}
            rules={[
              {
                required: true,
                message: 'Time Control is required'
              },
              {
                validator: greaterThanOrEqualTo(2)
              }
            ]}
          >
            <Input placeholder="Time Control" type="number" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name='time_increment'
            label="Time Increment per move ( seconds )"
            style={{ paddingRight: 8 }}
            initialValue={createTournamentFormStore.tournamentDetails
              .time_increment || 3}
            rules={[
              { required: true, message: 'Time Increment is required' },
              {
                validator: greaterThanOrEqualTo(0)
              }
            ]}
          >
            <Input placeholder="Time Increment" type="number" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={3}>
          <Form.Item
            name='game_type'
            label="Game type"
            style={{ marginRight: 8 }}
            initialValue={createTournamentFormStore.initialFen != DEFAULT_FEN
              ? 'custom_fen'
              : 'standard'}
            rules={[{ required: true }]}>
            <Select
              onChange={type =>
                updateState({ gameType: type.toString() })
              }
            >
              {gameTypes.map(({ type, title }) => (
                <Select.Option key={type} value={type}>
                  {title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {state.gameType === 'custom_fen' && (
          <Col span={10}>
            <Form.Item
              name='custom_fen'
              label="FEN:"
              initialValue={createTournamentFormStore.initialFen}
              rules={[
                {
                  required: true,
                  message: 'Valid FEN required'
                },
                {
                  validator: validateFen
                }
              ]}>
              <Input
                style={{ display: 'block' }}
                onChange={handleFenChange}
              />
            </Form.Item>
          </Col>
        )}

        {state.gameType === 'book_opening' && (
          <Col span={10}>
            <Form.Item
              name='openings'
              label="Book Openings"
              initialValue=''
              rules={[{ required: true }]}>
              <Select
                onChange={handleBookFenChange}
                showSearch
                filterOption={(input, option: any) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {createTournamentFormStore.bookOpenings.map(
                  ({ name, fen }: any) => {
                    return (
                      <Select.Option key={name} value={fen}>
                        {name}
                      </Select.Option>
                    )
                  }
                )}
              </Select>
            </Form.Item>
          </Col>
        )}
        <Col
          span={9}
          style={{
            padding: '5px',
            verticalAlign: 'middle',
            marginTop: '30px'
          }}
        >
          <ConfiguredChessboard
            fen={createTournamentFormStore.initialFen}
            width={150}
            height={150}
            interactionMode="NONE"
          />
          {state.gameType != 'standard' && (
            <Button
              onClick={handleSetupPosition}
              style={{ width: 150, top: 5 }}
            >
              Setup Chessboard
            </Button>
          )}
        </Col>
      </Row>
      {state.setupPositionModalVisible && (
        <Modal
          title="Setup Position"
          visible={state.setupPositionModalVisible}
          style={{ top: 25 }}
          width={800}
          maskClosable={false}
          onCancel={handleSetupPositionCancel}
          onOk={handleSetupPositionOk}
        >
          <div className="position-setup-modal" title="Setup Position">
            <SetupChessboard
              width={550}
              height={550}
              initialFen={state.setupPositionFen as ChessTypes.FEN}
              onChange={handleSetupPositionFenChange}
            />
          </div>
        </Modal>
      )}
      <Form.Item>
        <Button
          style={{ marginTop: '1rem' }}
          type="primary"
          htmlType="submit"
        >
          Next
        </Button>
      </Form.Item>
    </Form>
  )
})

const EditableContext = React.createContext({})

interface EditableCellProps {
  inputType: string
}

const EditableCell = (props: EditableCellProps) => {
  const getInput = () => {
    if (props.inputType === 'datepicker') {
      return <DatePicker />
    } else if (props.inputType === 'timepicker') {
      return <TimePicker format="HH:mm" />
    }
    return <Input />
  }

  const renderCell = ({ getFieldDecorator }: any) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    }: any = props
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              initialValue: formatFieldValue(record[dataIndex], inputType)
            })(getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    )
  }

  function formatFieldValue(value: any, type: string) {
    if (type == 'datepicker') {
      return moment(value)
    } else if (type == 'timepicker') {
      return moment(value, 'HH:mm:ss')
    }
  }

  return (
    <EditableContext.Consumer>{renderCell}</EditableContext.Consumer>
  )
}

interface EditableTableState {
  editingKey: string
}

const EditableTable = observer(() => {
  const { createTournamentFormStore } = useContext(MobXProviderContext)
  const [state, setState] = useState<EditableTableState>({
    editingKey: ''
  })
  const updateState = (newState: Partial<EditableTableState>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  const isEditing = ({ key }: any) => key === state.editingKey

  const cancel = () => {
    updateState({ editingKey: '' })
  }

  function save(form: any, key: string) {
    form.validateFields((error: any, row: any) => {
      if (error) {
        return
      }
      const newData = [...createTournamentFormStore.schedule]
      const index = newData.findIndex(item => key === item.key)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          start_time: row.start_time.format('hh:mm'),
          date: row.date.format('DD MMM, YYYY')
        })
        createTournamentFormStore.schedule = newData
        updateState({ editingKey: '' })
      }
    })
  }

  function edit(key: string) {
    updateState({ editingKey: key })
  }
  let columns = [
    {
      title: 'Round',
      dataIndex: 'round',
      key: 'round'
    },
    {
      key: 'date',
      title: 'Date',
      dataIndex: 'date',
      onCell: (record: any) => ({
        record,
        inputType: 'datepicker',
        title: 'Date',
        dataIndex: 'date',
        editing: isEditing(record)
      })
    },
    {
      key: 'start_time',
      title: 'Start Time',
      dataIndex: 'start_time',
      onCell: (record: any) => ({
        record,
        inputType: 'timepicker',
        title: 'Start Time',
        dataIndex: 'start_time',
        editing: isEditing(record)
      })
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text: any, record: any) => {
        const { editingKey } = state
        const editable = isEditing(record)
        console.log({ editable })
        return editable ? (
          <span>
            <EditableContext.Consumer>
              {form => (
                <a
                  onClick={() => save(form, record.key)}
                  style={{ marginRight: 8 }}
                >
                  Save
                </a>
              )}
            </EditableContext.Consumer>
            <Divider type="vertical" />
            <Popconfirm title="Sure to cancel?" onConfirm={() => cancel()}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Button
            disabled={editingKey !== ''}
            onClick={() => edit(record.key)}
          >
            Edit
          </Button>
        )
      }
    }
  ]
  const components = {
    body: {
      cell: EditableCell
    }
  }

  return (
    <Table
      components={components}
      dataSource={createTournamentFormStore.schedule}
      columns={columns}
    />
  )
})

const ScheduleStep = observer(() => {
  const { createTournamentFormStore } = useContext(MobXProviderContext)

  const handleBufferMinutesChange = (ev: any) => {
    createTournamentFormStore.setBufferMinutes(ev.target.value)
  }

  const handleGenerateSchedule = () => {
    createTournamentFormStore.generateSchedule()
  }

  return (
    <div>
      {/* <Row className="detail-section" type="flex" align="middle">
        <Col md={4} sm={24}>
          Buffer Time
        </Col>
        <Col md={4} sm={24}>
          <Input
            type="number"
            addonAfter="minutes"
            value={this.props.createTournamentFormStore.bufferMinutes}
            onChange={this.handleBufferMinutesChange}
          />
        </Col>
        <Col md={4} sm={24}>
          <Button
            type="primary"
            style={{ marginLeft: '1rem' }}
            onClick={this.handleGenerateSchedule}
          >
            Generate Schedule
          </Button>
        </Col>
      </Row> */}
      <Row
        className="detail-section"
        style={{ marginTop: '1rem' }}
        align="middle"
      >
        <Col md={4} sm={24} flex={1}>
          Schedule
        </Col>
        <Col md={20} sm={24} flex={1}>
          <EditableTable />
        </Col>
      </Row>
      <Row>
        <Col md={4} sm={24}>
          <Button
            style={{ marginRight: '.25rem' }}
            onClick={createTournamentFormStore.gotoDetailsStep}
          >
            Previous
          </Button>
          <Button
            type="primary"
            style={{ marginRight: '.25rem' }}
            onClick={
              createTournamentFormStore.gotoParticipantsStep
            }
          >
            Next
          </Button>
        </Col>
      </Row>
    </div>
  )
})

const PartipantsStep = observer(() => {
  const { createTournamentFormStore, studentsGroupsStore } = useContext(MobXProviderContext)
  useEffect(() => {
    studentsGroupsStore.load()
  })

  const navigate = useNavigate()

  const upsert = async () => {
    if (createTournamentFormStore.participants.length < 2) {
      return message.info('At least 2 participants are required')
    }

    const response = createTournamentFormStore!.isEditing
      ? await createTournamentFormStore.update()
      : await createTournamentFormStore.create()

    if (response.status != 200) {
      return message.error(
        'Error while creating/editing tournament. Please try again later.'
      )
    }

    navigate('/app/tournaments/' + response.data.uuid)
  }

  const onCheck = (checkedKeys: any) => {
    createTournamentFormStore.setCheckedKeys(checkedKeys)
  }

  function loadingDisplay() {
    return (
      <div className={'loadingOverlay'} style={{ height: 500 }}>
        <LoadingOutlined />
      </div>
    )
  }

  function renderStudentTree(students: any) {
    return students.map((s: any) => (
      <TreeNode
        title={`${s.firstname}, ${s.lastname} (${s.username})`}
        key={`student-${s.uuid}`}
      ></TreeNode>
    ))
  }

  return (
    <div>
      {studentsGroupsStore.loading && loadingDisplay()}

      {!studentsGroupsStore.loading && (
        <>
          <Tree
            className="participants-section"
            checkable
            onCheck={onCheck}
            defaultCheckedKeys={
              createTournamentFormStore!.checkedKeys
            }
          >
            <TreeNode title="Groups" key="groups">
              {studentsGroupsStore.groups &&
                Object.values(studentsGroupsStore.groups).map(
                  (g: any) => (
                    <TreeNode title={g.name} key={`group-${g.uuid}`}>
                      {renderStudentTree(
                        g.userIds
                          .map(
                            (id: string) =>
                              studentsGroupsStore.students[id]
                          )
                          .filter((s: any) => s != null)
                      )}
                    </TreeNode>
                  )
                )}
            </TreeNode>
            <TreeNode title="All students" key="all">
              {studentsGroupsStore.students &&
                renderStudentTree(
                  Object.values(studentsGroupsStore.students)
                )}
            </TreeNode>
          </Tree>

          <Button
            style={{ marginRight: '.25rem' }}
            onClick={createTournamentFormStore.gotoScheduleStep}
          >
            Previous
          </Button>
          <Button
            type="primary"
            loading={createTournamentFormStore!.loading}
            onClick={upsert}
          >
            {createTournamentFormStore!.isEditing
              ? 'Save'
              : 'Create'}
          </Button>
        </>
      )}
    </div>
  )
})