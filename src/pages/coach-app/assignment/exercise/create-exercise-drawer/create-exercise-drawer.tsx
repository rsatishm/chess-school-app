import * as React from 'react'
import {
  message,
  Modal,
  InputNumber,
  Button,
  Drawer,
  Form,
  Radio,
  Input,
  Select
} from 'antd'
import moment, { Moment } from 'moment'

import './create-exercise-drawer.less'

import { MobXProviderContext, observer } from 'mobx-react'
import { useForm } from 'antd/es/form/Form'
import { ExceptionOutlined, LoadingOutlined } from '@ant-design/icons'
import { ProblembaseDrawer } from '../problembase-drawer/problembase-drawer'
import Title from 'antd/lib/typography/Title'

const TODAY_MOMENT = moment()

const EXERCISE_TAGS = [
  'pin',
  'fork',
  'double attack',
  'double check',
  'discovered check',
  'inteference',
  'backrank',
  'clearance',
  'queen sacrifice',
  'overloaded piece',
  'pawn promotion',
  'skewer',
  'zugzwang',
  'blockade',
  'space clearance',
  'intermediate move',
  'x-ray attack',
  'defence elimination',
  'surprise move',
  'opening trap',
  'endgame study',
  'mate in one',
  'mate in two',
  'mate in three'
]

interface Props {
  visible: boolean
  onClose: () => any
}

interface State {
  showLimitExceededModal: boolean
  batchSize: number
  confirmDirty: boolean
  problembaseDrawerVisible: boolean
  selectedProblembaseUuid: string
  selectedProblemUuids: string[]
  selectedProblemUuidsError: string
  formFields: {
    name: string
    description: string
    level: string
    tags: string[]
    assignOnCreation: boolean
    students: string[]
    scheduleDate: Moment
    deadlineDate: Moment
  }
}

