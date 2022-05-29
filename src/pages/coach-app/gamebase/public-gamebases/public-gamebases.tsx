import * as R from 'ramda'
import * as React from 'react'
import { MobXProviderContext } from 'mobx-react'
import {
  Divider,
  Select,
  Input,
  Row,
  Col
} from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

import './public-gamebases.less'

import { States } from '../../../../components/states/states'
import { DatabaseOutlined } from '@ant-design/icons'

const { Option } = Select

interface State {
  sortBy: string
  search: string
}

export const PublicGamebases = ()=>{
  const {publicGamebaseStore} = React.useContext(MobXProviderContext)
  const [state, setState] = React.useState<State>({
    sortBy: 'name',
    search: ''
  })
  const updateState = (newState: Partial<State>) => {
    setState((prevState) => {
      return { ...prevState, ...newState }
    })
  }
  const navigate = useNavigate()
  const location = useLocation()
  React.useEffect(()=>{
    publicGamebaseStore!.load()
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

  const sortGamebases = (sortBy: string, gamebases: any[]) => {
    return R.sortBy(g => g[sortBy], gamebases)
  }

  const filterGamebases = (search: string, gamebases: any[]) => {
    return R.filter(
      (g: any) => g.name.toLowerCase().indexOf(search.toLowerCase()) >= 0,
      gamebases
    )
  }

 const  getGamebaseNameForUuid = (uuid: string) => {
    const gamebase = R.find(
      R.propEq('uuid', uuid),
      publicGamebaseStore!.gamebases! || []
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
            <Col
              sm={24}
              md={12}
              lg={8}
              key={g.uuid}
              className="card"
              onClick={handleGamebaseClick(g.uuid)}
            >
              <span className="name">{g.name}</span>
              <span className="count">{g.count}</span>
            </Col>
          )
        })}
      </Row>
    )
  }
  if (publicGamebaseStore!.error) {
    return (
      <div className="public-gamebases inner">
        <States
          type="error"
          exceptionText={publicGamebaseStore!.error}
          onClick={publicGamebaseStore!.load}
        />
      </div>
    )
  }

  if (publicGamebaseStore!.loading) {
    return (
      <div className="public-gamebases inner">
        <States type="loading" />
      </div>
    )
  }

  const gamebases = sortGamebases(
    state.sortBy,
    filterGamebases(
      state.search,
      publicGamebaseStore!.gamebases! || []
    )
  )

  return (
    <div className="public-gamebases inner">
      <div className="action-bar">
        <div className="left" />
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
      {gamebases.length === 0 ? (
        <States
          type="blank"
          icon="database"
          exceptionText="There are no public gamebases to show"
        />
      ) : (
        renderGamebases(gamebases)
      )}
    </div>
  )
}
