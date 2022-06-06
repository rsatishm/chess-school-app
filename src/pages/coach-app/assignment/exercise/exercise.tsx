import * as React from 'react'
import * as R from 'ramda'
import moment from 'moment'
import {
  Button,
  Select,
  Input,
  Collapse,
  Tag,
  Divider,
  Popconfirm
} from 'antd'
import { inject, MobXProviderContext, observer } from 'mobx-react'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import InfiniteScroller from 'react-infinite-scroller'

const { Option } = Select

import './exercise.less'

import { ExerciseStore } from '../../../../stores/exercise'
import { CreateExerciseDrawer } from './create-exercise-drawer/create-exercise-drawer'
import { AssignExerciseDrawer } from './assign-exercise-drawer/assign-exercise-drawer'
import { ProblemsList } from './problems-list/problems-list'
import { States } from '../../../../components/states/states'
import { CaretDownOutlined, CaretUpOutlined, FlagOutlined } from '@ant-design/icons'

interface State {
  createExerciseDrawerVisible: boolean
  sortBy: string
  search: string
  exerciseUuidToAssign: string
}

export const Exercise = observer(()=>{
  const {exerciseStore} = React.useContext(MobXProviderContext)
  const [state, setState] = React.useState<State>({
    createExerciseDrawerVisible: false,
    sortBy: 'createdAt_desc',
    search: '',
    exerciseUuidToAssign: ''
  })
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  let debouncedLoad = AwesomeDebouncePromise(exerciseStore!.load, 500)
  React.useEffect(()=>{
    exerciseStore!.load(state.search, state.sortBy)
  })

  const handleRetry = () => {
    exerciseStore!.load(state.search, state.sortBy)
  }

  const handleLoadMore = (page: number) => {
    exerciseStore!.loadMore(page)
  }

  const handleCreateButtonClick = () => {
    updateState({
      createExerciseDrawerVisible: true
    })
  }

  const handleCreateExerciseDrawerClose = () => {
    updateState({
      createExerciseDrawerVisible: false
    })
  }

  const handleAssignExerciseDrawerClose = () => {
    updateState({
      exerciseUuidToAssign: ''
    })
  }

  React.useEffect(() => {
    debouncedLoad(state.search, state.sortBy)
  }, [state.sortBy, state.search])
  const handleSortByChange = (sortBy: any) => {
    updateState({ sortBy } as State)
  }

  const handleSearchChange = (event: any) => {
    updateState({ search: event.target.value })
  }

  const handleAssignExercise = (uuid: string) => () => {
    updateState({ exerciseUuidToAssign: uuid })
  }

  const handleDeleteExercise = (uuid: string) => () => {
    exerciseStore!.delete(uuid)
  }

  const renderBlankState = () => {
    return (
      <States
        type="blank"
        button="Create"
        exceptionText="You have not created any exercises so far"
        onClick={handleCreateButtonClick}
      />
    )
  }

  const renderLevelTag = (difficultyLevel: string) => {
    if (difficultyLevel === 'easy') {
      return <Tag color="green">Beginner</Tag>
    }

    if (difficultyLevel === 'medium') {
      return <Tag color="blue">Intermediate</Tag>
    }

    if (difficultyLevel === 'hard') {
      return <Tag color="red">Advanced</Tag>
    }
  }

  const renderCreatedAt = (createdAt: string) => {
    return moment.utc(createdAt).format('DD-MM-YYYY')
  }

  const renderExercises = (exercises: any[]) => {
    if (exercises.length === 0) {
      return (
        <div className="blank-state container">
          <FlagOutlined />
          <p className="exception-text">
            No exercises found for the search criteria
          </p>
        </div>
      )
    }

    return (
      <div className="exercises container">
        <InfiniteScroller
          pageStart={0}
          loadMore={handleLoadMore}
          hasMore={exerciseStore!.hasMore}
          useWindow={false}
        >
          <Collapse className="exercise-collapse" bordered={false}>
            {exercises.map(e => {
              const header = (
                <div className="panel-header">
                  <div className="meta">
                    <span className="name">{e.name}</span>
                    <span className="count">({e.problemIds.length})</span>
                  </div>
                  <div className="submeta">
                    <span className="created">
                      {renderCreatedAt(e.createdAt)}.
                    </span>
                    <span className="description">{e.description}</span>
                  </div>
                  <div className="tags-container">
                    {renderLevelTag(e.difficultyLevel)}
                    {e.tags.map((t: string) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              )

              return (
                <Collapse.Panel key={e.uuid} header={header}>
                  <div className="action-buttons">
                    <Popconfirm
                      title="Are you sure you want to delete the exercise?"
                      onConfirm={handleDeleteExercise(e.uuid)}
                    >
                      <Button danger>Delete</Button>
                    </Popconfirm>
                    <Button
                      onClick={handleAssignExercise(e.uuid)}
                      type="primary"
                    >
                      Assign
                    </Button>
                  </div>
                  <ProblemsList problemUuids={e.problemIds} />
                </Collapse.Panel>
              )
            })}
          </Collapse>
        </InfiniteScroller>
      </div>
    )
  }

  const renderExercisePage = () => {
    if (exerciseStore!.error) {
      return (
        <States
          type="error"
          exceptionText={exerciseStore!.error}
          onClick={handleRetry}
        />
      )
    }

    if (exerciseStore!.loading) {
      return <States type="loading" />
    }

    const exercises = exerciseStore!.exercises as any[]

    return (
      <>
        {(exercises.length > 0 || state.search.trim() !== '') && (
          <div className="action-bar">
            <div className="left">
              <Button
                type="primary"
                onClick={handleCreateButtonClick}
                size="small"
              >
                Create
              </Button>
            </div>
            <div className="right">
              Sort by:&nbsp;
              <Select
                className="select-sort-by"
                defaultValue={state.sortBy}
                value={state.sortBy}
                size="small"
                style={{ width: 120 }}
                onChange={handleSortByChange}
              >
                <Option value="createdAt_asc">
                  <CaretUpOutlined style={{ fontSize: 10 }} /> Created
                </Option>
                <Option value="createdAt_desc">
                  <CaretDownOutlined style={{ fontSize: 10 }} /> Created
                </Option>
                <Option value="name_asc">
                  <CaretUpOutlined style={{ fontSize: 10 }} /> Name
                </Option>
                <Option value="name_desc">
                <CaretDownOutlined style={{ fontSize: 10 }} /> Name
                </Option>
                <Option value="difficultyLevel_asc">
                  <CaretUpOutlined style={{ fontSize: 10 }} /> Level
                </Option>
                <Option value="difficultyLevel_desc">
                  <CaretDownOutlined style={{ fontSize: 10 }} /> Level
                </Option>
              </Select>
              &nbsp;&nbsp;
              <Input.Search
                placeholder="Search"
                style={{ width: 200 }}
                size="small"
                value={state.search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        )}
        {(exercises.length > 0 || state.search.trim() !== '') && (
          <Divider className="below-action-bar" />
        )}
        {exercises.length === 0 && state.search.trim() === ''
          ? renderBlankState()
          : renderExercises(exercises)}
      </>
    )
  }
  const problemUuidsToAssign = (() => {
    if (state.exerciseUuidToAssign) {
      const exercise = R.find(
        (e: any) => e.uuid === state.exerciseUuidToAssign,
        exerciseStore!.exercises || []
      )
      return exercise ? exercise.problemIds : []
    }

    return []
  })()

  return (
    <div className="exercise inner">
      <AssignExerciseDrawer
        exerciseUuid={state.exerciseUuidToAssign}
        problemUuids={problemUuidsToAssign}
        visible={state.exerciseUuidToAssign !== ''}
        onClose={handleAssignExerciseDrawerClose}
      />
      <CreateExerciseDrawer
        visible={state.createExerciseDrawerVisible}
        onClose={handleCreateExerciseDrawerClose}
      />
      {renderExercisePage()}
    </div>
  )
})