export const CreateExerciseDrawer = observer((props: Props)=>{
  const {exerciseStore} = React.useContext(MobXProviderContext)
  const MAX_BATCH_SIZE = 50
  const [state, setState] = React.useState<State>({
    showLimitExceededModal: false,
    batchSize: 20,
    confirmDirty: false,
    problembaseDrawerVisible: false,
    selectedProblembaseUuid: '',
    selectedProblemUuids: [],
    selectedProblemUuidsError: '',
    formFields: {
      name: '',
      description: '',
      level: '',
      tags: [],
      assignOnCreation: false,
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
  const [form] = useForm()
  
  /*
  React.useEffect(() => {
    console.log("state.problembaseDrawerVisible: " + state.problembaseDrawerVisible)
    if (!state.problembaseDrawerVisible) {
    form.resetFields()
    props.onClose()
    }
  }, [state.problembaseDrawerVisible])*/


  const handleCleanupAndClose = () => {
    updateState(
      {
        problembaseDrawerVisible: false,
        selectedProblembaseUuid: '',
        selectedProblemUuids: [],
        selectedProblemUuidsError: ''
      }      
    )
    form.resetFields()
    props.onClose()
  }

  const handleProblembaseDrawerClose = () => {
    updateState({
      problembaseDrawerVisible: false
    })
  }

  const handleAddProblemsClick = () => {
    updateState({
      problembaseDrawerVisible: true
    })
  }

  const handleSelectedProblemsChange = (uuids: string[]) => {
    updateState({
      selectedProblemUuids: uuids
    })
  }

  /*
  React.useEffect(    () => {
    if (state.selectedProblemUuidsError == '') {
    form.validateFields().then(
       (values: any) => {
        submitExercise()
      }
    )
    }
  }, [state.selectedProblemUuidsError])*/

  const submitExercise = async ()=>{
    const data = {
      name: form.getFieldValue('name'),
      description: form.getFieldValue('description'),
      tags: form.getFieldValue('tags'),
      problemIds: state.selectedProblemUuids,
      difficultyLevel: form.getFieldValue('level')
    }

    const success = await exerciseStore!.submit(data)
    if (success) {
      message.success('Created Exercise.')
      handleCleanupAndClose()
    } else {
      message.error('Failed to create exercise.')
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (
      state.selectedProblemUuids.length > 0 &&
      state.selectedProblemUuids.length <= MAX_BATCH_SIZE
    ) {
      updateState(
        {
          selectedProblemUuidsError: ''
        }
      )
    } else if (state.selectedProblemUuids.length > MAX_BATCH_SIZE) {
      form.validateFields().then((values: any) => {
        updateState({
          selectedProblemUuidsError: '',
          showLimitExceededModal: true
        })
      })
    } else {
      updateState({ selectedProblemUuidsError: 'Add a few problems' })
    }
  }

  const handleLimitExceededOk = async (e: any) => {
    updateState({ showLimitExceededModal: false })

    const name = form.getFieldValue('name')
    const description = form.getFieldValue('description')
    const tags = form.getFieldValue('tags')
    const difficultyLevel = form.getFieldValue('level')

    let success: any = true

    for (
      let i = 0;
      i * state.batchSize < state.selectedProblemUuids.length;
      i++
    ) {
      success &= await exerciseStore!.submit({
        name: `${name}-${i + 1}`,
        description,
        tags,
        problemIds: state.selectedProblemUuids.slice(
          state.batchSize * i,
          state.batchSize * (i + 1)
        ),
        difficultyLevel
      })
    }

    if (success) {
      message.success('Created Exercise.')
    } else {
      // TODO: Rollback when creation fails
      message.error('Failed to create exercise.')
    }

    handleCleanupAndClose()
  }

  const handleLimitExceededCancel = (e: any) => {
    updateState({ showLimitExceededModal: false })
  }

  const handleBatchSizeChange = (batchSize: number) => {
    updateState({ batchSize })
  }

  const handleConfirmBlur = (e: any) => {
    const value = e.target.value
    updateState({ confirmDirty: state.confirmDirty || !!value })
  }

  const renderSubmittingState = () => {
    return (
      <div className="drawer-inner">
        <div className="title">
          <h3>Create Exercise</h3>
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

  const renderSubmitErrorState = () => {
    return (
      <div className="drawer-inner">
        <div className="title">
          <h3>Create Exercise</h3>
        </div>
        <div className="content">
          <div className="error-state container">
            <ExceptionOutlined />
            <p className="exception-text">Error submitting exercise.</p>
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
    console.log("render create exercise content")
    if (exerciseStore!.submitting) {
      console.log("renderSubmittingState")
      return renderSubmittingState()
    }

    if (exerciseStore!.submitError) {
      console.log("renderSubmitErrorState")
      return renderSubmitErrorState()
    }

    const exerciseTagOptions = EXERCISE_TAGS.map(t => (
      <Select.Option key={t} value={t}>
        {t}
      </Select.Option>
    ))

    return (
      <div className="drawer-inner">
        <Modal
          title="Split exercise"
          visible={state.showLimitExceededModal}
          onOk={handleLimitExceededOk}
          onCancel={handleLimitExceededCancel}
        >
          {/* You have exceeded the max number of problems for an exercise (
          {this.MAX_BATCH_SIZE}). Would you like to split it into batches of */}
          We recommend splitting the exercise to less than {MAX_BATCH_SIZE}{' '}
          per batch. Would you like to split it into batches of
          <InputNumber
            style={{ width: '60px' }}
            className="batch-size"
            min={1}
            max={MAX_BATCH_SIZE}
            defaultValue={20}
            value={state.batchSize}
            onChange={handleBatchSizeChange}
          />{' '}
          ?
        </Modal>
        <div className="title">
          <h3>Create Exercise</h3>
        </div>
        <div className="content">
          <Form form={form} className="create-exercise-form">
            <Form.Item
            name='name'
            rules={ [
              {
                required: true,
                message: 'Name is required'
              }
            ]}>
              <Input placeholder="Name" autoComplete="false" />
            </Form.Item>
            <Form.Item
            name='description'>
                <Input.TextArea
                  rows={3}
                  placeholder="Description"
                  autoComplete="false"
                />
            </Form.Item>
            <Form.Item
            name='level'
            rules= {[
              {
                required: true,
                message: 'Level is required'
              }
            ]}>
                <Radio.Group size="large">
                  <Radio value="easy">Beginner</Radio>
                  <Radio value="medium">Intermediate</Radio>
                  <Radio value="hard">Advanced</Radio>
                </Radio.Group>
            </Form.Item>
            <Button onClick={handleAddProblemsClick}>
              Add Problems{' '}
              {state.selectedProblemUuids.length > 0
                ? `(${state.selectedProblemUuids.length} selected)`
                : ''}
            </Button>
            <div
              className="ant-form-item-control has-error"
              style={{ marginTop: 8 }}
            >
              <div className="ant-form-explain">
                {state.selectedProblemUuidsError &&
               state.selectedProblemUuids.length === 0
                  ? state.selectedProblemUuidsError
                  : ''}
              </div>
            </div>
            <Form.Item 
            name="tags-field"
            className="tags-field">
<Select mode="multiple" placeholder="Tags">
                  {exerciseTagOptions}
                </Select>
            </Form.Item>
          </Form>
        </div>
        <div className="button-bar">
          <Button
            className="cancel-button"
            onClick={handleCleanupAndClose}
          >
            Cancel
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    )
  }

  const renderProblembaseViewDrawer = () => {}
  console.log("state.problembaseDrawerVisible: " + state.problembaseDrawerVisible)
  console.log("props.visible: " + props.visible)
  return (
    <Drawer
      className="create-exercise-drawer"
      width={450}
      placement="right"
      onClose={props.onClose}
      maskClosable={false}
      closable={false}
      visible={props.visible}
    >
      {state.problembaseDrawerVisible && <ProblembaseDrawer
        onClose={handleProblembaseDrawerClose}
        visible={state.problembaseDrawerVisible}
        onSelectedProblemsChange={handleSelectedProblemsChange}
        selectedProblemUuids={state.selectedProblemUuids}
      />}
      {
      renderContent()
      }
    </Drawer>
  )
})