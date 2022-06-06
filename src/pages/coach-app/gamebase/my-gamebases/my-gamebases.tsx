import * as R from 'ramda'
import * as React from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import {
  Button,
  Divider,
  Select,
  Input,
  Popconfirm,
  Row,
  Col
} from 'antd'
import {useLocation, useNavigate } from 'react-router-dom'

import './my-gamebases.less'

import { GamebaseCreateDrawer } from '../gamebase-create-drawer/gamebase-create-drawer'
import { States } from '../../../../components/states/states'
import { DatabaseOutlined } from '@ant-design/icons'

const { Option } = Select

interface State {
  sortBy: string
  search: string
  createDrawerVisible: boolean
}

export const MyGamebases = observer(()=>{
  const {privateGamebaseStore} = React.useContext(MobXProviderContext)
  const [state, setState] = React.useState<State>({
    sortBy: 'name',
    search: '',
    createDrawerVisible: false
  })
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  const navigate = useNavigate()
  const location = useLocation()
  React.useEffect(()=>{
    privateGamebaseStore!.load()
  })

  const handleGamebaseClick = (uuid: string) => () => {
    navigate(location.pathname + '/' + uuid)
  }

  const handleSortByChange = (sortBy: any) => {
    updateState({ sortBy })
  }

  const handleSearchChange = (event: any) => {
    updateState({ search: event.target.value })
  }

  const handleGamebaseCreate = () => {
   updateState({
      createDrawerVisible: true
    })
  }

  const handleGamebaseDelete = (uuid: string) => () => {
    privateGamebaseStore!.delete(uuid)
  }

  const handleCreateDrawerClose = () => {
    console.log("hide drawer")
    updateState({
      createDrawerVisible: false
    })
  }

  const sortGamebases = (sortBy: string, gamebases: any[]) => {
    return R.sortBy(g => g[sortBy], gamebases)
  }

  const filterGamebases = (search: string, gamebases: any[]) => {
    return R.filter(
      (g: any) => g.name.toLowerCase().indexOf(search.toLowerCase()) >= 0,
      gamebases
    )
  }

  const getGamebaseNameForUuid = (uuid: string) => {
    const gamebase = R.find(
      R.propEq('uuid', uuid),
      privateGamebaseStore!.gamebases! || []
    )
    return gamebase ? (gamebase as any).name : ''
  }

  const renderGamebases = (gamebases: any[]) => {
    if (gamebases.length === 0) {
      return (
        <div className="blank-state container">
          <DatabaseOutlined/>
          <p className="exception-text">
            No gamebases found for the search criteria
          </p>
        </div>
      )
    }

    return (
      <Row className="gamebase-cards container">
        {gamebases.map((g: any) => {
          return (
            <Col sm={24} md={12} lg={8} key={g.uuid} className="card">
              <span className="name" onClick={handleGamebaseClick(g.uuid)}>
                {g.name}
              </span>
              <span className="count">{g.count}</span>
              <Popconfirm
                title="Are you sure you want to delete the gamebase?"
                onConfirm={handleGamebaseDelete(g.uuid)}
              >
                <Button icon="delete" shape="circle" />
              </Popconfirm>
            </Col>
          )
        })}
      </Row>
    )
  }

  if (privateGamebaseStore!.error) {
    return (
      <div className="public-gamebases inner">
        <States
          type="error"
          exceptionText={privateGamebaseStore!.error}
          onClick={privateGamebaseStore!.load}
        />
      </div>
    )
  }

  if (privateGamebaseStore!.loading) {
    return (
      <div className="public-gamebases inner">
        <States type="loading" />
      </div>
    )
  }

  if ((privateGamebaseStore!.gamebases! || []).length === 0) {
    return (
      <div className="public-gamebases inner">
        <GamebaseCreateDrawer
          visible={state.createDrawerVisible}
          onClose={handleCreateDrawerClose}
        />
        <States
          type="blank"
          exceptionText="You have not created any gamebases so far"
          icon="database"
          button="Create"
          onClick={handleGamebaseCreate}
        />
      </div>
    )
  }

  const gamebases = sortGamebases(
    state.sortBy,
    filterGamebases(
      state.search,
      privateGamebaseStore!.gamebases! || []
    )
  )

  return (
    <div className="my-gamebases inner">
      <GamebaseCreateDrawer
        visible={state.createDrawerVisible}
        onClose={handleCreateDrawerClose}
      />
      <div className="action-bar">
        <div className="left">
          <Button
            size="small"
            type="primary"
            onClick={handleGamebaseCreate}
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
            <Option value="count">Game Count</Option>
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
      {renderGamebases(gamebases)}
    </div>
  )
})