import * as R from 'ramda'
import * as React from 'react'
import { MobXProviderContext } from 'mobx-react'
import {
  Button,
  Divider,
  Select,
  Input,
  Popconfirm,
  Row,
  Col,
  Modal
} from 'antd'
import {useNavigate, useLocation } from 'react-router-dom'

import './my-problembases.less'
import { ProblembaseCreateDrawer } from '../problembase-create-drawer/problembase-create-drawer'
import { States } from '../../../../components/states/states'
import { useState } from 'react'
import { DatabaseOutlined } from '@ant-design/icons'

const { Option } = Select

interface State {
  sortBy: string
  search: string
  createDrawerVisible: boolean
  isEditNameModalVisible: boolean
  problembaseUuid: string
  problembaseName: string
}

export const MyProblembases = ()=>{
  const {privateProblembaseStore} = React.useContext(MobXProviderContext)
  const [state, setState] = useState<State>({
    sortBy: 'name',
    search: '',
    createDrawerVisible: false,
    isEditNameModalVisible: false,
    problembaseUuid: '',
    problembaseName: ''
  })
  React.useEffect(()=>{
    privateProblembaseStore!.load()
  })
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  const navigate = useNavigate()
  const location = useLocation()
  const handleProblembaseClick = (uuid: string) => () => {
    navigate(location.pathname + '/' + uuid)
  }

  const handleSortByChange = (sortBy: any) => {
    updateState({ sortBy: sortBy as string })
  }

  const handleSearchChange = (event: any) => {
    updateState({ search: event.target.value })
  }

  const handleProblembaseCreate = () => {
    updateState({
      createDrawerVisible: true
    })
  }

  const handleProblembaseDelete = (uuid: string) => () => {
    privateProblembaseStore!.delete(uuid)
  }

  const handleProblembaseEdit = (name: string, uuid: string) => () => {
    updateState({
      problembaseName: name,
      problembaseUuid: uuid,
      isEditNameModalVisible: true
    })
  }

  const handleEditOk = async () => {
    await privateProblembaseStore!.edit(
      state.problembaseUuid,
      state.problembaseName
    )

    resetEditState()
  }

  const handleEditCancel = () => {
    resetEditState()
  }

  const resetEditState = () => {
    updateState({
      isEditNameModalVisible: false,
      problembaseUuid: '',
      problembaseName: ''
    })
  }

  const onNameChange = (e: any) => {
    updateState({
      problembaseName: e.target.value
    })
  }

  const handleCreateDrawerClose = () => {
    updateState({
      createDrawerVisible: false
    })
  }

  const sortProblembases = (sortBy: string, problembases: any[]) => {
    return R.sortBy(g => g[sortBy], problembases)
  }

  const filterProblembases = (search: string, problembases: any[]) => {
    return R.filter(
      (g: any) => g.name.toLowerCase().indexOf(search.toLowerCase()) >= 0,
      problembases
    )
  }

  const getProblembaseNameForUuid = (uuid: string) => {
    const problembase = R.find(
      R.propEq('uuid', uuid),
      privateProblembaseStore!.problembases! || []
    )
    return problembase ? (problembase as any).name : ''
  }

  const renderProblembases = (problembases: any[]) => {
    if (problembases.length === 0) {
      return (
        <div className="blank-state container">
          <DatabaseOutlined/>
          <p className="exception-text">
            No problembases found for the search criteria
          </p>
        </div>
      )
    }

    return (
      <Row className="problembase-cards container">
        {problembases.map((g: any) => {
          return (
            <Col sm={24} md={12} lg={8} key={g.uuid} className="card">
              <span
                className="name"
                onClick={handleProblembaseClick(g.uuid)}
              >
                {g.name}
              </span>
              <span className="count">{g.count}</span>
              <Popconfirm
                title="Are you sure you want to delete the problembase?"
                onConfirm={handleProblembaseDelete(g.uuid)}
              >
                <Button icon="delete" shape="circle" />
              </Popconfirm>
              <Button
                icon="edit"
                shape="circle"
                onClick={handleProblembaseEdit(g.name, g.uuid)}
              />
            </Col>
          )
        })}
      </Row>
    )
  }

  if (privateProblembaseStore!.error) {
    return (
      <div className="my-problembases inner">
        <States
          type="error"
          exceptionText={privateProblembaseStore!.error}
          onClick={privateProblembaseStore!.load}
        />
      </div>
    )
  }

  if (privateProblembaseStore!.loading) {
    return (
      <div className="my-problembases inner">
        <States type="loading" />
      </div>
    )
  }

  if (
    (privateProblembaseStore!.problembases! || []).length === 0
  ) {
    return (
      <div className="my-problembases inner">
        <ProblembaseCreateDrawer
          visible={state.createDrawerVisible}
          onClose={handleCreateDrawerClose}
        />
        <States
          type="blank"
          icon="database"
          exceptionText="You have not created any problembases so far"
          button="Create"
          onClick={handleProblembaseCreate}
        />
      </div>
    )
  }

  const problembases = sortProblembases(
    state.sortBy,
    filterProblembases(
      state.search,
      privateProblembaseStore!.problembases! || []
    )
  )

  return (
    <div className="my-problembases inner">
      <ProblembaseCreateDrawer
        visible={state.createDrawerVisible}
        onClose={handleCreateDrawerClose}
      />
      <div className="action-bar">
        <div className="left">
          <Button
            size="small"
            type="primary"
            onClick={handleProblembaseCreate}
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
            <Option value="name">Name</Option>
            <Option value="count">Count</Option>
            <Option value="createdAt">Created</Option>
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
      <Divider className="below-action-bar" />
      {renderProblembases(problembases)}
      <Modal
        title="Edit Problembase Name"
        visible={state.isEditNameModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Input
          type="text"
          value={state.problembaseName}
          onChange={onNameChange}
        />
      </Modal>
    </div>
  )
}